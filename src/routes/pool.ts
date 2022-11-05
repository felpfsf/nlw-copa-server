import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'
import { authenticate } from '../plugins/authenticate'

export async function PoolRoutes(fastify: FastifyInstance) {
  // GET
  fastify.get('/pools/count', async () => {
    const poolsCount = await prisma.pool.count()

    return { poolsCount }
  })

  // SEARCH
  fastify.get('/pools/search', async () => {
    const poolsStartWith = await prisma.pool.findMany({
      where: {
        code: {
          startsWith: 'C'
        }
      }
    })

    return { poolsStartWith }
  })

  // POST
  fastify.post('/pools', async (request, reply) => {
    const createPoolsBody = z.object({
      title: z.string()
    })

    const { title } = createPoolsBody.parse(request.body)

    const generate = new ShortUniqueId({ length: 6 })

    const code = String(generate()).toUpperCase()

    // Bloco que verifica se o usuário está autenticado
    try {
      await request.jwtVerify()

      await prisma.pool.create({
        data: {
          title,
          code,
          ownerId: request.user.sub,

          participants: {
            create: {
              userId: request.user.sub
            }
          }
        }
      })
    } catch {
      await prisma.pool.create({
        data: {
          title,
          code
        }
      })
    }

    return reply.status(201).send({ code })
  })

  // ENTRAR NO BOLÃO
  fastify.post(
    '/pools/join',
    { onRequest: [authenticate] },
    async (request, reply) => {
      const joinPoolBody = z.object({
        code: z.string()
      })

      const { code } = joinPoolBody.parse(request.body)

      const pool = await prisma.pool.findUnique({
        where: {
          code
        },
        include: {
          participants: {
            where: {
              userId: request.user.sub
            }
          }
        }
      })

      if (!pool) {
        return reply.status(400).send({
          message: 'Bolão não encontrardo'
        })
      }

      if (pool.participants.length > 0) {
        return reply.status(400).send({
          message: 'Você já participa deste bolão'
        })
      }

      if (!pool.ownerId) {
        await prisma.pool.update({
          where: {
            id: pool.id
          },
          data: {
            ownerId: request.user.sub
          }
        })
      }

      await prisma.participant.create({
        data: {
          poolId: pool.id,
          userId: request.user.sub
        }
      })

      return reply.status(201).send()
    }
  )

  // LISTAR BOLÕES DO USUÁRIO
  fastify.get('/pools', { onRequest: [authenticate] }, async request => {
    const pools = await prisma.pool.findMany({
      where: {
        participants: {
          some: {
            userId: request.user.sub
          }
        }
      },
      include: {
        _count: {
          select: {
            participants: true
          }
        },
        participants: {
          select: {
            id: true,
            user: {
              select: {
                avatarUrl: true
              }
            }
          },
          take: 4
        },
        owner: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return { pools }
  })

  // DETALHES DO BOLÃO
  fastify.get('/pools/:id', { onRequest: [authenticate] }, async request => {
    const getPoolsParams = z.object({
      id: z.string()
    })

    const { id } = getPoolsParams.parse(request.params)

    const pool = await prisma.pool.findUnique({
      where: {
        id
      },
      include: {
        _count: {
          select: {
            participants: true
          }
        },
        participants: {
          select: {
            id: true,
            user: {
              select: {
                avatarUrl: true
              }
            }
          },
          take: 4
        },
        owner: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return { pool }
  })
}

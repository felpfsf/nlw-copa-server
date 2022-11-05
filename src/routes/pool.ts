import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'

export async function PoolRoutes(fastify: FastifyInstance) {
  // GET
  fastify.get('/pools/count', async () => {
    const poolsCount = await prisma.pool.count()

    return { poolsCount }
  })

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

    await prisma.pool.create({
      data: {
        title,
        code
      }
    })

    return reply.status(201).send({ code })
  })
}

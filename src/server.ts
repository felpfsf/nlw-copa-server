import Fastify from 'fastify'
import cors from '@fastify/cors'
import z from 'zod'
import { PrismaClient } from '@prisma/client'
import ShortUniqueId from 'short-unique-id'

const prisma = new PrismaClient({
  log: ['query']
})

async function bootstrap() {
  const fastify = Fastify({
    // Envia logs da aplicação de cada requisição, resposta...
    logger: true
  })

  await fastify.register(cors, {
    origin: true
  })

  // ROTAS

  // POOLS
  fastify.get('/pools/count', async () => {
    // Exemplo de contagem
    const poolsCount = await prisma.pool.count()

    return { poolsCount }
  })

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

  // USUÁRIOS
  fastify.get('/users/count', async () => {
    const usersCount = await prisma.user.count()

    return { usersCount }
  })

  // GUESSES
  fastify.get('/guesses/count', async () => {
    const guessesCount = await prisma.guess.count()

    return { guessesCount }
  })

  // FILTER
  // Criei essa rota de teste
  fastify.get('/pools/search', async () => {
    // Exemplo
    const poolsStartWith = await prisma.pool.findMany({
      where: {
        code: {
          startsWith: 'C'
        }
      }
    })
    return { poolsStartWith }
  })

  await fastify.listen({ port: 3333 /*host: '0.0.0.0'*/ })
}

bootstrap()

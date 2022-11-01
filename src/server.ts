import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

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

  fastify.get('/pools/count', async () => {
    // Exemplo de contagem
    const poolsCount = await prisma.pool.count()

    return { poolsCount }
  })

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

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()

import Fastify from 'fastify'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'

import { PoolRoutes } from './routes/pool'
import { userRoutes } from './routes/user'
import { guessRoutes } from './routes/guess'
import { gameRoutes } from './routes/game'
import { authRoutes } from './routes/auth'

async function bootstrap() {
  const fastify = Fastify({
    // Envia logs da aplicação de cada requisição, resposta...
    logger: true
  })

  // CORS
  await fastify.register(cors, {
    origin: true
  })

  // JWT
  await fastify.register(jwt, {
    secret: process.env.SECRET_API as string
  })

  // ROTAS
  await fastify.register(authRoutes)

  await fastify.register(PoolRoutes)

  await fastify.register(userRoutes)

  await fastify.register(guessRoutes)

  await fastify.register(gameRoutes)

  // PORTAS
  await fastify.listen({ port: 3333 /*host: '0.0.0.0'*/ })
}

bootstrap()

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import {usersRoutes} from './routes/users'
import { processRoutes } from './routes/process'
import { subprocessRoutes } from './routes/subprocess'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(cors,{
  origin: true, // All URLs
})
app.register(jwt,{
  secret: 'jwt-stage', // The secret key for the validation token
})

app.register(usersRoutes)
app.register(processRoutes)
app.register(subprocessRoutes)
app.register(authRoutes)

app.listen({
  port: 3333
}).then(() => {
  console.log('Stage HTTP server is up!!🚀 \nlocalhost:3333')
})
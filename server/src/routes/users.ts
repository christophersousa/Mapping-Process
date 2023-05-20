import { FastifyInstance } from "fastify";
import {z} from "zod"
import { prisma } from "../lib/prisma";

const bcrypt = require('bcryptjs')

export async function usersRoutes(app: FastifyInstance){
    // GET LIST USERS
    app.get('/users', async ()=>{
      const users = await prisma.user.findMany()
      return users
    })

    // GET USER BY ID
    app.get('/users/:id', async (req)=>{
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })

      const {id} = paramsSchema.parse(req.params)
      const user = await prisma.user.findUniqueOrThrow({
        where:{
          id,
        },
        select:{
          id: true,
          name: true,
          email: true,
        }
      })
      return user
    })

    // CREATE USER
    app.post('/users', async (req, res)=>{
      const bodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string()
      })
      const {name, email, password} = bodySchema.parse(req.body)
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = prisma.user.create({
          data:{
            name,
            email,
            password: hashedPassword
          }
        })
  
        const token = app.jwt.sign(
          {
            name: (await user).name,
            email: (await user).email
          },
          {
            sub: (await user).id,
            expiresIn: '7 days'
          }
        )
        return user
      } catch (error) {
        res.code(500).send({ message: 'Error in created user' });
      }
      
    })

    // UPDATE USER
    app.put('/users/:id', async (req)=>{
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })

      const {id} = paramsSchema.parse(req.params)

      const bodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string()
      })
      const {name, email, password} = bodySchema.parse(req.body)

      const user = await prisma.user.update({
        where:{
          id
        },
        data:{
          name,
          email,
          password
        }
      })

    })

    // DELETE USER
    app.delete('/users/:id', async (req)=>{
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })

      const {id} = paramsSchema.parse(req.params)
      await prisma.user.delete({
        where:{
          id,
        }
      })
    })
}
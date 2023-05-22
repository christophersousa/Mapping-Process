import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

const bcrypt = require('bcryptjs')

export async function authRoutes(app:FastifyInstance) {

  app.post('/auth', async (req, res) => {

    const bodySchema = z.object({
      email: z.string(),
      password: z.string()
    })
    const {email, password} = bodySchema.parse(req.body)


    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email
      }
    }).catch(()=>{
      res.code(404)
      throw new Error("User not found")
    })

    const passwordMatch = await bcrypt.compare(password, user.password );
    if(!passwordMatch) {
      res.code(401)
      return new Error('Incorrect password')
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        email: user.email
      },
      {
        sub: user.id,
        expiresIn: '7 days'
      }
    )

    return token
  })
  
}
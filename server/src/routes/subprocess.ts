import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function subprocessRoutes(app:FastifyInstance){
  //GET ALL SUBPROCESS OF PROCESS
  app.get('/subprocess/', async (req)=>{
    await req.jwtVerify()

    const subprocess = await prisma.subprocess.findMany({
      select:{
        id: true,
        name: true,
        description: true,
        documentation: true,
      }
    })
    return subprocess.map((subprocess)=>{
      return {
        "id": subprocess.id,
        "name": subprocess.name,
        "description": subprocess.description,
        "documentation": subprocess.documentation.substring(0,115).concat("..."),
      }
    })
  })

  //CREATE SUBPROCESSS
  app.post('/subprocess', async (req) => {
    await req.jwtVerify()
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      documentation: z.string(),
      system_used: z.string(),
      name_area: z.string(),
      id_process: z.string(),
      responsibles: z.array(z.string())
    })

    const {
      name, 
      description, 
      documentation, 
      system_used,
      id_process,
      name_area,
      responsibles} = bodySchema.parse(req.body)
    
    let area = await prisma.area.findUnique({
      where:{
        name: name_area,
      }
    })

    if(!area) {
      area = await prisma.area.create({
        data: {
          name: name_area,
        }
      })
    }

    const subprocess = await prisma.subprocess.create({
      data: {
        name,
        description,
        system_used,
        documentation,
        id_area: area.id,
        id_process,
        Responsible:{
          connectOrCreate: responsibles.map(name_responsable =>({
            where:{name: name_responsable},
            create:{name: name_responsable}
          }))
        },
      },
      include:{
        Responsible: true,
      }
    });

    return subprocess
  })

  // CREATE MAPPING OF SUBPROCESS
  app.post('/subprocess/:id', async (req) => {
    await req.jwtVerify()
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      documentation: z.string(),
      system_used: z.string(),
      name_area: z.string(),
      responsibles: z.array(z.string())
    })
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const {id} = paramsSchema.parse(req.params)
    const {
      name, 
      description, 
      documentation, 
      system_used,
      name_area,
      responsibles} = bodySchema.parse(req.body)

      let area = await prisma.area.findUnique({
        where:{
          name: name_area,
        }
      })
  
      if(!area) {
        area = await prisma.area.create({
          data: {
            name: name_area,
          }
        })
      }

    const subprocesses = await prisma.subprocess.update({
      where:{
        id,
      },
      data:{
        Subprocess:{
          create:{
            name,
            description,
            documentation,
            system_used,
            id_area: area.id,
            Responsible:{
              connectOrCreate: responsibles.map(name_responsable =>({
                where:{name: name_responsable},
                create:{name: name_responsable}
              }))
            },
          }
        }
      }
    })

    return subprocesses
  })

  //GET SUPROCESS BY ID
  app.get('/subprocess/:id', async (req, res)=>{
    await req.jwtVerify()
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const {id} = paramsSchema.parse(req.params)

    const subprocess = await prisma.subprocess.findFirstOrThrow({
      where:{
        id
      },
      include:{
        Area:{
          select:{
            name: true
          }
        },
        Responsible:{
          select:{
            name: true
          }
        },
        Subprocess:{
          select:{
            id: true,
            name: true,
            description: true,
            documentation: true
          }
        }
      }
    })

    return subprocess

  })

  //UPDATE SUBPROCESS
  app.put('/subprocess/:id', async (req) => {
    console.log(req.body)
    await req.jwtVerify()
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      documentation: z.string(),
      system_used: z.string(),
      name_area: z.string(),
      id_process: z.string(),
      responsibles: z.array(z.string())
    })
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const {id} = paramsSchema.parse(req.params)
    const {
      name, 
      description, 
      documentation, 
      system_used,
      id_process,
      name_area,
      responsibles} = bodySchema.parse(req.body)
    
    let area = await prisma.area.findUnique({
      where:{
        name: name_area,
      }
    })

    if(!area) {
      area = await prisma.area.create({
        data: {
          name: name_area,
        }
      })
    }

    await prisma.subprocess.update({
      where:{
        id,
      },
      data: {
        name,
        description,
        system_used,
        documentation,
        id_area: area.id,
        id_process,
        Responsible:{
          connectOrCreate: responsibles.map(name_responsable =>({
            where:{name: name_responsable},
            create:{name: name_responsable}
          }))
        }

      }
    })
  })

  //DELETE SUBPROCESS
  app.delete('/subprocess/:id', async (req)=>{

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const {id} = paramsSchema.parse(req.params)
    await prisma.subprocess.delete({
      where:{
        id,
      }
    })
  })
}
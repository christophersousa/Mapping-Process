import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { getDaysPassed } from "../functions/data_passed";

export async function processRoutes(app:FastifyInstance){

  

  // GET ALL PROCESS
  app.get('/process', async (req)=>{
    await req.jwtVerify()
    const {sub} = req.user
    const process = await prisma.process.findMany({
      where:{
        id_user: sub,
      },
      orderBy:{
        created_at: 'desc'
      },
      select:{
        id: true,
        name: true,
        description: true,
        documentation: true,
        created_at: true,
      }
    })
    return process.map((process)=>{
      return {
        "id": process.id,
        "name": process.name,
        "documentation": process.documentation.substring(0,200).concat("..."),
        "diffd_ays": getDaysPassed(process.created_at)
      }
    })
  })

  //CREATE PROCESS
  app.post('/process', async (req)=>{
    await req.jwtVerify()
    const {sub} = req.user
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      documentation: z.string(),
      system_used: z.string(),
      name_area: z.string(),
      responsibles: z.array(z.string())
    })

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
     
    const process = await prisma.process.create({
      data: {
        name,
        description,
        id_user: sub,
        system_used,
        documentation,
        id_area: area.id,
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

    return process
    
  })

  //GET PROCESSS BY ID
  app.get('/process/:id', async (req, res)=>{
    console.log(req)
    await req.jwtVerify()

    const {sub} = req.user

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const {id} = paramsSchema.parse(req.params)

    const process = await prisma.process.findFirstOrThrow({
      where:{
        id,
        id_user: sub
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
            documentation: true,
            created_at: true,
          }
        }
      }
    }).catch(()=>{
      res.code(404)
      throw new Error("Process not found")
    })

    process.Subprocess.map((subprocess)=>{ 
      subprocess.documentation = subprocess.documentation.substring(0,200).concat("...");
    })

    return process

  })

  //UPDATE PROCESSS
  app.put('/process/:id', async (req) =>{
    await req.jwtVerify()
    const {sub} = req.user
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

    await prisma.process.update({
      where:{
        id: id,
      },
      data:{
        name,
        description,
        id_user: sub,
        system_used,
        documentation,
        id_area: area.id,
        Responsible:{
          connectOrCreate: responsibles.map(name_responsable =>({
            where:{name: name_responsable},
            create:{name: name_responsable}
          }))
        },
      }
    })
  })

  //DELETE PROCESSS
  app.delete('/process/:id', async (req)=>{
    await req.jwtVerify()
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const {id} = paramsSchema.parse(req.params)
    await prisma.process.delete({
      where:{
        id,
      }
    })
  })

}
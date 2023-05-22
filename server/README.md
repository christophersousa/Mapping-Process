# Mapping Process platform server

## About Server

This application is responsible for managing the entire backend of the Process Mapping platform, using business rules and simple processes for this purpose.

# Technologies used
## Back-end
- Nodejs (Framework)
- TypeScript (Language)
- Primsa (ORM)

## Database
- Docker (PostgreSQL)

## Diagram
![Alt Diagram](image ".asserts/Mapping-process-diagram.png")


## Why NodeJs ?

I chose Node.js to develop a server because it offers speed, efficiency, scalability, a vast library of modules, and an active community, making it a solid choice for your server needs.


# How to run the project

prerequisites: 
- NodeJs LTS
- Docker

```bash
# Database create
# Folder: src/docker
docker-compose up

# Tables create
npm migrate dev

# Run aplication
npm run dev

```

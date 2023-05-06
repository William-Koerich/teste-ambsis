import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"


dotenv.config()

const app: Express = express()
const port = process.env.PORT || 5000
const prisma = new PrismaClient()

app.use(express.json())

app.get("/empresas", async (req: Request, res: Response) => {

  const company = await prisma.empresa.findMany()

  res.send(company)
})

app.post("/empresa/insert", async (req: Request, res: Response) => {
  const data = {
    razaoSocial: req.body.razaoSocial,
    cnpj: req.body.cnpj,
    cep: req.body.cep,
    cidade: req.body.cidade,
    estado: req.body.estado,
    bairro: req.body.bairro,
    complemento: req.body.complemento
  }

  const createEmpresa = await prisma.empresa.create({ data })
  res.send(createEmpresa)
})

app.put("/empresa/update/:id", async (req: Request, res: Response) => {
  const updateEmpresa = await prisma.empresa.update({
    where: {
      id: +req.params.id
    },
    data: {
      razaoSocial: req.body.razaoSocial,
      cnpj: req.body.cnpj,
      cep: req.body.cep,
      cidade: req.body.cidade,
      estado: req.body.estado,
      bairro: req.body.bairro,
      complemento: req.body.complemento
    },
  })

  res.send(updateEmpresa)
})

app.delete("empresa/delete/:id", async (req: Request, res: Response) => {
  const deleteEmpresa = await prisma.empresa.delete({
    where: {
      id: +req.params.id
    },
  })

  res.send(deleteEmpresa)
})

app.get("/licencas", async (req: Request, res: Response) => {

  const licencas = await prisma.licencaAmbiental.findMany()

  res.send(licencas)
})

app.post("/licenca/insert", async (req: Request, res: Response) => {
  const data = {
    numero: req.body.numero,
    orgaoAmbiental: req.body.orgaoAmbiental,
    emissao: req.body.emissao,
    validade: req.body.validade,
    empresa: { connect: { id: +req.body.id } }
  }

  const createLicenca = await prisma.licencaAmbiental.create({ data })
  res.send(createLicenca)
})

app.put("/licenca/update/:id", async (req: Request, res: Response) => {
  const updateLicenca = await prisma.licencaAmbiental.update({
    where: {
      id: +req.params.id
    },
    data: {
      empresa: {
        connect: {
          id: +req.params.id,
        },
      },
      numero: req.body.numero,
      orgaoAmbiental: req.body.orgaoAmbiental,
      emissao: req.body.emissao,
      validade: req.body.validade,
    },
  })

  res.send(updateLicenca)
})

app.delete("licenca/delete/:id", async (req: Request, res: Response) => {
  const deleteLicenca = await prisma.licencaAmbiental.delete({
    where: {
      id: +req.params.id
    },
  })

  res.send(deleteLicenca)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
# Tecnologias Utilizadas

* Node 
* Nodemon (^2.0.22)
* TypeScript
* Express (^4.18.2)
* Prisma (^4.13.0)
* PostgreSQL

---

# Orientações de instalação

Primeiramente você deverá clonar o repositório

```bash
https://github.com/William-Koerich/teste-ambsis.git
```

Após isso você deverá instalar as dependências do projeto

```bash
npm install
```

Agora você deverá criar um arquivo .env sendo igual o .env.sample

executar o comando 

```bash
docker-compose up -d
ou
sudo docker-compose up -d
```

Para subir o docker com a imagem do banco de dados postgres


Para criar as tabelas do banco de dados tens 2 opções ou rodar o comando abaixo

```bash
npm run db:migrate
```

Ou criar as mesmas tabelas na mão com os dumps a seguir

```sql
-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "razaoSocial" VARCHAR(255) NOT NULL,
    "cnpj" VARCHAR(255) NOT NULL,
    "cep" VARCHAR(255) NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" CHAR(2) NOT NULL,
    "bairro" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LicencaAmbiental" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "orgaoAmbiental" VARCHAR(255) NOT NULL,
    "emissao" TIMESTAMP(3) NOT NULL,
    "validade" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "empresaId" INTEGER NOT NULL,

    CONSTRAINT "LicencaAmbiental_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LicencaAmbiental_orgaoAmbiental_key" ON "LicencaAmbiental"("orgaoAmbiental");

-- AddForeignKey
ALTER TABLE "LicencaAmbiental" ADD CONSTRAINT "LicencaAmbiental_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

```

# Exemplo de Empresa

```js
{
    "razaoSocial": "Davi e Fabiana Limpeza Ltda",
    "cnpj": "59.465.058/0001-53",
    "cep": "89654-970",
    "cidade":"Água Doce",
    "estado": "SC",
    "bairro": "Centro",
    "complemento": "Próximo a praça da igreja"
}
```

# Exemplo de Licença Ambiental

```js
    "numero": "198df53",
    "orgaoAmbiental": "Ibama",
    "emissao": "2023-05-06",
    "validade": "2023-07-06",
    "empresaId": 1
    
```

# Interface 

```js
interface EmpresaData {
  razaoSocial: string
  cnpj: string
  cep: string
  cidade: string
  estado: string
  bairro: string
  complemento: string
}
```

```js
interface LicencaData {
  numero: string
  orgaoAmbiental: string
  emissao: Date
  validade: Date
}
```
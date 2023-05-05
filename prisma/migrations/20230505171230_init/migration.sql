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

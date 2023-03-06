-- CreateTable
CREATE TABLE "edificios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "edificios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apartamentos" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "aluguel" TEXT NOT NULL,
    "locatario" TEXT NOT NULL,
    "locador" TEXT NOT NULL,
    "disponivel" BOOLEAN NOT NULL,
    "id_edificio" INTEGER NOT NULL,

    CONSTRAINT "apartamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locatario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "id_apartamento" INTEGER NOT NULL,

    CONSTRAINT "locatario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "edificios_nome_key" ON "edificios"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "apartamentos_numero_key" ON "apartamentos"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "locatario_cpf_key" ON "locatario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "locatario_id_apartamento_key" ON "locatario"("id_apartamento");

-- AddForeignKey
ALTER TABLE "apartamentos" ADD CONSTRAINT "apartamentos_id_edificio_fkey" FOREIGN KEY ("id_edificio") REFERENCES "edificios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locatario" ADD CONSTRAINT "locatario_id_apartamento_fkey" FOREIGN KEY ("id_apartamento") REFERENCES "apartamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

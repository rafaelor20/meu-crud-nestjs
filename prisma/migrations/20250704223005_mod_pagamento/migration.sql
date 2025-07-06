/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `Pagamento` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transacaoId]` on the table `Pagamento` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Pagamento" DROP COLUMN "criadoEm",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "linkPagamento" TEXT,
ADD COLUMN     "qrCode" TEXT,
ADD COLUMN     "transacaoId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Pagamento_transacaoId_key" ON "Pagamento"("transacaoId");

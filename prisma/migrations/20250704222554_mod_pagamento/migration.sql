/*
  Warnings:

  - Changed the type of `metodo` on the `Pagamento` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MetodoPagamento" AS ENUM ('PIX', 'CARTAO', 'BOLETO');

-- CreateEnum
CREATE TYPE "PagamentoStatus" AS ENUM ('AGUARDANDO', 'PAGO', 'FALHOU', 'EXPIRADO');

-- AlterTable
ALTER TABLE "Pagamento" DROP COLUMN "metodo",
ADD COLUMN     "metodo" "MetodoPagamento" NOT NULL;

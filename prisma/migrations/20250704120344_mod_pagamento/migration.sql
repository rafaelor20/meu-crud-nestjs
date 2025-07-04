/*
  Warnings:

  - You are about to drop the column `status` on the `Pagamento` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `Pagamento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pagamento" DROP COLUMN "status",
DROP COLUMN "valor";

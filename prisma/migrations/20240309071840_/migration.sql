/*
  Warnings:

  - The primary key for the `MylistOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MylistOrder` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "MylistOrder_mylistId_key";

-- AlterTable
ALTER TABLE "MylistOrder" DROP CONSTRAINT "MylistOrder_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "MylistOrder_pkey" PRIMARY KEY ("mylistId");

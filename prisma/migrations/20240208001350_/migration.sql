/*
  Warnings:

  - You are about to drop the `MylistItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MylistItem" DROP CONSTRAINT "MylistItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "MylistItem" DROP CONSTRAINT "MylistItem_mylistId_fkey";

-- DropTable
DROP TABLE "MylistItem";

-- CreateTable
CREATE TABLE "MylistOrder" (
    "id" SERIAL NOT NULL,
    "position" SERIAL NOT NULL,
    "mylistId" INTEGER NOT NULL,

    CONSTRAINT "MylistOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MylistOrder_position_key" ON "MylistOrder"("position");

-- CreateIndex
CREATE UNIQUE INDEX "MylistOrder_mylistId_key" ON "MylistOrder"("mylistId");

-- AddForeignKey
ALTER TABLE "MylistOrder" ADD CONSTRAINT "MylistOrder_mylistId_fkey" FOREIGN KEY ("mylistId") REFERENCES "Mylist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

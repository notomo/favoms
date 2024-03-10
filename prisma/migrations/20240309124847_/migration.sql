/*
  Warnings:

  - You are about to drop the column `name` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "Book" (
    "itemId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "titleRuby" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "Book_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "BookAuthor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nameRuby" TEXT NOT NULL,

    CONSTRAINT "BookAuthor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookPublisher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nameRuby" TEXT NOT NULL,

    CONSTRAINT "BookPublisher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookToBookAuthor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BookToBookPublisher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BookAuthor_name_key" ON "BookAuthor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BookPublisher_name_key" ON "BookPublisher"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToBookAuthor_AB_unique" ON "_BookToBookAuthor"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToBookAuthor_B_index" ON "_BookToBookAuthor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToBookPublisher_AB_unique" ON "_BookToBookPublisher"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToBookPublisher_B_index" ON "_BookToBookPublisher"("B");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToBookAuthor" ADD CONSTRAINT "_BookToBookAuthor_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("itemId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToBookAuthor" ADD CONSTRAINT "_BookToBookAuthor_B_fkey" FOREIGN KEY ("B") REFERENCES "BookAuthor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToBookPublisher" ADD CONSTRAINT "_BookToBookPublisher_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("itemId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToBookPublisher" ADD CONSTRAINT "_BookToBookPublisher_B_fkey" FOREIGN KEY ("B") REFERENCES "BookPublisher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

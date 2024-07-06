/*
  Warnings:

  - You are about to drop the `_BookToBookAuthor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookToBookAuthor" DROP CONSTRAINT "_BookToBookAuthor_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToBookAuthor" DROP CONSTRAINT "_BookToBookAuthor_B_fkey";

-- DropTable
DROP TABLE "_BookToBookAuthor";

-- CreateTable
CREATE TABLE "BookAuthoring" (
    "itemId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "BookAuthoring_pkey" PRIMARY KEY ("itemId","authorId")
);

-- AddForeignKey
ALTER TABLE "BookAuthoring" ADD CONSTRAINT "BookAuthoring_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Book"("itemId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookAuthoring" ADD CONSTRAINT "BookAuthoring_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "BookAuthor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

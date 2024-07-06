/*
  Warnings:

  - You are about to drop the `_BookToBookPublisher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookToBookPublisher" DROP CONSTRAINT "_BookToBookPublisher_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToBookPublisher" DROP CONSTRAINT "_BookToBookPublisher_B_fkey";

-- DropTable
DROP TABLE "_BookToBookPublisher";

-- CreateTable
CREATE TABLE "BookPublishing" (
    "itemId" TEXT NOT NULL,
    "publisherId" TEXT NOT NULL,

    CONSTRAINT "BookPublishing_pkey" PRIMARY KEY ("itemId","publisherId")
);

-- AddForeignKey
ALTER TABLE "BookPublishing" ADD CONSTRAINT "BookPublishing_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Book"("itemId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookPublishing" ADD CONSTRAINT "BookPublishing_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "BookPublisher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

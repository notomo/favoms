/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Video` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_itemId_fkey";

-- DropForeignKey
ALTER TABLE "_BookToBookAuthor" DROP CONSTRAINT "_BookToBookAuthor_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToBookPublisher" DROP CONSTRAINT "_BookToBookPublisher_A_fkey";

-- DropForeignKey
ALTER TABLE "_CastToVideo" DROP CONSTRAINT "_CastToVideo_B_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToMylist" DROP CONSTRAINT "_ItemToMylist_A_fkey";

-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
ALTER COLUMN "itemId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("itemId");

-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Item_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Item_id_seq";

-- AlterTable
ALTER TABLE "Video" DROP CONSTRAINT "Video_pkey",
ALTER COLUMN "itemId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Video_pkey" PRIMARY KEY ("itemId");

-- AlterTable
ALTER TABLE "_BookToBookAuthor" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_BookToBookPublisher" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_CastToVideo" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_ItemToMylist" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToMylist" ADD CONSTRAINT "_ItemToMylist_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToBookAuthor" ADD CONSTRAINT "_BookToBookAuthor_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("itemId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToBookPublisher" ADD CONSTRAINT "_BookToBookPublisher_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("itemId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CastToVideo" ADD CONSTRAINT "_CastToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("itemId") ON DELETE CASCADE ON UPDATE CASCADE;

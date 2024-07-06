/*
  Warnings:

  - The primary key for the `BookAuthor` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_BookToBookAuthor" DROP CONSTRAINT "_BookToBookAuthor_B_fkey";

-- AlterTable
ALTER TABLE "BookAuthor" DROP CONSTRAINT "BookAuthor_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BookAuthor_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BookAuthor_id_seq";

-- AlterTable
ALTER TABLE "_BookToBookAuthor" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_BookToBookAuthor" ADD CONSTRAINT "_BookToBookAuthor_B_fkey" FOREIGN KEY ("B") REFERENCES "BookAuthor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `BookPublisher` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_BookToBookPublisher" DROP CONSTRAINT "_BookToBookPublisher_B_fkey";

-- AlterTable
ALTER TABLE "BookPublisher" DROP CONSTRAINT "BookPublisher_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BookPublisher_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BookPublisher_id_seq";

-- AlterTable
ALTER TABLE "_BookToBookPublisher" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_BookToBookPublisher" ADD CONSTRAINT "_BookToBookPublisher_B_fkey" FOREIGN KEY ("B") REFERENCES "BookPublisher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

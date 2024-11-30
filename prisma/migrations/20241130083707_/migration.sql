-- AlterTable
ALTER TABLE "_ItemToMylist" ADD CONSTRAINT "_ItemToMylist_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ItemToMylist_AB_unique";

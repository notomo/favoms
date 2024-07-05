/*
  Warnings:

  - The primary key for the `Cast` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_CastToVideo" DROP CONSTRAINT "_CastToVideo_A_fkey";

-- AlterTable
ALTER TABLE "Cast" DROP CONSTRAINT "Cast_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Cast_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Cast_id_seq";

-- AlterTable
ALTER TABLE "_CastToVideo" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_CastToVideo" ADD CONSTRAINT "_CastToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "Cast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

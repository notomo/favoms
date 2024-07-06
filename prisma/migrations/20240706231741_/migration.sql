/*
  Warnings:

  - You are about to drop the `_CastToVideo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CastToVideo" DROP CONSTRAINT "_CastToVideo_A_fkey";

-- DropForeignKey
ALTER TABLE "_CastToVideo" DROP CONSTRAINT "_CastToVideo_B_fkey";

-- DropTable
DROP TABLE "_CastToVideo";

-- CreateTable
CREATE TABLE "VideoCasting" (
    "itemId" TEXT NOT NULL,
    "castId" TEXT NOT NULL,

    CONSTRAINT "VideoCasting_pkey" PRIMARY KEY ("itemId","castId")
);

-- AddForeignKey
ALTER TABLE "VideoCasting" ADD CONSTRAINT "VideoCasting_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Video"("itemId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoCasting" ADD CONSTRAINT "VideoCasting_castId_fkey" FOREIGN KEY ("castId") REFERENCES "Cast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

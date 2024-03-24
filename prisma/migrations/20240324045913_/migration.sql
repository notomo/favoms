-- CreateTable
CREATE TABLE "Video" (
    "itemId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "titleRuby" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "Video_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "Cast" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nameRuby" TEXT NOT NULL,

    CONSTRAINT "Cast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CastToVideo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Cast_name_key" ON "Cast"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CastToVideo_AB_unique" ON "_CastToVideo"("A", "B");

-- CreateIndex
CREATE INDEX "_CastToVideo_B_index" ON "_CastToVideo"("B");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CastToVideo" ADD CONSTRAINT "_CastToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "Cast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CastToVideo" ADD CONSTRAINT "_CastToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Video"("itemId") ON DELETE CASCADE ON UPDATE CASCADE;

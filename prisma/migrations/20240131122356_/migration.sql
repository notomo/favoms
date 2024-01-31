-- CreateTable
CREATE TABLE "Mylist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Mylist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MylistItem" (
    "mylistId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "MylistItem_pkey" PRIMARY KEY ("mylistId","itemId")
);

-- CreateTable
CREATE TABLE "_ItemToMylist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Mylist_name_key" ON "Mylist"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToMylist_AB_unique" ON "_ItemToMylist"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToMylist_B_index" ON "_ItemToMylist"("B");

-- AddForeignKey
ALTER TABLE "MylistItem" ADD CONSTRAINT "MylistItem_mylistId_fkey" FOREIGN KEY ("mylistId") REFERENCES "Mylist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MylistItem" ADD CONSTRAINT "MylistItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToMylist" ADD CONSTRAINT "_ItemToMylist_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToMylist" ADD CONSTRAINT "_ItemToMylist_B_fkey" FOREIGN KEY ("B") REFERENCES "Mylist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

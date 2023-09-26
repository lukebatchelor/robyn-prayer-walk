-- CreateTable
CREATE TABLE "Response" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "message" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Response_name_idx" ON "Response"("name");

/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Garden` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Garden` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Garden" DROP CONSTRAINT "Garden_ownerId_fkey";

-- AlterTable
ALTER TABLE "Garden" DROP COLUMN "ownerId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Vegetable" ALTER COLUMN "price" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Garden" ADD CONSTRAINT "Garden_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `from` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "from" TEXT NOT NULL,
ADD COLUMN     "to" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "from" TEXT,
ADD COLUMN     "to" TEXT NOT NULL;

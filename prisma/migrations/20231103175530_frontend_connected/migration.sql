/*
  Warnings:

  - Made the column `phone_number` on table `temp_books` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "temp_books" ALTER COLUMN "phone_number" SET NOT NULL,
ALTER COLUMN "phone_number" SET DATA TYPE TEXT;

/*
  Warnings:

  - Made the column `no_of_books` on table `temp_books` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "book_variants" ALTER COLUMN "inside_layout_type" DROP NOT NULL;

-- AlterTable
ALTER TABLE "temp_books" ALTER COLUMN "no_of_books" SET NOT NULL;

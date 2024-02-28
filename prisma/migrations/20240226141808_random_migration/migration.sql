/*
  Warnings:

  - Made the column `quantity_of_Color` on table `book_variants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `book_size` on table `book_variants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `number_of_pages` on table `book_variants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantity_of_color` on table `temp_books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `book_size` on table `temp_books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `number_of_pages` on table `temp_books` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "book_variants" ALTER COLUMN "quantity_of_Color" SET NOT NULL,
ALTER COLUMN "book_size" SET NOT NULL,
ALTER COLUMN "number_of_pages" SET NOT NULL;

-- AlterTable
ALTER TABLE "temp_books" ALTER COLUMN "quantity_of_color" SET NOT NULL,
ALTER COLUMN "book_size" SET NOT NULL,
ALTER COLUMN "number_of_pages" SET NOT NULL;

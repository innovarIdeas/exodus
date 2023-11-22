/*
  Warnings:

  - Made the column `inside_layout_type` on table `book_variants` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "book_variants" ALTER COLUMN "inside_layout_type" SET NOT NULL;

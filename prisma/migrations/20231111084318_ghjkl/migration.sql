/*
  Warnings:

  - A unique constraint covering the columns `[variant_name]` on the table `book_variants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `variant_name` to the `book_variants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "book_variants" ADD COLUMN     "variant_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "book_variants_variant_name_key" ON "book_variants"("variant_name");

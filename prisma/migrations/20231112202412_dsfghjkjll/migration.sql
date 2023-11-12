/*
  Warnings:

  - You are about to drop the column `created_at` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "created_at",
ALTER COLUMN "markup" DROP NOT NULL;

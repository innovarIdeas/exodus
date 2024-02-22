/*
  Warnings:

  - The primary key for the `constants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[shortcode]` on the table `constants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `constants` table without a default value. This is not possible if the table is not empty.
  - Made the column `value` on table `constants` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "constants" DROP CONSTRAINT "constants_pkey",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "value" SET NOT NULL,
ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "constants_shortcode_key" ON "constants"("shortcode");

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_client_id_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "cover_total" DROP NOT NULL,
ALTER COLUMN "inner_total" DROP NOT NULL,
ALTER COLUMN "delivery_fee" DROP NOT NULL,
ALTER COLUMN "inner_page_cost" DROP NOT NULL,
ALTER COLUMN "cover_cost" DROP NOT NULL,
ALTER COLUMN "perfect_binding_cost" DROP NOT NULL,
ALTER COLUMN "lamination_cost" DROP NOT NULL,
ALTER COLUMN "wrapping_cost" DROP NOT NULL,
ALTER COLUMN "trim_cost" DROP NOT NULL,
ALTER COLUMN "embossing_cost" DROP NOT NULL,
ALTER COLUMN "spot_lamination_cost" DROP NOT NULL,
ALTER COLUMN "foil_cost" DROP NOT NULL,
ALTER COLUMN "book_cost" DROP NOT NULL,
ALTER COLUMN "service_cost" DROP NOT NULL,
ALTER COLUMN "client_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

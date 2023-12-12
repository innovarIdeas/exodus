-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_seen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_seen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "type" TEXT,
    "house_number" TEXT,
    "address_line_1" TEXT NOT NULL,
    "address_line_2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT NOT NULL,
    "user_id" TEXT,
    "postal_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts_details" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "user_id" TEXT,

    CONSTRAINT "contacts_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "temp_books" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "book_name" TEXT,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "phone_number" TEXT NOT NULL,
    "paper_type" TEXT NOT NULL,
    "number_of_words" INTEGER,
    "status" TEXT NOT NULL,
    "hard_cover" BOOLEAN DEFAULT false,
    "BW_print" BOOLEAN DEFAULT false,
    "both_print" BOOLEAN DEFAULT false,
    "color_print" BOOLEAN DEFAULT false,
    "cream_paper" BOOLEAN DEFAULT false,
    "glossy_paper" BOOLEAN DEFAULT false,
    "news_print" BOOLEAN DEFAULT false,
    "binding" TEXT,
    "white_paper" BOOLEAN DEFAULT false,
    "no_of_books" INTEGER NOT NULL,
    "portrait" BOOLEAN DEFAULT false,
    "quantity_of_color" INTEGER,
    "quantity_of_BW" INTEGER,
    "book_size" TEXT,
    "number_of_pages" INTEGER NOT NULL,
    "inside_layout" BOOLEAN DEFAULT false,
    "proof_reading" BOOLEAN DEFAULT false,
    "cover_design" BOOLEAN DEFAULT false,
    "cover_design_type" TEXT,
    "editing" BOOLEAN DEFAULT false,
    "ISBN" BOOLEAN DEFAULT false,
    "online_sale" BOOLEAN DEFAULT false,
    "embossing" BOOLEAN DEFAULT false,
    "foiling" BOOLEAN DEFAULT false,
    "lamination" TEXT NOT NULL,
    "delivery_name" TEXT,
    "delivery_phone" TEXT,
    "pick_up" BOOLEAN DEFAULT false,
    "shipping_address" TEXT,
    "shipping_state" TEXT,
    "shipping_instruction" TEXT,
    "project_type" TEXT,
    "ready_to_print" BOOLEAN DEFAULT false,
    "published" BOOLEAN DEFAULT false,
    "work_in_progress" BOOLEAN DEFAULT false,
    "word_count" INTEGER,
    "current_book_format" TEXT,
    "inside_layout_type" TEXT,
    "art_illustration" BOOLEAN DEFAULT false,
    "art_illustration_type" TEXT,
    "bindong" TEXT,

    CONSTRAINT "temp_books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "book_name" TEXT,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invoice_no" TEXT NOT NULL,
    "phone_number" INTEGER,
    "paper_type" TEXT,
    "number_of_words" INTEGER,
    "status" TEXT NOT NULL,
    "hard_cover" BOOLEAN DEFAULT false,
    "BW_print" BOOLEAN DEFAULT false,
    "both_print" BOOLEAN DEFAULT false,
    "color_print" BOOLEAN DEFAULT false,
    "cream_paper" BOOLEAN DEFAULT false,
    "glossy_paper" BOOLEAN DEFAULT false,
    "news_print" BOOLEAN DEFAULT false,
    "binding" TEXT,
    "white_paper" BOOLEAN DEFAULT false,
    "no_of_books" INTEGER NOT NULL,
    "portrait" BOOLEAN DEFAULT false,
    "quantity_of_Color" INTEGER,
    "quantity_of_BW" INTEGER,
    "book_size" TEXT,
    "number_of_pages" INTEGER NOT NULL,
    "inside_layout" BOOLEAN DEFAULT false,
    "proof_reading" BOOLEAN DEFAULT false,
    "cover_design" BOOLEAN DEFAULT false,
    "cover_design_type" TEXT,
    "editing" BOOLEAN DEFAULT false,
    "ISBN" BOOLEAN DEFAULT false,
    "online_sale" BOOLEAN DEFAULT false,
    "embossing" BOOLEAN DEFAULT false,
    "foiling" BOOLEAN DEFAULT false,
    "lamination" TEXT NOT NULL,
    "delivery_name" TEXT,
    "delivery_phone" TEXT,
    "pick_up" BOOLEAN DEFAULT false,
    "shipping_address" TEXT,
    "shipping_state" TEXT,
    "shipping_instruction" TEXT,
    "project_type" TEXT,
    "ready_to_print" BOOLEAN DEFAULT false,
    "published" BOOLEAN DEFAULT false,
    "work_in_progress" BOOLEAN DEFAULT false,
    "word_count" INTEGER,
    "current_book_format" TEXT,
    "inside_layout_type" TEXT,
    "art_illustration" BOOLEAN DEFAULT false,
    "art_illustration_type" TEXT,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "author" TEXT,
    "created_by" TEXT NOT NULL,
    "client_id" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discounts" (
    "id" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book_variants" (
    "id" TEXT NOT NULL,
    "variant_name" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "tempbook_id" TEXT,
    "paper_type" TEXT NOT NULL,
    "number_of_words" INTEGER,
    "status" TEXT NOT NULL,
    "hard_cover" BOOLEAN DEFAULT false,
    "BW_print" BOOLEAN DEFAULT false,
    "both_print" BOOLEAN DEFAULT false,
    "color_print" BOOLEAN DEFAULT false,
    "cream_paper" BOOLEAN DEFAULT false,
    "glossy_paper" BOOLEAN DEFAULT false,
    "news_print" BOOLEAN DEFAULT false,
    "binding" TEXT,
    "white_paper" BOOLEAN DEFAULT false,
    "no_of_books" INTEGER NOT NULL,
    "portrait" BOOLEAN DEFAULT false,
    "quantity_of_Color" INTEGER,
    "quantity_of_BW" INTEGER,
    "book_size" TEXT,
    "number_of_pages" INTEGER,
    "inside_layout" BOOLEAN DEFAULT false,
    "proof_reading" BOOLEAN DEFAULT false,
    "cover_design" BOOLEAN DEFAULT false,
    "cover_design_type" TEXT,
    "editing" BOOLEAN DEFAULT false,
    "ISBN" BOOLEAN DEFAULT false,
    "online_sale" BOOLEAN DEFAULT false,
    "embossing" BOOLEAN DEFAULT false,
    "foiling" BOOLEAN DEFAULT false,
    "lamination" TEXT NOT NULL,
    "delivery_name" TEXT,
    "delivery_phone" TEXT,
    "pick_up" BOOLEAN DEFAULT false,
    "shipping_address" TEXT,
    "shipping_state" TEXT,
    "shipping_instruction" TEXT,
    "project_type" TEXT,
    "ready_to_print" BOOLEAN DEFAULT false,
    "published" BOOLEAN DEFAULT false,
    "work_in_progress" BOOLEAN DEFAULT false,
    "word_count" INTEGER,
    "current_book_format" TEXT,
    "inside_layout_type" TEXT,
    "art_illustration" BOOLEAN DEFAULT false,
    "art_illustration_type" TEXT,

    CONSTRAINT "book_variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupons" (
    "id" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "status" BOOLEAN,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "book_id" TEXT,
    "temp_book_id" TEXT,
    "created_by" TEXT NOT NULL,
    "client_id" TEXT,
    "deleted_at" TIMESTAMP(3),
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "book_variant_id" TEXT NOT NULL,
    "delivery_address" TEXT,
    "total" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "payment_reference" TEXT,
    "cover_total" INTEGER,
    "inner_total" INTEGER,
    "delivery_fee" INTEGER,
    "discount_id" TEXT,
    "coupon_id" TEXT,
    "inner_page_cost" INTEGER,
    "cover_cost" INTEGER,
    "perfect_binding_cost" INTEGER,
    "lamination_cost" INTEGER,
    "wrapping_cost" INTEGER,
    "trim_cost" INTEGER,
    "embossing_cost" INTEGER,
    "spot_lamination_cost" INTEGER,
    "foil_cost" INTEGER,
    "book_cost" INTEGER,
    "service_cost" INTEGER,
    "markup" INTEGER,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "constants" (
    "id" TEXT NOT NULL,
    "shortcode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" INTEGER,

    CONSTRAINT "constants_pkey" PRIMARY KEY ("shortcode")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL,
    "object_modified" TEXT NOT NULL,
    "action_type" TEXT NOT NULL,
    "old_value" TEXT,
    "new_value" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" TEXT NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "code" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "resource_id" TEXT,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "built_in" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission_role" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "permission_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,

    CONSTRAINT "permission_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "claims" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "type" TEXT NOT NULL,
    "permission_id" TEXT,
    "role_id" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "claims_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "temp_books_id_key" ON "temp_books"("id");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_id_key" ON "invoices"("id");

-- CreateIndex
CREATE UNIQUE INDEX "books_id_key" ON "books"("id");

-- CreateIndex
CREATE UNIQUE INDEX "discounts_id_key" ON "discounts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "book_variants_id_key" ON "book_variants"("id");

-- CreateIndex
CREATE UNIQUE INDEX "book_variants_variant_name_key" ON "book_variants"("variant_name");

-- CreateIndex
CREATE UNIQUE INDEX "coupons_id_key" ON "coupons"("id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_id_key" ON "orders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_id_key" ON "transactions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "constants_id_key" ON "constants"("id");

-- CreateIndex
CREATE UNIQUE INDEX "logs_id_key" ON "logs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_code_key" ON "permissions"("code");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permission_role_permission_id_role_id_key" ON "permission_role"("permission_id", "role_id");

-- CreateIndex
CREATE UNIQUE INDEX "claims_user_id_role_id_key" ON "claims"("user_id", "role_id");

-- CreateIndex
CREATE UNIQUE INDEX "claims_user_id_permission_id_key" ON "claims"("user_id", "permission_id");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts_details" ADD CONSTRAINT "contacts_details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_variants" ADD CONSTRAINT "book_variants_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_variants" ADD CONSTRAINT "book_variants_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_book_variant_id_fkey" FOREIGN KEY ("book_variant_id") REFERENCES "book_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "coupons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_modified_by_fkey" FOREIGN KEY ("modified_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permission_role" ADD CONSTRAINT "permission_role_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permission_role" ADD CONSTRAINT "permission_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claims" ADD CONSTRAINT "claims_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claims" ADD CONSTRAINT "claims_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claims" ADD CONSTRAINT "claims_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

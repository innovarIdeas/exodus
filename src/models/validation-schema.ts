import z from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string()
});

export const userSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" })
    .max(25, { message: "Name must be at most 25 characters long" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" })
    .max(25, { message: "Password must be at most 25 characters long" }),
  email: z.string().email({ message: "Please enter a valid email" })
    .min(8, { message: "Email must be at least 8 characters long" })
    .max(45, { message: "Email must be at most 45 characters long" }),

});

export const roleSchema = z.object({
  name: z.string(),
  built_in: z.boolean(),
  active: z.boolean(),
  permissions_ids: z.array(z.object({ id: z.string() })),
});

export const updateRoleSchema = z.object({
  name: z.string().optional(),
  built_in: z.boolean().optional(),
  active: z.boolean().optional(),
  permissions_ids: z.array(z.object({ id: z.string(), value: z.string(), label: z.string() })).optional(),
});

export const partialRoleSchema = updateRoleSchema.partial().refine(
  (input) =>
    !Object.keys(input).length,
  { message: "At least one field is required" }
);

export const claimSchema = z.object({
  type: z.enum(["ROLE", "PERMISSION"]),
  user_id: z.string(),
  active: z.boolean(),
  permission_id: z.array(z.object({ id: z.string() })),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" })
    .max(25, { message: "Name must be at most 25 characters long" })
    .optional(),
  email: z.string().email({ message: "Please enter a valid email" })
    .min(8, { message: "Email must be at least 8 characters long" })
    .max(45, { message: "Email must be at most 45 characters long" })
    .optional(),

});

export const tempBookSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  book_name: z.string().optional(),
  title: z.string(),
  name: z.string(),
  phone_number: z.string(),
  paper_type: z.string().optional(),
  number_of_words: z.number().int()
    .optional(),
  status: z.string(),
  hard_cover: z.boolean().optional(),
  BW_print: z.boolean().optional(),
  both_print: z.boolean().optional(),
  color_print: z.boolean().optional(),
  cream_paper: z.boolean().optional(),
  glossy_paper: z.boolean().optional(),
  news_print: z.boolean().optional(),
  binding: z.string().optional(),
  white_paper: z.boolean().optional(),
  no_of_books: z.number().int(),
  portrait: z.boolean().optional(),
  quantity_of_color: z.number().int(),
  quantity_of_BW: z.number().int()
    .optional(),
  book_size: z.string(),
  number_of_pages: z.number().int(),
  inside_layout: z.boolean().optional(),
  proof_reading: z.boolean().optional(),
  cover_design: z.boolean().optional(),
  cover_design_type: z.string().optional(),
  editing: z.boolean().optional(),
  ISBN: z.boolean().optional(),
  online_sale: z.boolean().optional(),
  embossing: z.boolean().optional(),
  foiling: z.boolean().optional(),
  lamination: z.string().optional(),
  delivery_name: z.string().optional(),
  delivery_phone: z.string().optional(),
  pick_up: z.boolean().optional(),
  shipping_address: z.string().optional(),
  shipping_state: z.string().optional(),
  shipping_instruction: z.string().optional(),
  project_type: z.string().optional(),
  ready_to_print: z.boolean().optional(),
  published: z.boolean().optional(),
  work_in_progress: z.boolean().optional(),
  word_count: z.number().int()
    .optional(),
  current_book_format: z.string().optional(),
  inside_layout_type: z.string().optional(),
  art_illustration: z.boolean().optional(),
  art_illustration_type: z.string().optional(),
});

export const firstLoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  title: z.string(),
  name: z.string(),
  phone_number: z.string(),
  author: z.string(),
  status: z.string(),
});

export const updateTempBookSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" })
    .optional(),
  book_name: z.string().optional()
    .optional(),
  title: z.string().optional(),
  name: z.string().optional(),
  phone_number: z.string().optional(),
  paper_type: z.string().optional(),
  number_of_words: z.number().int()
    .optional(),
  status: z.string().optional(),
  hard_cover: z.boolean().optional(),
  BW_print: z.boolean().optional(),
  both_print: z.boolean().optional(),
  color_print: z.boolean().optional(),
  cream_paper: z.boolean().optional(),
  glossy_paper: z.boolean().optional(),
  news_print: z.boolean().optional(),
  hard_binding: z.boolean().optional(),
  paper_binding: z.boolean().optional(),
  staple_binding: z.boolean().optional(),
  white_paper: z.boolean().optional(),
  no_of_books: z.number().int()
    .optional(),
  portrait: z.boolean().optional(),
  quantity_of_color: z.number().int()
    .optional(),
  quantity_of_BW: z.number().int()
    .optional(),
  book_size: z.string().optional(),
  number_of_pages: z.number().int()
    .optional(),
  inside_layout: z.boolean().optional(),
  proof_reading: z.boolean().optional(),
  cover_design: z.boolean().optional(),
  cover_design_type: z.string().optional(),
  editing: z.boolean().optional(),
  ISBN: z.boolean().optional(),
  online_sale: z.boolean().optional(),
  embossing: z.boolean().optional(),
  spot_lamination: z.boolean().optional(),
  foiling: z.boolean().optional(),
  glossy_lamination: z.boolean().optional(),
  delivery_name: z.string().optional(),
  delivery_phone: z.string()
    .optional(),
  pick_up: z.boolean().optional(),
  shipping_address: z.string().optional(),
  shipping_state: z.string().optional(),
  shipping_instruction: z.string().optional(),
  project_type: z.string().optional(),
  ready_to_print: z.boolean().optional(),
  published: z.boolean().optional(),
  work_in_progress: z.boolean().optional(),
  word_count: z.number().int()
    .optional(),
  current_book_format: z.string().optional(),
  inside_layout_type: z.string().optional(),
  art_illustration: z.boolean().optional(),
  art_illustration_type: z.string().optional(),
});

export const invoiceSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  book_name: z.string().optional(),
  title: z.string(),
  name: z.string(),
  phone_number: z.number().int()
    .min(1000000000, { message: "Phone number must be at least 10 digits" })
    .max(9999999999, { message: "Phone number must be at most 10 digits" })
    .optional(),
  paper_type: z.string().optional(),
  number_of_words: z.number().int()
    .optional(),
  status: z.string(),
  hard_cover: z.boolean().optional(),
  BW_print: z.boolean().optional(),
  both_print: z.boolean().optional(),
  color_print: z.boolean().optional(),
  cream_paper: z.boolean().optional(),
  glossy_paper: z.boolean().optional(),
  news_print: z.boolean().optional(),
  binding: z.string().optional(),
  white_paper: z.boolean().optional(),
  no_of_books: z.number().int(),
  portrait: z.boolean().optional(),
  quantity_of_Color: z.number().int()
    .optional(),
  quantity_of_BW: z.number().int()
    .optional(),
  book_size: z.string().optional(),
  number_of_pages: z.number().int(),
  inside_layout: z.boolean().optional(),
  proof_reading: z.boolean().optional(),
  cover_design: z.boolean().optional(),
  cover_design_type: z.string().optional(),
  editing: z.boolean().optional(),
  ISBN: z.boolean().optional(),
  online_sale: z.boolean().optional(),
  embossing: z.boolean().optional(),
  foiling: z.boolean().optional(),
  lamination: z.string(),
  delivery_name: z.string().optional(),
  delivery_phone: z.string().optional(),
  pick_up: z.boolean().optional(),
  shipping_address: z.string().optional(),
  shipping_state: z.string().optional(),
  shipping_instruction: z.string().optional(),
  project_type: z.string().optional(),
  ready_to_print: z.boolean().optional(),
  published: z.boolean().optional(),
  work_in_progress: z.boolean().optional(),
  word_count: z.number().int()
    .optional(),
  current_book_format: z.string().optional(),
  inside_layout_type: z.string().optional(),
  art_illustration: z.boolean().optional(),
  art_illustration_type: z.string().optional(),
});

export const bookSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  description: z.string().optional(),
  author: z.string(),
  publisher: z.string().optional(),
  client_id: z.string(),
  status: z.string(),
});

export const updateBookSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" })
    .optional(),
  description: z.string().optional(),
  author: z.string().optional(),
});

export const bookVariantSchema = z.object({
  variant_name: z.string().optional(),
  book_id: z.string(),
  tempbook_id: z.string().optional(),
  paper_type: z.string().optional(),
  number_of_words: z.coerce.number().optional(),
  status: z.string(),
  hard_cover: z.boolean().optional(),
  BW_print: z.boolean().optional(),
  both_print: z.boolean().optional(),
  color_print: z.boolean().optional(),
  cream_paper: z.boolean().optional(),
  glossy_paper: z.boolean().optional(),
  news_print: z.boolean().optional(),
  binding: z.string().optional(),
  white_paper: z.boolean().optional(),
  no_of_books: z.coerce.number(),
  portrait: z.boolean().optional(),
  quantity_of_Color: z.coerce.number().optional(),
  quantity_of_BW: z.coerce.number().optional(),
  book_size: z.string(),
  number_of_pages: z.coerce.number(),
  inside_layout: z.boolean().optional()
    .default(true),
  proof_reading: z.boolean().optional()
    .default(true),
  cover_design: z.boolean().optional()
    .default(true),
  cover_design_type: z.string().optional(),
  editing: z.boolean().optional()
    .default(true),
  ISBN: z.boolean().optional()
    .default(true),
  online_sale: z.boolean().optional()
    .default(true),
  embossing: z.boolean().optional()
    .default(true),
  foiling: z.boolean().optional()
    .default(true),
  lamination: z.string(),
  delivery_name: z.string().optional(),
  delivery_phone: z.string().optional(),
  pick_up: z.boolean().optional(),
  shipping_address: z.string().optional(),
  shipping_state: z.string().optional(),
  shipping_instruction: z.string().optional(),
  project_type: z.string().optional(),
  ready_to_print: z.boolean().optional(),
  published: z.boolean().optional(),
  work_in_progress: z.boolean().optional(),
  word_count: z.coerce.number().optional(),
  current_book_format: z.string().optional(),
  inside_layout_type: z.string().optional(),
  art_illustration: z.boolean().optional(),
  art_illustration_type: z.string().optional(),
});

export const orderSchema = z.object({
  book_id: z.string().optional(),
  client_id: z.string().optional(),
  book_variant_id: z.string(),
  total: z.coerce.number().optional(),
  status: z.string().default("pending_payment"),
  payment_reference: z.string().optional(),
  // cover_total: z.coerce.number().optional(),
  // inner_total: z.coerce.number().optional(),
  // delivery_fee: z.coerce.number().optional(),
  discount_id: z.string().optional(),
  coupon_id: z.string().optional(),
  // inner_page_cost: z.coerce.number().optional(),
  // cover_cost: z.coerce.number().optional(),
  // perfect_binding_cost: z.coerce.number().optional(),
  // lamination_cost: z.coerce.number().optional(),
  // wrapping_cost: z.coerce.number().optional(),
  // trim_cost: z.coerce.number().optional(),
  // embossing_cost: z.coerce.number().optional(),
  // spot_lamination_cost: z.coerce.number().optional(),
  // foil_cost: z.coerce.number().optional(),
  // book_cost: z.coerce.number().optional(),
  service_cost: z.coerce.number().optional(),
  markup: z.coerce.number()
    .optional(),
  delivery_address: z.string().optional(),
});

export const couponSchema = z.object({
  name: z.string(),
  percentage: z.coerce.number(),
  expires_at: z.coerce.date()
    .min(new Date(1900, 1, 1), { message: "Date of employment must be after 1900" }),
});

export const updateCouponSchema = z.object({ status: z.boolean() });

export const updateOrderSchema = z.object({ print_status: z.string() });

export const discountSchema = z.object({
  name: z.string(),
  percentage: z.coerce.number(),
  expires_at: z.coerce.date()
    .min(new Date(1900, 1, 1), { message: "Date of employment must be after 1900" }),
  book_id: z.string(),
});

export const transactionSchema = z.object({
  order_id: z.string(),
  status: z.string(),
  type: z.string(),
});

export const updateTransactionSchema = z.object({ status: z.string() });

export const updateConstantSchema = z.object(
  {
    name: z.string(),
    value: z.coerce.number(),
    description: z.string().optional(),
    shortcode: z.string()
  });

export const bulkBookSchema = z.array(
  z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().optional(),
    status: z.string().optional(),
    description: z.string().optional(),
  })
);

export const bulkBookVariantSchema = z.array(
  z.object({
    book_title: z.string(),
    book_author: z.string(),
    book_description: z.string().optional(),
    variant_name: z.string(),
    paper_type: z.string(),
    status: z.string(),
    book_size: z.string(),
    number_of_pages: z.coerce.number(),
    lamination: z.string(),
    no_of_books: z.coerce.number(),
    tempbook_id: z.string().optional(),
    number_of_words: z.coerce.number().optional(),
    hard_cover: z.boolean().optional(),
    BW_print: z.boolean().optional(),
    both_print: z.boolean().optional(),
    color_print: z.boolean().optional(),
    cream_paper: z.boolean().optional(),
    glossy_paper: z.boolean().optional(),
    news_print: z.boolean().optional(),
    binding: z.string().optional(),
    white_paper: z.boolean().optional(),
    portrait: z.boolean().optional(),
    quantity_of_Color: z.coerce.number().optional(),
    quantity_of_BW: z.coerce.number().optional(),
    inside_layout: z.boolean().optional()
      .default(true),
    proof_reading: z.boolean().optional()
      .default(true),
    cover_design: z.boolean().optional()
      .default(true),
    cover_design_type: z.string().optional(),
    editing: z.boolean().optional()
      .default(true),
    ISBN: z.boolean().optional()
      .default(true),
    online_sale: z.boolean().optional()
      .default(true),
    embossing: z.boolean().optional()
      .default(true),
    foiling: z.boolean().optional()
      .default(true),
    delivery_name: z.string().optional(),
    delivery_phone: z.string().optional(),
    pick_up: z.boolean().optional(),
    shipping_address: z.string().optional(),
    shipping_state: z.string().optional(),
    shipping_instruction: z.string().optional(),
    project_type: z.string().optional(),
    ready_to_print: z.boolean().optional(),
    published: z.boolean().optional(),
    work_in_progress: z.boolean().optional(),
    word_count: z.coerce.number().optional(),
    current_book_format: z.string().optional(),
    inside_layout_type: z.string().optional(),
    art_illustration: z.boolean().optional(),
    art_illustration_type: z.string().optional(),
  })
);

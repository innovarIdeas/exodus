import z from "zod";

export const loginSchema = z.object({
  username: z.string().min(2, { message: "user_min" })
    .max(25, { message: "user_max" }),
  password: z.string().min(5, { message: "pass_min" })
    .max(20, { message: "pass_max" }),
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
    .min(1000000000)
    .max(9999999999)
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
  hard_binding: z.boolean().optional(),
  paper_binding: z.boolean().optional(),
  staple_binding: z.boolean().optional(),
  white_paper: z.boolean().optional(),
  no_of_books: z.number().int()
    .optional(),
  portrait: z.boolean().optional(),
  quantity_of_Color: z.number().int()
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
  delivery_phone: z.number().int()
    .min(1000000000)
    .max(9999999999)
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

export const bookSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" }),
  description: z.string().optional(),
});

export const updateBookSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters long" })
    .max(100, { message: "Title must be at most 100 characters long" })
    .optional(),
  description: z.string().optional(),
});

export const bookVariantSchema = z.object({
  variant_name: z.string(),
  book_id: z.string(),
  paper_type: z.string().optional(),
  status: z.string(),
  number_of_words: z.coerce.number().optional(),
  hard_cover: z.boolean().default(false),
  BW_print: z.boolean().default(false),
  both_print: z.boolean().default(false),
  color_print: z.boolean().default(false),
  cream_paper: z.boolean().default(false),
  glossy_paper: z.boolean().default(false),
  news_print: z.boolean().default(false),
  binding: z.string().optional(),
  white_paper: z.boolean().default(false),
  no_of_books: z.coerce.number().optional(),
  portrait: z.boolean().default(false),
  quantity_of_Color: z.coerce.number().optional(),
  quantity_of_BW: z.coerce.number().optional(),
  book_size: z.string().optional(),
  number_of_pages: z.coerce.number().optional(),
  inside_layout: z.boolean().default(false),
  proof_reading: z.boolean().default(false),
  cover_design: z.boolean().default(false),
  cover_design_type: z.string().optional(),
  editing: z.boolean().default(false),
  ISBN: z.boolean().default(false),
  online_sale: z.boolean().default(false),
  embossing: z.boolean().default(false),
  foiling: z.boolean().default(false),
  lamination: z.string().optional(),
  delivery_name: z.string().optional(),
  delivery_phone: z.number().optional(),
  pick_up: z.boolean().default(false),
  shipping_address: z.string().optional(),
  shipping_state: z.string().optional(),
  shipping_instruction: z.string().optional(),
  project_type: z.string().optional(),
  readyToPrint: z.boolean().default(false),
  published: z.boolean().default(false),
  workInProgress: z.boolean().default(false),
  word_count: z.number().optional(),
  current_book_format: z.string().optional(),
  inside_layout_type: z.string().optional(),
  art_illustration: z.boolean().default(false),
  art_illustration_type: z.string().optional(),
});

export const orderSchema = z.object({
  client_id: z.string(),
  book_variant_id: z.string().optional(),
  total: z.coerce.number(),
  status: z.string().default("pending_payment"),
  payment_reference: z.string().optional(),
  cover_total: z.coerce.number(),
  inner_total: z.coerce.number(),
  delivery_fee: z.coerce.number(),
  discount_id: z.string().optional(),
  coupon_id: z.string().optional(),
  inner_page_cost: z.coerce.number(),
  cover_cost: z.coerce.number(),
  perfect_binding_cost: z.coerce.number(),
  lamination_cost: z.coerce.number(),
  wrapping_cost: z.coerce.number(),
  trim_cost: z.coerce.number(),
  embossing_cost: z.coerce.number(),
  spot_lamination_cost: z.coerce.number(),
  foil_cost: z.coerce.number(),
  book_cost: z.coerce.number(),
  service_cost: z.coerce.number(),
  markup: z.coerce.number()
    .optional(),
  delivery_address: z.string().optional(),
});

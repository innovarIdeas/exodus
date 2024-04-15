export interface IBase {
  id: string;
  active: boolean;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IBase {
  id: string;
  active: boolean;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IPaystackResponse {
  reference: string;
}

export interface IConstant extends IBase {
  id: string;
  name: string;
  shortcode: string;
  value: number;
  description: string;
}

export interface IPermission {
  id: string;
  code: string;
  active: boolean;
  module: string;
  action: string;
  resource_id?: string | null;
}

export interface IPermissionRole {
  active: boolean;
  permission_id: string;
  role_id: string;
  permission: IPermission;
}

export interface IRole extends IBase {
  id: string;
  name: string;
  active: boolean;
  built_in: boolean;
  permissions: IPermissionRole[];
}

export interface IClaim extends IBase {
  id: string;
  user_id: string;
  role_id: string;
  role: IRole;
}

export interface IValidationError {
  field: string;
  rule: string;
  message: string;
}

export type IPaperType = "CREAM_PAPER_LARGE" | "ART_PAPER_135" | "NEWS_PRINT"  | "WHITE_PAPER_LARGE";

export type IPageSize = "A4" | "A5";

export type IIllustrationType = "Simple-black-and-white-sketch-and-linking" | "Full-color-flat-2D-illustration" | "Full-color-3D-illustration" | "comic";

export type ILayoutType =
"Poetry-Layout" |
"Poetry-with-pictures" |
"Simple-fiction-or-non-fiction-layout-with-no-graphics-or-image" |
"Fiction-or-non-fiction-layout-with-pictures-graphics-and-chart" |
"comic";

export type ICoverDesign =
"Graphics-with-online-images-or-author-supplied-image" |
"Graphics-with-premium-paid-image" |
"Artist-Illustrated";

export interface IApiError extends Error {
  code: string;
  message: string;
}

export interface IApiResponse<T> {
  data?: T;
  validationErrors?: IValidationError[];
  error?: Error;
}

export interface IUser extends IBase {
  name: string;
  email: string;
  password: string;
}

export interface ISingleUser extends IBase {
  name: string;
  email: string;
  password: string;
  created_books: IBook[];
  transactions: ITransaction[];
  order: IOrder[];
  book_variant: IBookVariant[];
}

export interface IFirstTimeOrderResponse extends IBase {
  user: IUser;
  bookVariant: IBookVariant;
  order: IOrder;
}

export interface IBook extends IBase {
  title: string;
  author: string;
  createdBy: string;
  created_by_user: IUser;
  client: IUser;
  status: string;
  description: string | null;
  transactions: ITransaction[];
  Order: IOrder[];
  book_variants: IBookVariant[];

}

type WebhookEvent =
  | "charge.dispute.create"
  | "charge.dispute.remind"
  | "charge.dispute.resolve"
  | "charge.success"
  | "customeridentification.failed"
  | "customeridentification.success"
  | "dedicatedaccount.assign.failed"
  | "dedicatedaccount.assign.success"
  | "invoice.create"
  | "invoice.payment_failed"
  | "invoice.update"
  | "paymentrequest.pending"
  | "paymentrequest.success"
  | "refund.failed"
  | "refund.pending"
  | "refund.processed"
  | "refund.processing"
  | "subscription.create"
  | "subscription.disable"
  | "subscription.expiring_cards"
  | "subscription.not_renew"
  | "transfer.failed"
  | "transfer.success"
  | "transfer.reversed";

export interface IWebhookEventResponse {
  event: WebhookEvent;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: number;
    log: {
      time_spent: number;
      attempts: number;
      authentication: string;
      errors: number;
      success: boolean;
      mobile: boolean;
      input: [];
      channel: string | null;
      history: {
        type: string;
        message: string;
        time: number;
      }[];
    };
    fees:  null;
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: null;
      risk_action: string;
    };
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      account_name: string;
    };
    plan: string;
  };
}

export interface IBookVariant extends IBase {
  variant_name: string;
  book: IBook;
  created_by: string;
  created_by_user: IUser;
  tempbook_id: string ;
  paper_type: string;
  number_of_words: number ;
  status?: "Work in Progress" | "Ready to Print";
  hard_cover: boolean;
  BW_print: boolean;
  both_print: boolean;
  color_print: boolean;
  cream_paper: boolean;
  glossy_paper: boolean;
  news_print: boolean;
  binding: string ;
  white_paper: boolean;
  no_of_books: number;
  portrait: boolean;
  quantity_of_Color?: number | undefined;
  quantity_of_BW: number ;
  book_size: string ;
  number_of_pages: number ;
  inside_layout: boolean;
  proof_reading: boolean;
  cover_design: boolean;
  cover_design_type: string;
  editing: boolean;
  ISBN: boolean;
  online_sale: boolean;
  embossing: boolean;
  foiling: boolean;
  lamination: string;
  delivery_name: string;
  delivery_phone: string;
  pick_up: boolean;
  shipping_address: string;
  shipping_state: string;
  shipping_instruction: string;
  project_type: string;
  ready_to_print: boolean;
  published: boolean;
  work_in_progress: boolean;
  word_count: number ;
  current_book_format: string;
  inside_layout_type: string;
  art_illustration: boolean;
  art_illustration_type: string;
  order: IOrder[];
}

export interface ITempBook extends IBase  {
  email: string;
  book_name: string;
  title: string;
  name: string;
  phone_number: string;
  paper_type: string;
  number_of_words: number;
  status: string;
  hard_cover: boolean;
  BW_print: boolean;
  both_print: boolean;
  color_print: boolean;
  cream_paper: boolean;
  glossy_paper: boolean;
  news_print: boolean;
  binding: string;
  white_paper: boolean;
  no_of_books: number;
  portrait: boolean;
  quantity_of_color: number;
  quantity_of_BW: number;
  book_size: string;
  number_of_pages: number;
  inside_layout: boolean;
  proof_reading: boolean;
  cover_design: boolean;
  cover_design_type: string;
  editing: boolean;
  ISBN: boolean;
  online_sale: boolean;
  embossing: boolean;
  foiling: boolean;
  lamination: string;
  delivery_name: string;
  delivery_phone: string;
  pick_up: boolean;
  shipping_address: string;
  shipping_state: string;
  shipping_instruction: string;
  project_type: string;
  ready_to_print: boolean;
  published: boolean;
  work_in_progress: boolean;
  word_count: number;
  current_book_format: string;
  inside_layout_type: string;
  art_illustration: boolean;
  art_illustration_type: string;
  bindong: string;
}

export interface IBookData {
  email: string;
  book_name: string;
  title: string;
  name: string;
  phone_number: string | number;
  paper_type: string;
  number_of_words: number;
  status: string;
  hard_cover: boolean;
  BW_print: boolean;
  both_print: boolean;
  color_print: boolean;
  cream_paper: boolean;
  glossy_paper: boolean;
  news_print: boolean;
  binding: string;
  white_paper: boolean;
  no_of_books: number;
  portrait: boolean;
  book_size: string;
  number_of_pages: number;
  ISBN: boolean;
  embossing: boolean;
  foiling: boolean;
  lamination: string;
  delivery_name: string;
  delivery_phone: string;
  pick_up: boolean;
  shipping_address: string;
  shipping_state: string;
  shipping_instruction: string;
  project_type: string;
  ready_to_print: boolean;
  work_in_progress: boolean;
  word_count: number;
  editing: boolean;
  inside_layout: boolean;
  current_book_format: string;
  inside_layout_type: string;
  proof_reading: boolean;
  cover_design: boolean;
  cover_design_type: string;

}

export interface IOrder extends IBase {
  id:                   string;
  book:                 IBook;
  temp_book_id:         string;
  created_by:           string;
  client_id:            string;
  client:               IUser;
  created_by_user:      IUser;
  book_variant:         IBookVariant;
  delivery_address:     string;
  total:                number;
  status:               string;
  print_status:         string;
  payment_reference:    string;
  cover_total:          number;
  inner_total:          number;
  delivery_fee:         number;
  coupon_id:            string;
  coupon_by_id:         ICoupon;
  inner_page_cost:      number;
  cover_cost:           number;
  perfect_binding_cost: number;
  lamination_cost:      number;
  wrapping_cost:        number;
  trim_cost:            number;
  embossing_cost:       number;
  spot_lamination_cost: number;
  foil_cost:            number;
  book_cost:            number;
  service_cost:         number;
  markup:               number;
  transactions:         number;

}

export interface ICoupon extends IBase {
  name: string;
  percentage: number;
  status: boolean;
  created_by_user: IUser;
  expires_at: string;
}

export interface ITransaction  extends IBase {
  type: "TRANSFER" | "CASH" | "ONLINE" | "CARD";
  status: string;
  order_id: string;
  order: IOrder;
  book_by_id?: IBook;
  user_id: string;
  created_by_user: IUser;

}

export interface IDiscount extends IBase {
  name: string;
  percentage: number;
  book: IBook;
  expires_at: string;
}

export interface ITransaction extends IBase {
  order: IOrder;
  status: string;
  transaction_type: string;
}


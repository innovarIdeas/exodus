import { IApiError, IApiResponse, IBook, IBookVariant, IClaim, IConstant, ICoupon, IDiscount, IFirstTimeOrderResponse, IOrder,   IPermission, IRole, ISingleUser, ITempBook, ITransaction, IUser, IValidationError } from "@/models/models";
import {
  UpdateUserSchema,
  bookSchema,
  bookVariantSchema,
  claimSchema,
  couponSchema,
  orderSchema,
  roleSchema,
  tempBookSchema,
  transactionSchema,
  updateBookSchema,
  updateConstantSchema,
  updateCouponSchema,
  updateOrderSchema,
  updateRoleSchema,
  updateTransactionSchema,
  userSchema,
} from "@/models/validation-schema";
import { z } from "zod";

async function handleValidationResponse (response: Response) {
  const issues = await response.json() as IValidationError[];
  const data = await response.json() as { error: { code: string; message: string; path: string[] }[] };
  const validationErrors = data.error;

  validationErrors.forEach(error => {
    issues.push({
      rule: error.code,
      message: error.message,
      field: error.path[0],
    });
  });

  return issues;
}

async function handleServerError (response: Response) {
  const data = await response.json() as IApiError;

  return data;
}

async function handleApiCalls<T> (response: Response): Promise<IApiResponse<T>> {
  try {
    if (response.status >= 400 && response.status <= 499) {
      return { validationErrors: await handleValidationResponse(response) };
    }

    if (response.status >= 500) {
      return { error: await handleServerError(response) };
    }

    return { data: await response.json() as T };
  } catch (error) {
    console.error("api call error", error);

    return { ...(error ? { error } : {}) } as IApiResponse<T>;
  }
}

export const createRole = async (data: z.infer<typeof roleSchema>): Promise<IApiResponse<IRole>> => {
  return handleApiCalls(await fetch("/api/roles/", {
    method: "POST",
    body: JSON.stringify(
      {
        name: data.name,
        built_in: data.built_in,
        active: data.active,
        permissions_ids: data.permissions_ids.map((permission) => ({ id: permission.id })),
      }
    ),
  }));
};

export const getUserRoles = async (id: string): Promise<IApiResponse<IClaim[]>> => {
  return handleApiCalls(await fetch("/api/user-permissions/user/" + id, { method: "GET" }));
};

export const getAllRoles = async (): Promise<IApiResponse<IRole[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/roles", { method: "GET" }));
};

export const updateRole = async (data: z.infer<typeof updateRoleSchema>, id: string): Promise<IApiResponse<IRole>> => {
  return handleApiCalls(await fetch(`/api/roles/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  }));
};

export const getRoles = async () => {
  const roles = await fetch("/api/roles", { method: "GET" });
  const data = await roles.json() as IRole[];

  return data.map((role) => ({
    value: role.id,
    label: role.name,
    id: role.id,
  }));
};

export const getAllPermissions = async (): Promise<IApiResponse<IPermission[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/permissions", { method: "GET" }));
};

export const getAllUsers = async (): Promise<IApiResponse<IUser[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/users", { method: "GET" }));
};

export const getSingleUser = async (id: string): Promise<IApiResponse<ISingleUser>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/users/" + id,
    { method: "GET" }));
};

export const getAllPublishers = async (): Promise<IApiResponse<IUser[]>> => {
  return handleApiCalls(
    await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/users/publishers", { method: "GET" })
  );
};

export const getAllUserClient = async (): Promise<IApiResponse<IUser[]>> => {
  return handleApiCalls(
    await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/users/clients", { method: "GET" })
  );
};

export const getAllStaffs = async (): Promise<IApiResponse<IUser[]>> => {
  return handleApiCalls(
    await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/users/staffs", { method: "GET" })
  );
};

export const createUser = async (data: z.infer <typeof userSchema>): Promise<IApiResponse<IUser>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/users",
    {
      method: "POST",
      body: JSON.stringify(data)
    }));
};

export const addUserRole = async (data: z.infer<typeof claimSchema>): Promise<IApiResponse<IUser>> => {
  return handleApiCalls(await fetch("/api/user-permissions/", {
    method: "POST",
    body: JSON.stringify(data),
  }));
};

export const firstTimeOrder = async (id: string): Promise<IApiResponse<IFirstTimeOrderResponse>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/first-time-orders/" + id,
    { method: "POST" }));
};

export const editUser = async (id: string, data: z.infer <typeof UpdateUserSchema>): Promise<IApiResponse<IUser[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/users/" + id,
    {
      method: "PATCH",
      body: JSON.stringify(data)
    }));
};

export const deleteUser = async (id: string): Promise<IApiResponse<IUser[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/users/" + id,
    { method: "DELETE" }));
};

export const getAllBooks = async (): Promise<IApiResponse<IBook[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/books", { method: "GET" }));
};

export const getUserBooks = async (id: string): Promise<IApiResponse<IBook[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/users/books/" + id,
    { method: "GET" }));
};

export const createUserBook = async (
  data: z.infer<typeof bookSchema>
): Promise<IApiResponse<IBook>> => {
  return handleApiCalls(
    await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/users/books", {
      method: "POST",
      body: JSON.stringify(data),
    })
  );
};

export const editUserBook = async (
  id: string,
  data: z.infer<typeof updateBookSchema>
): Promise<IApiResponse<IBook[]>> => {
  return handleApiCalls(
    await fetch(
      process.env.NEXT_PUBLIC_BROWSER_URL + "/api/users/books/" + id,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    )
  );
};

export const deleteUserBook = async (
  id: string
): Promise<IApiResponse<IBook[]>> => {
  return handleApiCalls(
    await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/users/books/" + id, { method: "DELETE" })
  );
};

export const getUserTransactions = async (id: string): Promise<IApiResponse<ITransaction[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/users/transactions/" + id,
    { method: "GET" }));
};

export const getUserOrders = async (id: string): Promise<IApiResponse<IOrder[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/users/orders/" + id,
    { method: "GET" }));
};

export const getUserBookVariants = async (id: string): Promise<IApiResponse<IBookVariant[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/users/book-variants/" + id,
    { method: "GET" }));
};

export const createUserBookVariant = async (
  data: z.infer<typeof bookVariantSchema>
): Promise<IApiResponse<IBookVariant>> => {
  return handleApiCalls(
    await fetch(
      process.env.NEXT_PUBLIC_BROWSER_URL + "/api/users/book-variants",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    )
  );
};

export const createBook = async (data: z.infer <typeof bookSchema>): Promise<IApiResponse<IBook[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/books",
    {
      method: "POST",
      body: JSON.stringify(data)
    }));
};

export const editBook = async (id: string, data: z.infer <typeof updateBookSchema>): Promise<IApiResponse<IBook[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/books/" + id,
    {
      method: "PATCH",
      body: JSON.stringify(data)
    }));
};

export const createTempBook = async (data: z.infer <typeof tempBookSchema>): Promise<IApiResponse<ITempBook>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/temp-books/",
    {
      method: "POST",
      body: JSON.stringify(data)
    }));
};

export const editTempBook = async (id: string, data: z.infer <typeof tempBookSchema>): Promise<IApiResponse<ITempBook>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/temp-books/" + id,
    {
      method: "PATCH",
      body: JSON.stringify(data)
    }));
};

export const getAllTempBook = async (id: string, data: z.infer <typeof tempBookSchema>): Promise<IApiResponse<ITempBook[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/temp-books/" + id,
    {
      method: "GET",
      body: JSON.stringify(data)
    }));
};

export const getSingleTempBook = async (id: string): Promise<IApiResponse<ITempBook>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/temp-books/" + id,
    { method: "GET" }));
};

export const deleteBook = async (id: string): Promise<IApiResponse<IBook[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/books/" + id,
    { method: "DELETE" }));
};

export const getAllBookVariants = async (): Promise<IApiResponse<IBookVariant[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/book-variant", { method: "GET" }));
};

export const createBookVariant = async (data: z.infer <typeof bookVariantSchema>): Promise<IApiResponse<IBookVariant>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/book-variant",
    {
      method: "POST",
      body: JSON.stringify(data)
    }));
};

export const getBookVariant = async (id: string): Promise<IApiResponse<IBookVariant>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/book-variant/" + id,
    { method: "GET" }));
};

export const createOrder = async (data: z.infer <typeof orderSchema>): Promise<IApiResponse<IOrder>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/order",
    {
      method: "POST",
      body: JSON.stringify(data)
    }));
};

export const getAllOrders = async (): Promise<IApiResponse<IOrder[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/order", { method: "GET" }));
};

export const getSingleOrder = async (id: string): Promise<IApiResponse<IOrder>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/order/" + id, { method: "GET" }));
};

export const getAllClients = async (): Promise<IApiResponse<IUser[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/clients", { method: "GET" }));
};

export const createClient = async (data: z.infer <typeof userSchema>): Promise<IApiResponse<IUser[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/clients",
    {
      method: "POST",
      body: JSON.stringify(data)
    }));
};

export const editClient = async (id: string, data: z.infer <typeof UpdateUserSchema>): Promise<IApiResponse<IUser[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/clients/" + id,
    {
      method: "PATCH",
      body: JSON.stringify(data)
    }));
};

export const deleteClient = async (id: string): Promise<IApiResponse<IUser[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/clients/" + id,
    { method: "DELETE" }));
};

export const createCoupon = async (data: z.infer <typeof couponSchema>): Promise<IApiResponse<ICoupon>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/coupon",
    {
      method: "POST",
      body: JSON.stringify(data)
    }));
};

export const getAllCoupons = async (): Promise<IApiResponse<ICoupon[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/coupon", { method: "GET" }));
};

export const deleteCoupon = async (id: string): Promise<IApiResponse<ICoupon>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/coupon/" + id,
    { method: "DELETE" }));
};

export const updateCoupon = async (id: string, data: z.infer <typeof updateCouponSchema>): Promise<IApiResponse<ICoupon>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/coupon/" + id,
    {
      method: "PATCH",
      body: JSON.stringify(data)
    }));
};

export const updateOrderPrintStatus = async (id: string, data: z.infer <typeof updateOrderSchema>): Promise<IApiResponse<IOrder>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/order/print-status/" + id,
    {
      method: "PATCH",
      body: JSON.stringify(data)
    }));
};

export const createDiscount = async (data: z.infer <typeof couponSchema>): Promise<IApiResponse<IDiscount>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/discount",
    {
      method: "POST",
      body: JSON.stringify(data)
    }));
};

export const getAllDiscounts = async (): Promise<IApiResponse<IDiscount[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/discount", { method: "GET" }));
};

export const deleteDiscount = async (id: string): Promise<IApiResponse<IDiscount>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/discount/" + id,
    { method: "DELETE" }));
};

export const getPublisherOrders = async (): Promise<IApiResponse<IOrder[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/order/publishers/", { method: "GET" }));
};

export const createTransaction = async (data: z.infer <typeof transactionSchema>): Promise<IApiResponse<ITransaction>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/transactions",
    {
      method: "POST",
      body: JSON.stringify(data)
    }));
};

export const getAllTransactions = async (): Promise<IApiResponse<ITransaction[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/transactions", { method: "GET" }));
};

export const updateTransaction = async (id: string, data: z.infer <typeof updateTransactionSchema>): Promise<IApiResponse<ITransaction>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/transactions/" + id,
    {
      method: "PATCH",
      body: JSON.stringify(data)
    }));
};

export const getAllConstants = async (): Promise<IApiResponse<IConstant[]>> => {
  return handleApiCalls(
    await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/constants", { method: "GET" })
  );
};

export const createConstant = async (
  data: z.infer<typeof updateConstantSchema>
): Promise<IApiResponse<IConstant>> => {
  return handleApiCalls(
    await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/constants", {
      method: "POST",
      body: JSON.stringify(data),
    })
  );
};

export const deleteConstant = async (
  id: string
): Promise<IApiResponse<IConstant>> => {
  return handleApiCalls(
    await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/constants/" + id, { method: "DELETE" })
  );
};

export const updateConstant = async (
  id: string,
  data: z.infer<typeof updateConstantSchema>
): Promise<IApiResponse<IConstant>> => {
  return handleApiCalls(
    await fetch(
      process.env.NEXT_PUBLIC_BROWSER_URL + "/api/constants/" + id,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    )
  );
};


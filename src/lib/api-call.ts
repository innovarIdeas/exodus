import { IApiError, IApiResponse, IBook, IBookVariant, IOrder, IUser, IValidationError } from "@/models/models";
import { UpdateUserSchema, bookSchema, bookVariantSchema, orderSchema, updateBookSchema, userSchema } from "@/models/validation-schema";
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

export const getAllUsers = async (): Promise<IApiResponse<IUser[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/users", { method: "GET" }));
};

export const createUser = async (data: z.infer <typeof userSchema>): Promise<IApiResponse<IUser[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/users",
    {
      method: "POST",
      body: JSON.stringify(data)
    }));
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

export const createOrder = async (data: z.infer <typeof orderSchema>): Promise<IApiResponse<IOrder[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/order",
    {
      method: "POST",
      body: JSON.stringify(data)
    }));
};

export const getAllOrders = async (): Promise<IApiResponse<IOrder[]>> => {
  return handleApiCalls(await fetch(process.env.NEXT_PUBLIC_BROWSER_URL + "/api/order", { method: "GET" }));
};


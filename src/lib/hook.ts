"use client";

import { IOrder, IPermission } from "@/models/models";
import { PAYMENT_STATUS, PAYMENT_TYPE, QUERY_KEY } from "./rbac";
import { createTransaction, getAllBookVariants, getAllBooks, getAllClients, getAllOrders, getAllPublishers, getAllTransactions, getSingleOrder, getSingleUser, getUserBookVariants, getUserBooks, getUserOrders, getUserTransactions } from "./api-call";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function usePermissions (): [boolean, IPermission[]] {
  const { data: session, status } = useSession();

  return [status === "authenticated", [...session?.permissions ?? []]];
}

export const useGetAllBook = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_BOOKS],
    queryFn: async () => {
      const { data, validationErrors, error } = await getAllBooks();

      if (validationErrors?.length) {
        console.error(validationErrors[0].message);

        return;
      }

      if (error) {
        console.log(error);

        return;
      }

      return data;
    }
  });

  if (!data) return [];

  return data;
};

export const useGetAllBookVariant = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_BOOK_VARIANTS],
    queryFn: async () => {
      const { data, validationErrors, error } = await getAllBookVariants();

      if (validationErrors?.length) {
        console.error(validationErrors[0].message);

        return;
      }

      if (error) {
        console.log(error);

        return;
      }

      return data;
    }
  });

  if (!data) return [];

  return data;
};

export const useGetAllUser = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_USERS],
    queryFn: async () => {
      const { data, validationErrors, error } = await getAllClients();

      if (validationErrors?.length) {
        console.error(validationErrors[0].message);

        return;
      }

      if (error) {
        console.log(error);

        return;
      }

      return data;
    }
  });

  if (!data) return [];

  return data;
};

export const useGetAllPublishers = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_PULISHERS],
    queryFn: async () => {
      const { data, validationErrors, error } = await getAllPublishers();

      if (validationErrors?.length) {
        console.error(validationErrors[0].message);

        return;
      }

      if (error) {
        console.log(error);

        return;
      }

      return data;
    }
  });

  if (!data) return [];

  return data;
};

export const useGetSingleOrder = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_SINGLE_ORDER],
    queryFn: async () => {
      const { data, validationErrors, error } = await getSingleOrder(id);

      if (validationErrors?.length) {
        console.error(validationErrors[0].message);

        return;
      }

      if (error) {
        console.log(error);

        return;
      }

      return data;
    },
    staleTime: 0,
  });

  return { data: data || undefined, isLoading };
};

export const useGetUserBooks = (id: string) => {
  const { data, refetch } = useQuery({
    queryKey: [QUERY_KEY.GET_USER_BOOKS],
    queryFn: async () => {
      const { data, validationErrors, error } = await getUserBooks(id);

      if (validationErrors?.length) {
        console.error(validationErrors[0].message);

        return;
      }

      if (error) {
        console.log(error);

        return;
      }

      return data;
    }
  });

  return { data, refetch };
};

export const useGetUserBookVariants = (id: string) => {
  const { data, refetch } = useQuery({
    queryKey: [QUERY_KEY.GET_USER_BOOKVARIANTS],
    queryFn: async () => {
      const { data, validationErrors, error } = await getUserBookVariants(id);

      if (validationErrors?.length) {
        console.error(validationErrors[0].message);

        return;
      }

      if (error) {
        console.log(error);

        return;
      }

      return data;
    }
  });

  return { data, refetch };
};

export const useGetUserOrders = (id: string) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_USER_ORDERS],
    queryFn: async () => {
      const { data, validationErrors, error } = await getUserOrders(id);

      if (validationErrors?.length) {
        console.error(validationErrors[0].message);

        return;
      }

      if (error) {
        console.log(error);

        return;
      }

      return data;
    }
  });

  return data || undefined;
};

export const useGetUserTransactions = (id: string) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_USER_TRANSACTIONS],
    queryFn: async () => {
      const { data, validationErrors, error } = await getUserTransactions(id);

      if (validationErrors?.length) {
        console.error(validationErrors[0].message);

        return;
      }

      if (error) {
        console.log(error);

        return;
      }

      return data;
    }
  });

  return data || undefined;
};

export const useGetSingleUser = (id: string) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_SINGLE_USER],
    queryFn: async () => {
      const { data, validationErrors, error } = await getSingleUser(id);

      if (validationErrors?.length) {
        console.error(validationErrors[0].message);

        return;
      }

      if (error) {
        console.log(error);

        return;
      }

      return data;
    }
  });

  return data || undefined;
};

export const useGetAllOrder = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_ORDER],
    queryFn: async () => {
      const { data, validationErrors, error } = await getAllOrders();

      if (validationErrors?.length) {
        console.error(validationErrors[0].message);

        return;
      }

      if (error) {
        console.log(error);

        return;
      }

      return data;
    }
  });

  return data || undefined;
};

export const useGetAllTransactions = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_TRANSACTION],
    queryFn: async () => {
      const { data, validationErrors, error } = await getAllTransactions();

      if (validationErrors?.length) {
        console.error(validationErrors[0].message);

        return;
      }

      if (error) {
        console.log(error);

        return;
      }

      return data;
    }
  });

  return data || undefined;
};

export const createTransactionTrigger =  (order: IOrder) =>{
  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_TRANSACTION],
    queryFn: async () => {
      const { data, validationErrors, error } = await createTransaction({ order_id: order.id, status: PAYMENT_STATUS.NOT_PAID, type: PAYMENT_TYPE.CARD });

      if (validationErrors?.length) {
        console.error(validationErrors[0].message);

        return;
      }

      if (error) {
        console.log(error);

        return;
      }

      return data;
    }
  });

  return data || undefined;
};

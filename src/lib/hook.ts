"use client";

import { getAllBookVariants, getAllBooks, getAllUsers, getSingleOrder } from "./api-call";
import { IPermission } from "@/models/models";
import { QUERY_KEY } from "./rbac";
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
      const { data, validationErrors, error } = await getAllUsers();

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
  const { data } = useQuery({
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
    }
  });

  // Return undefined when there's no data
  return data || undefined;
};


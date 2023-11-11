"use client";

import { IPermission } from "@/models/models";
import { QUERY_KEY } from "./rbac";
import { getAllBooks } from "./api-call";
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

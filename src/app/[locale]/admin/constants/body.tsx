"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AddNewConstant from "@/components/AddNewConstant";
import { Button } from "@/components/ui/button";
import { ConstantDataTable } from "./data-table";
import { IConstant } from "@/models/models";
import { QUERY_KEY } from "@/lib/rbac";
import { columns } from "./columns";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";

interface PaginationState {
  page: number;
  pageSize: number;
}

interface PaginatedResponse {
  data: IConstant[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

const fetchConstants = async (page: number, pageSize: number, search: string): Promise<PaginatedResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    ...(search && { search }),
  });

  const response = await fetch(`/api/constants?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch constants");
  }

  return response.json();
};

export default function ConstantBody () {
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    pageSize: 10,
  });
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 300);

  const queryKey = useMemo(
    () => [QUERY_KEY.GET_ALL_CONSTANTS, pagination.page, pagination.pageSize, debouncedSearch],
    [pagination.page, pagination.pageSize, debouncedSearch]
  );

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => fetchConstants(pagination.page, pagination.pageSize, debouncedSearch),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const handlePaginationChange = useCallback((page: number, pageSize: number) => {
    setPagination({ page, pageSize });
  }, []);

  const handleSearchChange = useCallback((search: string) => {
    setSearchValue(search);
    setPagination(prev => ({ ...prev, page: 0 })); // Reset to first page on search
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-red-500">Error loading constants: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end items-end float-right mx-5 my-5">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="ml-4 px-6 whitespace-nowrap bg-main">
              Add New Constant
            </Button>
          </SheetTrigger>

          <SheetContent className="w-2/3 sm:w-full">
            <AddNewConstant />
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <ConstantDataTable
          columns={columns}
          data={data?.data || []}
          pagination={data?.pagination || { page: 0, pageSize: 10, total: 0, totalPages: 0 }}
          onPaginationChange={handlePaginationChange}
          onSearchChange={handleSearchChange}
          searchValue={searchValue}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

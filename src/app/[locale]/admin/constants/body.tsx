"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter, useSearchParams } from "next/navigation";
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

interface SortState {
  sortBy: string;
  sortOrder: "asc" | "desc";
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

const fetchConstants = async (
  page: number,
  pageSize: number,
  search: string,
  sortBy: string,
  sortOrder: "asc" | "desc"
): Promise<PaginatedResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    sortBy,
    sortOrder,
    ...(search && { search }),
  });

  const response = await fetch(`/api/constants?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch constants");
  }

  return response.json();
};

export default function ConstantBody () {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [pagination, setPagination] = useState<PaginationState>(() => {
    const page = parseInt(searchParams.get("page") || "0");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    return { page, pageSize };
  });

  const [searchValue, setSearchValue] = useState(() => {
    return searchParams.get("search") || "";
  });

  const [sort, setSort] = useState<SortState>(() => {
    const sortBy = searchParams.get("sortBy") || "created_at";
    const sortOrder = (searchParams.get("sortOrder") || "desc") as "asc" | "desc";

    return { sortBy, sortOrder };
  });

  const debouncedSearch = useDebounce(searchValue, 300);
  const isUpdatingUrlRef = useRef(false);

  // Sync state with URL params when they change (e.g., browser back/forward)
  useEffect(() => {
    // Skip if we're the ones updating the URL
    if (isUpdatingUrlRef.current) {
      return;
    }

    const urlPage = parseInt(searchParams.get("page") || "0");
    const urlPageSize = parseInt(searchParams.get("pageSize") || "10");
    const urlSearch = searchParams.get("search") || "";
    const urlSortBy = searchParams.get("sortBy") || "created_at";
    const urlSortOrder = (searchParams.get("sortOrder") || "desc") as "asc" | "desc";

    // Only update state if URL params differ from current state
    if (urlPage !== pagination.page || urlPageSize !== pagination.pageSize) {
      setPagination({ page: urlPage, pageSize: urlPageSize });
    }

    if (urlSearch !== searchValue) {
      setSearchValue(urlSearch);
    }

    if (urlSortBy !== sort.sortBy || urlSortOrder !== sort.sortOrder) {
      setSort({ sortBy: urlSortBy, sortOrder: urlSortOrder });
    }
  }, [searchParams]);

  // Update URL params when pagination, search, or sort changes
  useEffect(() => {
    // Skip if we're syncing from URL (browser navigation)
    if (isUpdatingUrlRef.current) {
      return;
    }

    const currentPage = searchParams.get("page");
    const currentPageSize = searchParams.get("pageSize");
    const currentSearch = searchParams.get("search") || "";
    const currentSortBy = searchParams.get("sortBy") || "created_at";
    const currentSortOrder = searchParams.get("sortOrder") || "desc";
    const params = new URLSearchParams(searchParams.toString());
    let hasChanges = false;

    // Update page param
    if (pagination.page === 0) {
      if (currentPage !== null) {
        params.delete("page");
        hasChanges = true;
      }
    } else {
      if (currentPage !== pagination.page.toString()) {
        params.set("page", pagination.page.toString());
        hasChanges = true;
      }
    }

    // Update pageSize param
    if (pagination.pageSize === 10) {
      if (currentPageSize !== null) {
        params.delete("pageSize");
        hasChanges = true;
      }
    } else {
      if (currentPageSize !== pagination.pageSize.toString()) {
        params.set("pageSize", pagination.pageSize.toString());
        hasChanges = true;
      }
    }

    // Update search param
    if (debouncedSearch) {
      if (currentSearch !== debouncedSearch) {
        params.set("search", debouncedSearch);
        hasChanges = true;
      }
    } else {
      if (currentSearch !== "") {
        params.delete("search");
        hasChanges = true;
      }
    }

    // Update sort params
    if (sort.sortBy === "created_at") {
      if (currentSortBy !== "created_at") {
        params.delete("sortBy");
        hasChanges = true;
      }
    } else {
      if (currentSortBy !== sort.sortBy) {
        params.set("sortBy", sort.sortBy);
        hasChanges = true;
      }
    }

    if (sort.sortOrder === "desc") {
      if (currentSortOrder !== "desc") {
        params.delete("sortOrder");
        hasChanges = true;
      }
    } else {
      if (currentSortOrder !== sort.sortOrder) {
        params.set("sortOrder", sort.sortOrder);
        hasChanges = true;
      }
    }

    if (hasChanges) {
      isUpdatingUrlRef.current = true;
      const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname;

      router.replace(newUrl, { scroll: false });

      // Reset the flag after URL update completes
      setTimeout(() => {
        isUpdatingUrlRef.current = false;
      }, 0);
    }
  }, [pagination.page, pagination.pageSize, debouncedSearch, sort.sortBy, sort.sortOrder, router]);

  const queryKey = useMemo(
    () => [QUERY_KEY.GET_ALL_CONSTANTS, pagination.page, pagination.pageSize, debouncedSearch, sort.sortBy, sort.sortOrder],
    [pagination.page, pagination.pageSize, debouncedSearch, sort.sortBy, sort.sortOrder]
  );

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => fetchConstants(pagination.page, pagination.pageSize, debouncedSearch, sort.sortBy, sort.sortOrder),
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

  const handleSortChange = useCallback((sortBy: string, sortOrder: "asc" | "desc") => {
    setSort({ sortBy, sortOrder });
    setPagination(prev => ({ ...prev, page: 0 })); // Reset to first page on sort change
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
          sort={sort}
          onSortChange={handleSortChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

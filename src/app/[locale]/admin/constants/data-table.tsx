"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination: PaginationInfo;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSearchChange: (search: string) => void;
  searchValue: string;
  isLoading?: boolean;
}

export function ConstantDataTable<TData, TValue> ({
  columns,
  data,
  pagination,
  onPaginationChange,
  onSearchChange,
  searchValue,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: pagination.totalPages,
  });

  return (
    <div className="rounded-md border">
      <div className="flex items-center justify-between py-4 px-4">
        <Input
          placeholder="Search Constant..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-64 h-10 px-3 rounded-md border"
        />
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>
            Showing {pagination.page * pagination.pageSize + 1} to{" "}
            {Math.min((pagination.page + 1) * pagination.pageSize, pagination.total)} of{" "}
            {pagination.total} entries
          </span>
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between py-4 px-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            Page {pagination.page + 1} of {pagination.totalPages}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPaginationChange(pagination.page - 1, pagination.pageSize)}
            disabled={pagination.page === 0 || isLoading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPaginationChange(pagination.page + 1, pagination.pageSize)}
            disabled={pagination.page >= pagination.totalPages - 1 || isLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

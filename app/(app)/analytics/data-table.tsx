"use client";

import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  TableHeader,
} from "@/components/ui/table";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  count: number;
  pageSize: number;
  page: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  count,
  pageSize,
  page,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    
  });

  const numberOfPages = Math.ceil(count / pageSize);
  
  return (
    <div className="rounded-md border">
      <div>
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Link
            className={cn(
              "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs text-center align-middle",
              +page == 0
                ? "pointer-events-none opacity-50 hover:pointer-events-none"
                : ""
            )}
            href={(+page != 0 && `/analytics?page=${+page - 1}`) || "#"}
          >
            Previous
          </Link>
          <Link
            className={cn(
              "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs text-center align-middle",
              !numberOfPages || +page == numberOfPages - 1
                ? "pointer-events-none opacity-50 hover:pointer-events-none"
                : ""
            )}
            href={
              (numberOfPages &&
                +page != numberOfPages - 1 &&
                `/analytics?page=${+page + 1}`) ||
              "#"
            }
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}

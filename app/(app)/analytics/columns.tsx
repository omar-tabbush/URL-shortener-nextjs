"use client";
import { Url } from "@/types/url";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteUrl } from "@/components/analytics/delete-url-button";
import React from "react";

export const columns: ColumnDef<Url>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "longUrl",
    header: "Long URL",
  },
  {
    accessorKey: "shortUrl",
    header: "Short URL",
  },
  {
    accessorKey: "clicksCount",
    header: "nb of clicks",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  },
  {
    id: "actions",
    cell: ({ row }) => <DeleteUrl row={row} />,
  },
];

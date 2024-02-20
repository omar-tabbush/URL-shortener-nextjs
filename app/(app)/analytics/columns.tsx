"use client";
import { Url } from "@/types/url";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal } from "@/components/analytics/confirm-delete-modal";
import React from "react";
import { useRouter } from "next/navigation";
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

    cell: ({ row, table }) => {
      const [open, setOpen] = React.useState(false);

      const router = useRouter();

      return (
        <>
          <ConfirmDeleteModal
            refreshData={router.refresh}
            open={open}
            setOpen={setOpen}
            urlId={row.original.id}
          />
          <Button
            onClick={() => {
              setOpen(true);
            }}
            variant="ghost"
            className="text-red-600 hover:text-red-800"
          >
            <span className="">Delete</span>
          </Button>
        </>
      );
    },
  },
];

"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getSession } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function ConfirmDeleteModal({
  setOpen,
  open,
  urlId,
  refreshData,
}: {
  setOpen: (open: boolean) => void;
  open: boolean;
  urlId: string;
  refreshData: () => void;
}) {
  const searchParam = useSearchParams();

  const handleConfirmDelete = async () => {
    const session = await getSession();
    try {
      if (urlId) {
        const res = await fetch(`${process.env.API_URL}/url/${urlId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.access_token}`,
          },
          body: JSON.stringify({ page: searchParam.get("page") }),
        });
        if (res.ok) {
          setOpen(false);
          refreshData();
        } else {
          const data = await res.json();
          toast.error(data.message);
        }
      }
    } catch (err) {
      console.warn(err);
      setOpen(false);
      toast.error("An error occurred");
    }
  };
  return (
    <Dialog open={open}>
      <DialogContent setOpen={setOpen} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            All data associated with this link will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between my-0.5 ">
          <Button
            onClick={handleConfirmDelete}
            type="button"
            variant="default"
            className="bg-red-700 hover:bg-red-800"
          >
            Confirm Delete
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteUrl({ row }: { row: any }) {
  const [open, setOpen] = useState(false);
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
}

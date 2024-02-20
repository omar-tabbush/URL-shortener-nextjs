import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getUrls } from "@/lib/getUrls";

interface Params {
  searchParams: {
    page: number;
  };
}

export default async function Page({ searchParams: { page } }: Params) {
  const urls = await getUrls(page);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={urls.urls}
        pageSize={urls.pageSize}
        count={urls.count}
        page={page}
      />
    </div>
  );
}

import { ApiError } from "@/types/apiError";
import { Url } from "@/types/url";
import { getSession } from "./utils";

export const getUrls = async (
  page: number | string
): Promise<{ urls: Url[]; count: number; pageSize: number }> => {
  const session = await getSession();
  const res = await fetch(`${process.env.API_URL}/url/all/${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${session?.user?.access_token ?? ""}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw data as ApiError;
  return data;
};

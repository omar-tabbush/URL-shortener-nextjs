import { ApiError } from "@/types/apiError";
import { Url } from "@/types/url";
import { getSession } from "./utils";

export const getUrls = async (): Promise<Url[]> => {
  const session = await getSession();
  const res = await fetch(`${process.env.API_URL}/url/all`, {
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

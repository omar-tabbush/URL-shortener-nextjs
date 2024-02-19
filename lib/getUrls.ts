import { ApiError } from "@/types/apiError";
import { Url } from "@/types/url";

export const getUrls = async (): Promise<Url[]> => {
  const res = await fetch(`${process.env.API_URL}/url/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) throw data as ApiError;
  return data;
};

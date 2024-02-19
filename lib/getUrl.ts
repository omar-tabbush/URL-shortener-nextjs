import {ApiError} from "@/types/apiError";
import { Url } from "@/types/url";

export const getUrl = async (shortenUrl: String): Promise<Url> => {
  const res = await fetch(`${process.env.API_URL}/url/short/${shortenUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) throw data as ApiError
  return data;
};

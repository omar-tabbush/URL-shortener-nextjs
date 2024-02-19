import { options } from "@/lib/next-auth-options";
import { type ClassValue, clsx } from "clsx";
import { getServerSession } from "next-auth";
import { getSession as getClientSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function authenticated() {
  const session = await getSession();

  if (!(session && session.user && !(new Date(session.expires) < new Date()))) {
    return false;
  }
  return true;
}

export async function getSession() {
  if (typeof window == "undefined") {
    return await getServerSession(options);
  } else {
    return await getClientSession();
  }
}

import { options } from "@/lib/next-auth-options";
import { type ClassValue, clsx } from "clsx";
import { Session, getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function authenticated() {
  let session = null;
  if (typeof window == "undefined") {
    session = await getServerSession(options);
  } else {
    session = await getSession();
  }
  if (!(session && session.user && !(new Date(session.expires) < new Date()))) {
    return false;
  }
  return true;
}

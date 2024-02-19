"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const NavLink = ({
  href,
  children,
  props,
}: {
  href: string;
  children: React.ReactNode;
  props?: any;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium hover:underline underline-offset-4",
        isActive && "underline"
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

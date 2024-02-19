"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export const AuthNavigationLink = ({className, redirectUrl}: {className: string, redirectUrl?: string}) => {
  const pathname = usePathname();

  const session = useSession();
  const validSession = session.status == 'authenticated';
  return (
    <Link
      href={!validSession ? `/${pathname == "/login" ? "register" : "login"}` : ''}
      className={className}
      onClick={(e)=>{
        if(validSession){
          e.preventDefault();
          e.stopPropagation();
          signOut({callbackUrl: redirectUrl});
        }
      }}
    >
      {!validSession ? pathname == "/login" ? "Register" : "Login" : 'Logout'}
    </Link>
  );
};

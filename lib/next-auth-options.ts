import type { Awaitable, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { User } from "@/types/User";

declare module "next-auth" {
  export interface Session {
    user: User;
    expires: string;
  }
}
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "login",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const request = await fetch(`${process.env.API_URL}/auth/login`, {
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        const response = await request.json();

        if (request.ok) {
          return response;
        }
        return false;
      },
    }),
    CredentialsProvider({
      id: "register",
      name: "Credentials",
      type: "credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        cpassword: { label: "Confirm Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials?.cpassword !== credentials?.password) return false;

        const request = await fetch(`${process.env.API_URL}/auth/register`, {
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
            name: credentials?.name,
          }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        const response = await request.json();

        if (request.ok) {
          return response;
        }
        return false;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/register",
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url) return url;
      return baseUrl + "/home";
    },
    async jwt({ token, account, profile, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = (user as any).access_token;
        token.id = profile?.sub;
      }
      return token;
    },
    async session({ session, token, user, newSession }) {
      // Send properties to the client, like an access_token and user id from a provider.

      newSession = session;
      newSession.user.id = token.sub;
      newSession.user.access_token = token.accessToken;

      return newSession;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
};

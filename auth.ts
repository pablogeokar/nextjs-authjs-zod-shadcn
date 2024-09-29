import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { signInSchema } from "./lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "seu@email.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "sua senha",
        },
      },
      async authorize(credentials) {
        let user = null;

        // validate credentials
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error("Invalid credentials", parsedCredentials.error.errors);
          return null;
        }

        // get user

        user = {
          id: "1",
          name: "Aditya Singh",
          email: "jojo@jojo.com",
        };

        if (!user) {
          console.log("Invalid credentials");
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      //const role = auth?.user.role || "user";
      if (pathname.startsWith("/auth/signin") && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      // if (pathname.startsWith("/page2") && role !== "admin") {
      //   return Response.redirect(new URL("/", nextUrl));
      // }
      return !!auth;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

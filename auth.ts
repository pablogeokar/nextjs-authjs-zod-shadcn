import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { signInSchema } from "./lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      profile(profile) {
        return { name: profile.name, role: "admin" };
      },
    }),
    Github({
      profile(profile) {
        return { name: profile.name, role: "admin" };
      },
    }),
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
          role: "admin",
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
      const role = (auth?.user.role as string) || "user";
      if (pathname.startsWith("/auth/signin") && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      if (pathname.startsWith("/page2") && role !== "admin") {
        return Response.redirect(new URL("/", nextUrl));
      }
      return !!auth;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

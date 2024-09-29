import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import async from "./app/page";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
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
});

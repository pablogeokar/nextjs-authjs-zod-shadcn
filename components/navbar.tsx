//"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
//import { useSession } from "next-auth/react";
import { handleSignOut } from "@/app/actions/authActions";

export default async function Navbar() {
  //export default function Navbar() {
  const session = await auth();
  // const { data: session } = useSession();
  console.log({ session });
  return (
    <nav className="flex justify-between items-center py-3 px-4 bg-white shadow-md">
      <Link href="/" className="text-xl font-bold">
        Auth.js
      </Link>
      {!session ? (
        <Link href="/auth/signin">
          <Button variant="default">Sign In</Button>
        </Link>
      ) : (
        <form action={handleSignOut}>
          <Button variant="default" type="submit">
            Sign Out
          </Button>
        </form>
      )}
    </nav>
  );
}

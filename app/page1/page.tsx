"use client";
import { useSession } from "next-auth/react";

export default function Page1() {
  const { data: session, update } = useSession();
  return (
    <>
      <button
        type="button"
        onClick={() => {
          session?.user &&
            update({ ...session.user, name: "asdasdasd singh", role: "user" });
        }}
      >
        Update session
      </button>
      <h1>Can be accessed by any user.</h1>
    </>
  );
}

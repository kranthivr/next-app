"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Loading from "./loading";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="flex bg-slate-200 p-5 space-x-5">
      <Link href="/" className="mr-5">
        Next.js
      </Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/users">Users</Link>
      {status === "loading" && <Loading />}
      {status === "authenticated" && (
        <div>
          {session.user!.name}
          <button
            className="mx-2"
            onClick={() => {
              signOut({
                callbackUrl: "/",
              });
            }}
          >
            Sign Out
          </button>
        </div>
      )}
      {status === "unauthenticated" && (
        <>
          <button
            className="mx-2"
            onClick={() => {
              signIn("Credentials", {
                callbackUrl: "/dashboard",
              });
            }}
          >
            Sign In
          </button>
          <Link href="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default NavBar;

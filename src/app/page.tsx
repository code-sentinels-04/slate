"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { DiGithubBadge } from "react-icons/di";

export default function HomePage() {
  const { data: session } = useSession();

  return (
      <main className="min-h-screen flex-col items-center justify-center bg-slate-100">
        <nav className="flex-col bg-white shadow-sm">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center space-x-2">
              <img src="/slate.svg" alt="Logo" className="h-10 w-10" />
              <p className="mx-4 text-4xl antialiased">slate</p>

              <a
                href="https://github.com/code-sentinels-04/slate"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 text-gray-600 hover:text-gray-900"
              >
                <DiGithubBadge className="h-10 w-10" />
              </a>
            </div>

            <div className="flex items-center">
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-blue-600/95 px-5 py-1.5 text-xl font-semibold text-white no-underline transition hover:bg-slate-900/20 hover:text-slate-900"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>
        </nav>

        <div className="container flex max-w-full flex-col justify-center gap-7 px-10 py-16">
          <h1 className="px-16 text-6xl tracking-tight text-slate-900">
            Sign Language to Audio and Text Exchange
          </h1>
          <p className="px-16 text-4xl text-gray-600">
            Breaking communication barrier
          </p>
          <div className="flex flex-col items-center gap-2 py-24">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-slate-900">
                {session ? (
                  <span>Logged in as {session.user?.name}</span>
                ) : (
                  <span>Sign in to start video call</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </main>
  );
}

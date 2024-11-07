import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { DiGithubBadge } from "react-icons/di";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="min-h-screen flex-col items-center justify-center bg-slate-100">
        <nav className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center space-x-2">
              <img src="/slate.svg" alt="Logo" className="h-10 w-10" />
              <p className="mx-4 text-4xl antialiased">slate</p>
            </div>

            <div className="flex items-center">
              <a
                href="https://github.com/code-sentinels-04/slate"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <DiGithubBadge className="h-10 w-10" />
              </a>
            </div>
          </div>
        </nav>

        <div className="container max-w-full flex flex-col justify-center gap-7 px-10 py-16">
          <h1 className="text-6xl text-gray-900 tracking-tight px-16 sm:text-[5rem]">
            Sign Language to Audio and Text Exchange
          </h1>
            <p className="text-2xl px-16 text-gray-600">Breaking communication barrier</p>
          <div className="flex flex-col items-center gap-2 py-16 ">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-black">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-slate-500/20 px-10 py-3 font-semibold text-xl no-underline transition hover:bg-blue-300"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

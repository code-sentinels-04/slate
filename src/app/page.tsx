import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { DiGithubBadge } from "react-icons/di";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <div className="min-h-screen bg-slate-100">
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

      <div className="mx-auto max-w-7xl px-2 py-16">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              Sign Language to Audio and Text for Everyone
            </h1>
            <p className="mb-6 text-xl text-gray-600">
              Breaking Communication Barriers
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

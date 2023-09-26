import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

const REFETCH_TIME_SEC = 15;

export default function Responses() {
  const { isLoading, data: responses } = api.responses.getAll.useQuery(
    undefined,
    {
      refetchInterval: REFETCH_TIME_SEC * 1000,
    },
  );

  return (
    <>
      <Head>
        <title>Prayer Walk 2023</title>
        <meta name="description" content="Prayer Walk 2023" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center p-4">
        <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <Link href="/">
            Prayer Walk <span className="text-[hsl(280,100%,70%)]">2023</span>
          </Link>
        </h1>
        {isLoading && (
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <span className="loading loading-spinner loading-lg text-primary"></span>{" "}
            Loading
          </div>
        )}
        {!isLoading && (
          <div className="container flex flex-col gap-12 px-4 py-16 ">
            {responses?.map((response, idx) => {
              const chatSide = idx % 2 === 0 ? "chat-start" : "chat-end";
              const avatarLetter = response.name.slice(0, 1).toUpperCase();
              return (
                <div
                  className={`chat ${chatSide}`}
                  key={response.createdAt.toISOString()}
                >
                  <div className="chat-image avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content w-10 rounded-full">
                      <span className="text-3xl">{avatarLetter}</span>
                    </div>
                  </div>
                  <div className="chat-header">
                    {response.name}
                    <time className="ml-1 text-xs opacity-50">
                      from {response.country}
                    </time>
                  </div>
                  <div className="chat-bubble whitespace-pre-wrap">
                    {response.message}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}

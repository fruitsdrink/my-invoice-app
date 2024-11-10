"use client";

import NextError from "next/error";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <main className="h-screen flex flex-row justify-center items-center">
      <NextError statusCode={500} title={error.message} />
      {/* <p>Error: {error.message}</p> */}
    </main>
  );
}

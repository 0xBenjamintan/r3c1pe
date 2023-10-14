import Profileleft from "@/components/Profileleft";
import React from "react";
import Head from "next/head";
import Profileright from "@/components/Profileright";

export default function profile() {
  return (
    <main className={``}>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="flex">
        <Profileleft />
        <Profileright />
      </div>
    </main>
  );
}

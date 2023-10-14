import Profileleft from '@/components/Profileleft'
import React from 'react'
import Head from "next/head";

export default function profile() {
  return (
    <main
      className={``}
    >
      <Head>
        <title>Profile</title>
      </Head>
      <Profileleft/>
    </main>
  )
}

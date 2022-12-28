import React from 'react'
import Head from 'next/head'

export const DrawerHead = () => {
  return (
    <Head>
      <style>
        {`html { overflow: hidden; }
@media (any-pointer: coarse) {
  ul a {
    padding:inherit;
  }
}`}
      </style>
    </Head>
  )
}

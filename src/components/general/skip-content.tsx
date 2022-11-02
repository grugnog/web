import React from 'react'

export const SkipContent = () => {
  return (
    <a
      className={`-top-10 left-[18%] px-4 py-2 rounded hidden md:block absolute focus:top-2.5 focus:bg-white focus:ring focus:z-10`}
      href={'#main-content'}
    >
      Skip navigation
    </a>
  )
}

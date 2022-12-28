import React from 'react'

export const LinearBottom = ({ loading }: { loading: boolean }) => {
  return (
    <div
      aria-hidden={!loading}
      className={`${
        loading ? 'block' : 'hidden'
      } fixed bottom-0 left-0 right-0 px-4 py-1.5 w-full bg-gray-100  border-t z-100 text-center flex flex-1 place-items-center place-content-center`}
    >
      Loading...
    </div>
  )
}

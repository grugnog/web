function CurlButtonContainer({ command = 'npm i @a11ywatch/a11ywatch' }) {
  return (
    <div className='flex flex-1 place-items-center relative py-5 px-4 text-lg bg-[#2A2A2A] text-white rounded border-2 border-blue-500 text-white antialiased'>
      <span className='text-blue-500 pr-4 select-none font-bold'>$</span>{' '}
      {command}
    </div>
  )
}

export { CurlButtonContainer }

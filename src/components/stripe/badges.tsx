import { GrCreditCard, GrPaypal, GrVisa } from 'react-icons/gr'

export const StripeBadges = () => {
  return (
    <div className='hidden lg:flex gap-1 max-w-xs'>
      <div className='border rounded px-1 py-1 flex-1 flex items-center justify-center bg-white'>
        <GrVisa className='grIcon text-black' />
      </div>

      <div className='border rounded px-1 py-1 flex-1 flex items-center justify-center bg-white'>
        <GrCreditCard className='grIcon text-black' />
      </div>
      <div className='border rounded px-1 py-1 flex-1 flex items-center justify-center bg-white'>
        <GrPaypal className='grIcon text-black' />
      </div>
    </div>
  )
}

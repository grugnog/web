import { GrCreditCard, GrPaypal, GrVisa } from 'react-icons/gr'

export const StripeBadges = () => {
  return (
    <div className='hidden lg:flex gap-1 max-w-xs'>
      <div className='border rounded px-1 py-1 flex-1 flex items-center justify-center'>
        <GrVisa className='grIcon' />
      </div>

      <div className='border rounded px-1 py-1 flex-1 flex items-center justify-center'>
        <GrCreditCard className='grIcon' />
      </div>

      <div className='border rounded px-1 py-1 flex-1 flex items-center justify-center'>
        <GrPaypal className='grIcon' />
      </div>
    </div>
  )
}

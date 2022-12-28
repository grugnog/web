import { FC } from 'react'

export const Partners: FC = () => {
  return (
    <div className='p-5 my-5 space-y-3 rounded border'>
      <h4 className='text-xl font-bold'>Partner With Us</h4>
      <div className='text-lg'>
        Apply to become partners as an approved agency, technology services, or
        professional services.
      </div>
      <div className='py-4'>
        <a
          className='py-3 px-5 rounded border-2 hover:bg-black hover:text-white'
          href={
            'mailto:support@a11ywatch.com' +
            '?subject=' +
            'Partner' +
            '&body=' +
            'I would like to find out more about your partnership.'
          }
        >
          Contact Us
        </a>
      </div>
    </div>
  )
}

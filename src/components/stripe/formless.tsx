import React from 'react'
import { Button } from '@app/components/general/buttons/button'

interface Props {
  onToken(token: any): any
  plan?: string
  price: number
  disabled: boolean
}

export const CheckoutFormless = ({ onToken, plan, price, disabled }: Props) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await onToken('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={'h-42 space-y-3 border-t border-[#2A2A2A] pt-5 pb-3 w-full'}
    >
      <div className='text-xl font-semibold'>
        Total{' '}
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(price / 100)}
      </div>
      <div className='space-y-4'>
        <Button
          type='submit'
          disabled={disabled}
          className={`font-bold border text-base px-8 rounded-sm md:px-12 md:rounded-sm md:min-w-[280px] ${
            disabled ? 'text-black' : 'border-blue-800 text-blue-800'
          }`}
        >
          Start {plan}
        </Button>
      </div>
    </form>
  )
}

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
      className={
        'h-42 space-y-3 border-t border-[#2A2A2A] px-4 pt-2 pb-3 w-full'
      }
    >
      <div className='text-3xl font-bold'>
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
          style={{
            minWidth: 160,
          }}
          className={`font-semibold border border-gray-800 text-base ${
            disabled ? 'text-gray-800 bg-gray-200' : 'text-black'
          }`}
        >
          Start {plan}
        </Button>
      </div>
    </form>
  )
}

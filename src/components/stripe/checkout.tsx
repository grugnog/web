import React from 'react'
import { theme } from '@app/theme'
import { Button } from '@material-ui/core'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

interface Props {
  onToken(token: any): any
  basic: boolean
  price: number
  disabled: boolean
}

const style = {
  base: {
    iconColor: '#0E1116',
    fontWeight: '500',
    fontFamily: theme.typography.fontFamily,
    fontSize: '20px',
    fontSmoothing: 'antialiased',
  },
}

export const CheckoutForm = ({ onToken, basic, price, disabled }: Props) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardElement)

    if (cardElement) {
      const { error, token } = await stripe.createToken(cardElement)

      if (!error) {
        await onToken(token)
      } else {
        console.error(error)
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={
        'h-42 space-y-3 border border-[#2A2A2A] px-4 pt-2 pb-3 rounded w-full'
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
        <CardElement
          options={{
            disabled,
            style,
            classes: { focus: 'border-blue-400 shadow-md shadow-blue-600' },
          }}
          className={'p-4 bg-white border'}
        />
        <Button
          variant='contained'
          color='secondary'
          type='submit'
          disabled={disabled}
          style={{
            minWidth: 160,
          }}
        >
          Start {basic ? 'Basic' : 'Premium'}
        </Button>
      </div>
    </form>
  )
}

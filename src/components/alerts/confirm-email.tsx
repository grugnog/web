import React from 'react'
import { GrMail } from 'react-icons/gr'

const classes = {
  sticky: 'fixed flex justify-center bottom-11 left-0 right-0 z-[1001]',
  container: 'border p-3',
  text: 'font-bold text-xl',
  btn: 'flex rounded place-items-center px-2 py-1 border',
}

interface Props {
  sendEmail(): any
  visible?: boolean
}

function ConfirmEmail({ sendEmail, visible }: Props) {
  return !!visible ? (
    <div className={classes.sticky}>
      <div
        className={[
          classes.container,
          'border items-center flex flex-row rounded bg-gray-100',
        ]
          .join(' ')
          .trim()}
      >
        <p className={[classes.text, 'text-xl mr-5'].join(' ').trim()}>
          Please confirm your email to enable alerts
        </p>
        <button
          onClick={sendEmail}
          title={'Resend email confirmation'}
          className={classes.btn}
        >
          <GrMail />
          <p className={[classes.text, 'ml-2'].join(' ').trim()}>Resend</p>
        </button>
      </div>
    </div>
  ) : null
}

export { ConfirmEmail }

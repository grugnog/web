import { PropsWithChildren } from 'react'

type MailProps = PropsWithChildren<{
  email: string
  subject: string
  body: string
  children?: string | Node
  className?: any
}>

function Mailto({ email, subject, body, className, children }: MailProps) {
  return (
    <address>
      <a
        className={`underline ${className}`}
        href={`mailto:${email}?subject=${
          encodeURIComponent(subject) || ''
        }&body=${encodeURIComponent(body) || ''}`}
      >
        {children}
      </a>
    </address>
  )
}

export { Mailto }

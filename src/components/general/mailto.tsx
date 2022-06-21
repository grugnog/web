import React from 'react'

interface Props {
  email: string
  subject: string
  body: string
  children?: string | Node
  className?: any
}

function Mailto({ email, subject, body, className, children }: Props) {
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

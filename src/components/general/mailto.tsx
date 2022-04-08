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
    <a
      className={`underline ${className}`}
      href={`mailto:${email}?subject=${encodeURI(subject) || ''}&body=${
        encodeURI(body) || ''
      }`}
    >
      {children}
    </a>
  )
}

export { Mailto }

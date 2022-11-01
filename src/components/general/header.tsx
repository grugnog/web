import { FC, PropsWithChildren } from 'react'

// h1
export const Header: FC<PropsWithChildren> = ({ children }) => {
  return (
    <h1
      className={`font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl max-w-[90vw] py-3 sm:leading-[1.1em]`}
    >
      {children}
    </h1>
  )
}

export const Header2: FC<PropsWithChildren> = ({ children }) => {
  return (
    <h2
      className={`font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl py-3 sm:leading-[1.1em]`}
    >
      {children}
    </h2>
  )
}

export const Header3: FC<PropsWithChildren> = ({ children }) => {
  return (
    <h3
      className={`font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl py-3 sm:leading-[1.1em]`}
    >
      {children}
    </h3>
  )
}

export const Header4: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <h4
      className={[
        `font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl py-2 sm:leading-[1.1em]`,
        className,
      ].join(' ')}
    >
      {children}
    </h4>
  )
}

export const Header5: FC<PropsWithChildren> = ({ children }) => {
  return (
    <h5
      className={`font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl py-2 sm:leading-[1.1em]`}
    >
      {children}
    </h5>
  )
}

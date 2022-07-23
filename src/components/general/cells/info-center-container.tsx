import { FC, PropsWithChildren } from 'react'

export const InfoCenterContainer: FC<PropsWithChildren> = ({ children }) => (
  <div className={'flex flex-col w-full place-items-center py-2 my-2'}>
    {children}
  </div>
)

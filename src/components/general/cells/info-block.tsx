import React, { FC, PropsWithChildren } from 'react'

const styles = {
  infoContainer:
    'px-3 py-2 flex flex-col flex-1 text-base justify-start rounded bg-white overflow-hidden',
  infoBorder: '',
  p: 'text-lg',
  spacing: 'pt-2',
  row: 'flex place-items-center space-x-2',
}

type BaseProps = PropsWithChildren<{
  title: string
  titleButton?: React.ReactElement
  icon?: any
}>

export const InfoBlock: FC<BaseProps> = ({
  children,
  title,
  titleButton,
  icon = null,
}) => {
  return (
    <div
      className={`${styles.infoContainer}${
        icon ? ` ${styles.infoBorder}` : ''
      } border`}
    >
      <div className={styles.row}>
        {icon}
        <p className={[styles.p, 'text-gray-800'].join(' ').trim()}>{title}</p>
        {titleButton}
      </div>
      <div className={styles.spacing} />
      <div className='text-gray-700'>{children}</div>
    </div>
  )
}

import React, { FC, PropsWithChildren } from 'react'

const styles = {
  infoContainer: 'px-4 py-2.5 flex flex-col flex-1 text-base justify-start',
  infoBorder: '',
  p: 'text-base',
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
      }`}
    >
      <div className={styles.row}>
        {icon}
        <p className={styles.p}>{title}</p>
        {titleButton}
      </div>
      <div className={styles.spacing} />
      <div className='text-sm'>{children}</div>
    </div>
  )
}

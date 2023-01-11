import { classNames } from '@app/utils/classes'
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
  className?: string
}>

export const InfoBlock: FC<BaseProps> = ({
  children,
  title,
  titleButton,
  icon = null,
  className,
}) => {
  return (
    <div
      className={classNames(
        `${styles.infoContainer}${icon ? ` ${styles.infoBorder}` : ''}`,
        className
      )}
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

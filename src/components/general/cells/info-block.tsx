import React, { FC } from 'react'

const styles = {
  infoContainer: 'px-2 py-2 flex flex-col flex-1 text-base',
  infoBorder: 'border',
  p: 'text-lg',
  spacing: 'pt-2',
  row: 'flex flex-1',
}

export const InfoBlock: FC<{
  title: string
  titleButton?: React.ReactElement
  icon?: any
}> = ({ children, title, titleButton, icon = null }) => {
  return (
    <div
      className={`${styles.infoContainer}${
        icon
          ? ` ${styles.infoBorder} min-w-[120px] md:min-w-[170px] lg:min-w-[200px] rounded`
          : ''
      }`}
    >
      {icon}
      <div className={styles.row}>
        <p className={[styles.p, 'p-black font-bold'].join(' ').trim()}>
          {title}
        </p>
        {titleButton}
      </div>
      <div className={styles.spacing} />
      <div>{children}</div>
    </div>
  )
}

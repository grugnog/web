/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { FC } from 'react'

const styles = {
  infoContainer: 'px-2 py-2 flex flex-col flex-1 text-base',
  p: 'text-lg',
  spacing: 'pt-2',
  row: 'flex flex-1',
}

export const InfoBlock: FC<{
  title: string
  titleButton?: React.ReactElement
}> = ({ children, title, titleButton }) => {
  return (
    <div className={styles.infoContainer}>
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

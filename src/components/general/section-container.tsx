/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { FC } from 'react'

const SectionContainer: FC<{ className?: string; id?: string }> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section
      className={['overflow-visible', 'py-32', 'px-6', className]
        .join(' ')
        .trim()}
      {...props}
    >
      {children}
    </section>
  )
}

export { SectionContainer }

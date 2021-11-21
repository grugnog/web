/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { memo, FC } from 'react'
import { WithEditor, WithHighlight } from '../adhoc'

type Props = {
  [props: string]: any
  shouldEdit?: boolean
  children?: string
  language?: string
  lineProps?: any
  style?: any
  className?: any
  editMode?: boolean
  setScript?(e?: any): any
}

const EditableMixtureComponent: FC<Props> = ({ editMode, ...props }) =>
  editMode ? <WithEditor {...props} /> : <WithHighlight {...props} />

export const EditableMixture = memo(EditableMixtureComponent)

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

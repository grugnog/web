import React from 'react'
import { Grow } from '@material-ui/core'

function Transition(props: unknown, ref: any) {
  return <Grow ref={ref} style={{ overflowY: 'hidden' }} {...props} />
}

export const GrowTransition = React.forwardRef(Transition)

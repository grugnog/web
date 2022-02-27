import React from 'react'
import { LinearProgress } from '@material-ui/core'

export const LinearBottom = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <LinearProgress
      color='secondary'
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    />
  ) : null
}

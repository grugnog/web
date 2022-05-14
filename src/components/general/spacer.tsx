import React from 'react'

const Spacer = ({ height = 20 }: { height?: number | string }) => {
  return <div style={{ paddingTop: height, display: 'block' }} />
}

export { Spacer }

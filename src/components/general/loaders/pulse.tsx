import React from 'react'

// motion safe pulse display
function Pulse({ visible, innerElement, backgroundColor, size }: any) {
  if (!visible) {
    return null
  }

  return (
    <div
      className={`motion-safe:animate-pulse rounded-xl`}
      style={{ width: size, height: size, backgroundColor }}
    >
      {innerElement}
    </div>
  )
}

Pulse.defaultProps = {
  backgroundColor: '#0E1116',
  size: 40,
  styles: {},
  visible: false,
  innerElement: '',
}

export { Pulse }

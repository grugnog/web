import React from 'react'

export function ResetCss() {
  return (
    <style>
      {String(`body {
      background: transparent;
    }
  `)}
    </style>
  )
}

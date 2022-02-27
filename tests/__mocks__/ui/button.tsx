import React from 'react'

const mockReact = React

const Button = ({ children, ...rest }) =>
  mockReact.createElement('button', rest, children)

export { Button }

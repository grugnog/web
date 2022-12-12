import { DetailedHTMLProps, LabelHTMLAttributes } from 'react'

interface LabelProps
  extends DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {}

export const FormControl = (props: LabelProps) => {
  return (
    <label
      className='px-4 sr-only'
      data-shrink='false'
      htmlFor={props.htmlFor}
      id='email-label'
    >
      {props.children}
    </label>
  )
}

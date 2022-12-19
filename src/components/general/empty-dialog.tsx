import React from 'react'
import { GrChapterAdd } from 'react-icons/gr'
import { Button } from './buttons'

export const EmptyDialogButton = ({
  buttonTitle,
  icon,
  buttonStyles,
}: {
  icon?: boolean
  buttonTitle?: string
  buttonStyles?: string
}) => {
  return (
    <Button className={`bg-gray-200 ${buttonStyles}`} disabled>
      {buttonTitle}
      {icon ? <GrChapterAdd className='grIcon' /> : null}
    </Button>
  )
}

import { SyntheticEvent } from 'react'
import { Button } from '@a11ywatch/ui'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    top: '-3rem',
    left: '18%',
    '&:focus': {
      top: 12,
      zIndex: 99999,
      position: 'fixed',
      backgroundColor: '#fff',
    },
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}))

export const SkipContent = () => {
  const classes = useStyles()

  const onClickEvent = (e?: SyntheticEvent<HTMLButtonElement>) => {
    e?.preventDefault()

    const mainElement: HTMLElement | null = document?.querySelector(
      '#main-content'
    )

    if (mainElement) {
      mainElement?.focus()
    } else {
      const inputElement:
        | HTMLInputElement
        | HTMLButtonElement
        | HTMLTextAreaElement
        | null
        | undefined = document
        ?.querySelector('main')
        ?.querySelector('a, button, input, select, textarea')

      if (inputElement) {
        inputElement?.focus()
      }
    }
  }

  return (
    <Button
      ariaLabel='Skip navigation'
      className={`${classes.root} hidden md:block absolute`}
      onClick={onClickEvent}
    >
      Skip navigation
    </Button>
  )
}

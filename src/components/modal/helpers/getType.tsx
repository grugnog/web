import React from 'react'
import { EnableNotifications } from '@app/components/alerts'
import { WithHighlight } from '@app/components/adhoc'
import { makeStyles } from '@material-ui/core/styles'
import { Onboarding } from '@app/components/alerts/onboarding'
import { ModalType } from '@app/data/enums'

const useStyles = makeStyles(() => ({
  container: {
    width: '75vw',
    height: '75vh',
    display: 'block',
  },
  code: {
    width: '100%',
    height: '100%',
    fontSize: 12,
    '&::-webkit-scrollbar': {
      background: '#424242',
      height: 7,
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#1b1b1b',
      borderRadius: 0,
      border: 0,
    },
  },
}))

export const GetType = ({ modalType, html }: any) => {
  const classes = useStyles()

  switch (modalType) {
    case ModalType.empty:
      return null
    case ModalType.alerts:
      return <EnableNotifications />
    case ModalType.highlight: {
      return (
        <div className={classes.container}>
          <WithHighlight className={classes.code}>{html}</WithHighlight>
        </div>
      )
    }
    case ModalType.onboarding:
      return <Onboarding />

    default:
      return null
  }
}

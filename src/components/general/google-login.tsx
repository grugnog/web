import React from 'react'
import { GOOGLE_CLIENT_ID } from '@app/configs'
import { GoogleIcon } from '@app/components/badges'
import { Button } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'

interface GoogleLoginButton {
  isVisible?: boolean
  onSuccess: (a: any) => Promise<void>
  loginView?: boolean
  classes?: any
}

// returns google login component if id enabled or mock
export const GoogleLoginButton = (props: GoogleLoginButton) => {
  const { isVisible, onSuccess, loginView, classes } = props ?? {}

  if (GOOGLE_CLIENT_ID && isVisible) {
    return (
      <GoogleLogin
        clientId={String(GOOGLE_CLIENT_ID)}
        buttonText={loginView ? 'Login' : 'Sign up with google'}
        onSuccess={onSuccess}
        onFailure={(err: any) => {
          console.error(err)
        }}
        cookiePolicy={'single_host_origin'}
        render={(renderProps: any) => (
          <Button
            onClick={renderProps.onClick}
            className={classes.google}
            disabled={renderProps.disabled}
            variant='text'
            size='small'
            startIcon={<GoogleIcon className={classes.iconColor} src={''} />}
          >
            {loginView ? 'Login' : 'Sign up with google'}
          </Button>
        )}
      />
    )
  }
  return (
    <Button
      className={classes.google}
      disabled={true}
      variant='text'
      size='small'
      startIcon={<GoogleIcon className={classes.iconColor} src={''} />}
    >
      {loginView ? 'Login' : 'Sign up with google'}
    </Button>
  )
}

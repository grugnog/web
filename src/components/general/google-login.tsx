import React from 'react'
import { GOOGLE_CLIENT_ID } from '@app/configs'
import { GoogleIcon } from '@app/components/badges'
import { Button } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'

interface GoogleLoginButton {
  onSuccess?: (a: any) => Promise<void>
  loginView?: boolean
  classes?: any
  skeleton?: boolean // skeleton ui
}

// returns google login component if id enabled or mock
export const GoogleLoginButton = (props: GoogleLoginButton) => {
  const { onSuccess, skeleton, loginView, classes } = props ?? {}

  if (GOOGLE_CLIENT_ID && !skeleton) {
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
            className={`${classes.google} text-xm`}
            disabled={renderProps.disabled}
            variant='text'
            size='small'
            style={{
              textTransform: 'none',
              paddingLeft: '0.725rem',
              fontSize: '0.875rem',
              borderWidth: 2,
              borderColor: '#e5e5e5',
              display: 'flex',
              placeContent: 'center',
            }}
            startIcon={<GoogleIcon className={classes.iconColor} src={''} />}
          >
            {loginView ? 'Login with Google' : 'Sign up with Google'}
          </Button>
        )}
      />
    )
  }

  return (
    <Button
      className={classes?.google}
      disabled={true}
      variant='text'
      size='small'
      startIcon={<GoogleIcon className={classes?.iconColor} src={''} />}
    >
      {loginView ? 'Login' : 'Sign up with google'}
    </Button>
  )
}

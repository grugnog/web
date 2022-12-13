import React from 'react'
import { GOOGLE_CLIENT_ID } from '@app/configs'
import { GoogleIcon } from '@app/components/badges'
import { GoogleLogin } from 'react-google-login'
import { Button } from './buttons'

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
            className={`min-w-[200px] md:min-w-[200px] border-2 min-h-[40px] flex rounded-sm md:rounded-sm gap-x-2 place-items-center place-content-center font-semibold md:font-semibold`}
            disabled={renderProps.disabled}
          >
            <GoogleIcon className={classes.iconColor} src={''} /> {loginView ? 'Login with Google' : 'Sign up with Google'}
          </Button>
        )}
      />
    )
  }

  return (
    <Button
    disabled={true}
    className={`min-w-[200px] md:min-w-[200px] border-2 min-h-[40px] flex rounded-sm md:rounded-sm gap-x-2 place-items-center place-content-center font-semibold md:font-semibold`}
  >
    <GoogleIcon className={classes.iconColor} src={''} /> {loginView ? 'Login with Google' : 'Sign up with Google'}
  </Button>


  )
}

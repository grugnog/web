import React, { useRef, useEffect, SyntheticEvent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, FormControl, LinearProgress } from '@material-ui/core'
import { AppManager, UserManager } from '@app/managers'
import { userData } from '@app/data'
import { MarketingDrawer, PageTitle } from '@app/components/general'
import { useRouter } from 'next/router'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { MarketingShortTitle } from '@app/components/marketing'

const useStyles = makeStyles(() => ({
  absolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
}))

function ResetPassword({ name }: PageProps) {
  const router = useRouter()
  const classes = useStyles()
  const {
    loading,
    forgotPassword,
    forgotPasswordData,
    resetPassword,
    resetPasswordData,
  } = userData(true)

  const emailRef = useRef(null)
  const resetRef = useRef(null)
  const savedEmail = useRef(null)

  const resetSent = forgotPasswordData?.forgotPassword?.email == 'true'

  const title = resetSent ? 'Enter Reset Code' : 'Reset Password'

  useEffect(() => {
    if (resetPasswordData?.resetPassword?.jwt) {
      UserManager.setUser(resetPasswordData.resetPassword)
      ;(async () => {
        await router.push('/')
      })()
    }
  }, [router, resetPasswordData])

  useEffect(() => {
    if (resetSent) {
      AppManager.toggleSnack(
        true,
        'Please check your email and enter the reset code.',
        'message'
      )
    }
  }, [resetSent])

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      // @ts-ignore
      if (resetSent && resetRef?.current?.value) {
        await resetPassword({
          variables: {
            email: savedEmail.current,
            // @ts-ignore
            resetCode: resetRef.current.value,
          },
        })
        // @ts-ignore
      } else if (emailRef?.current?.value) {
        await forgotPassword({
          variables: {
            // @ts-ignore
            email: emailRef.current.value,
          },
        })
        // @ts-ignore
        savedEmail.current = emailRef.current.value
      }
    } catch (e) {
      console.error(e)
    }
    if (emailRef?.current) {
      // @ts-ignore
      emailRef.current.value = ''
    }
  }

  return (
    <MarketingDrawer
      title={name}
      footerSpacing
      maxWidth='sm'
      emptyFooter
      emptyNav
    >
      <MarketingShortTitle />
      <PageTitle component={resetSent ? 'h3' : 'h1'}>{title}</PageTitle>
      <form autoComplete={resetSent ? 'on' : 'off'} onSubmit={submit}>
        <div className='space-y-6'>
          <FormControl>
            {resetSent ? (
              <TextField
                id='resetCode'
                aria-describedby='my-reset-text'
                label='Reset Code'
                type='text'
                autoFocus
                margin='normal'
                variant='outlined'
                required
                inputRef={resetRef}
              />
            ) : (
              <TextField
                id='email'
                aria-describedby='my-email-text'
                label='Email'
                type='email'
                autoFocus
                autoComplete='email'
                margin='normal'
                variant='outlined'
                required
                inputRef={emailRef}
              />
            )}
          </FormControl>
        </div>
        <button className={'border rounded py-3 px-6 text-xl'} type='submit'>
          {resetSent ? 'Submit' : 'Send Email'}
        </button>
      </form>
      {loading ? (
        <LinearProgress className={classes.absolute} color='secondary' />
      ) : null}
    </MarketingDrawer>
  )
}

export default metaSetter(
  { ResetPassword },
  {
    description:
      'Reset your password to get back in action with your accessibility toolkit.',
    gql: true,
  }
)

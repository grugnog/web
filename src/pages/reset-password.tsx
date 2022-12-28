import { useRef, useEffect, SyntheticEvent, useState } from 'react'
import { AppManager, UserManager } from '@app/managers'
import { useUserData } from '@app/data'
import { Button, LinearBottom, MarketingDrawer } from '@app/components/general'
import { useRouter } from 'next/router'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { MarketingShortTitle } from '@app/components/marketing'
import { Header, Header2, Header3 } from '@app/components/general/header'
import { FormControl } from '@app/components/general/form-control'
import { TextField } from '@app/components/general/text-field'
import { companyName } from '@app/configs'

function ResetPassword({ name }: PageProps) {
  const router = useRouter()
  const {
    loading,
    forgotPassword,
    forgotPasswordData,
    resetPassword,
    resetPasswordData,
  } = useUserData(true)

  const emailRef = useRef<HTMLInputElement>(null)
  const resetRef = useRef<HTMLInputElement>(null)

  const [emailState, setEmailState] = useState<string>('')
  const [resetState, setResetState] = useState<string>('')

  const resetSent = forgotPasswordData?.forgotPassword?.email == 'true'
  const title = resetSent ? 'Enter Reset Code' : 'Reset Password'

  useEffect(() => {
    if (resetPasswordData?.resetPassword?.jwt) {
      UserManager.setUser(resetPasswordData.resetPassword)
      ;(async () => {
        await router.push('/dashboard')
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

  const onEmailChange = (
    e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e?.preventDefault()
    setEmailState(e?.currentTarget?.value)
  }

  const onResetEvent = (
    e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e?.preventDefault()
    setResetState(e?.currentTarget?.value)
  }

  const submit = async (e: SyntheticEvent) => {
    e?.preventDefault()
    try {
      if (resetSent && resetRef?.current?.value) {
        await resetPassword({
          variables: {
            email: emailState,
            resetCode: resetState,
          },
        })
      } else if (emailRef?.current?.value) {
        await forgotPassword({
          variables: {
            email: emailState,
          },
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  const FormInputRender = () => {
    if (resetSent) {
      return (
        <>
          <FormControl htmlFor='resetCode'>
            Enter password Reset Code
          </FormControl>

          <TextField
            id='resetCode'
            aria-describedby='my-reset-text'
            placeholder='Reset Code'
            type='text'
            autoFocus
            value={resetState}
            required
            ref={resetRef}
            onChange={onResetEvent}
          />
        </>
      )
    }

    return (
      <>
        <FormControl htmlFor='email'>Enter Email</FormControl>
        <TextField
          id='email'
          aria-describedby='my-email-text'
          placeholder='Email'
          type='email'
          autoFocus
          onChange={onEmailChange}
          autoComplete='email'
          required
          value={emailState}
          ref={emailRef}
        />
      </>
    )
  }
  const FormRender = () => {
    return (
      <form
        autoComplete={resetSent ? 'on' : 'off'}
        onSubmit={submit}
        className='flex flex-col space-y-6'
      >
        <FormInputRender />
        <Button
          className={`border-2 rounded-full py-2 px-3 text-base ${
            !resetSent && emailState.length < 5
              ? 'border-gray-700 '
              : 'border-blue-700 text-blue-700'
          }`}
          type='submit'
        >
          {resetSent ? 'Submit' : 'Send Email'}
        </Button>
      </form>
    )
  }

  return (
    <MarketingDrawer title={name} footerSpacing>
      <MarketingShortTitle />
      <div className='container mx-auto text-center'>
        <div className='py-2 flex flex-col place-items-center space-y-8'>
          <Header>{title}</Header>
          <FormRender />
          <div className='py-8'>
            <div className='py-4 border px-8 rounded text-left'>
              <Header2>Backup your password</Header2>
              <p>
                After resetting your password, make sure to back it up using a
                secure password manager.
              </p>
              <div className='py-2'>
                <Header3>Issue with reset?</Header3>
                <p>
                  If you are having issues reseting your password please contact
                  the support team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LinearBottom loading={loading} />
    </MarketingDrawer>
  )
}

export default metaSetter(
  { ResetPassword },
  {
    description: `Reset your password to get back in action with the ${companyName} accessibility toolkit.`,
    gql: true,
  }
)

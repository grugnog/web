import {
  FunctionComponent,
  Fragment,
  memo,
  useState,
  SyntheticEvent,
} from 'react'
import { GoogleLoginButton } from '../google-login'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import { REGISTER, LOGIN } from '@app/mutations'
import { AppManager, UserManager } from '@app/managers'
import { Link } from '../link'
import { LinearBottom } from '../loaders'
import { DOMAIN_NAME } from '@app/configs'
import { GrGithub } from 'react-icons/gr'
import { REST_API } from '@app/configs/app-config'
import { Header } from '../header'
import { Button } from '../buttons'
import { FormControl } from '../form-control'
import { TextField } from '../text-field'

const clientID = process.env.GITHUB_CLIENT_ID

const redirectGithub = `${REST_API}/github/callback`

interface SignOnProps {
  loginView?: boolean
  googleLoginSkeleton?: boolean
}

const SignOnFormWrapper: FunctionComponent<SignOnProps> = ({
  loginView,
  googleLoginSkeleton = false,
}) => {
  const router = useRouter()

  const [signOnMutation, { loading }] = useMutation(
    loginView ? LOGIN : REGISTER
  )

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onSuccessAuth = (data: any) => {
    const user = data && data[loginView ? 'login' : 'register']
    if (user) {
      UserManager.setUser(user)

      const p = router?.query?.plan

      const plan = p && (String(p).toLocaleLowerCase() as string)
      const urlRoute =
        plan && plan !== 'free'
          ? `/payments?plan=${router?.query?.plan}`
          : '/dashboard'

      window.location.href = urlRoute
    }
  }

  const submit = async (e: any) => {
    e?.preventDefault()

    let data = null

    if (!password || !email) {
      AppManager.toggleSnack(
        true,
        !password
          ? 'Please enter a password of at least 6 characters.'
          : 'Please check your email and password and try again.',
        'error'
      )
    } else {
      try {
        const res = await signOnMutation({
          variables: {
            email,
            password,
          },
        })

        if (res) {
          data = res.data
        }
      } catch (e) {
        console.error(e)
      }

      onSuccessAuth(data)
    }
  }

  const onGoogleAuth = async (response: any) => {
    let data
    try {
      const res = await signOnMutation({
        variables: {
          email: response?.profileObj?.email,
          googleId: response?.googleId,
          password: '',
        },
      })
      if (res) {
        data = res.data
      }
    } catch (e) {
      console.error(e)
    }

    onSuccessAuth(data)
  }

  const onChangeEmailEvent = (
    e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setEmail(e.currentTarget.value)

  const onChangePasswordEvent = (
    e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setPassword(e.currentTarget.value)

  const Heading = Header

  return (
    <Fragment>
      <div className='container mx-auto place-content-center'>
        <Heading className='text-center max-w-[100vw]'>
          {(loginView && 'Login') || 'Register'}
        </Heading>
        <div className={'text-center p-3'}>
          <div className={'space-y-2 flex flex-col place-items-center'}>
            {clientID ? (
              <a
                className='inline-flex'
                href={`https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectGithub}${
                  router?.query?.plan ? `?plan=${router.query.plan}` : ''
                }`}
                target='_parent'
                rel='noreferrer'
              >
                <div className='inline-flex gap-x-2 border-2 rounded place-items-center place-content-center font-semibold w-[200px] text-sm min-h-[40px]'>
                  <span className='block'>
                    <GrGithub
                      className='grIcon w-[18px] h-[18px]'
                      height={40}
                      width={40}
                    />
                  </span>
                  {loginView ? 'Login' : 'Sign up'} with Github
                </div>
              </a>
            ) : null}
            <GoogleLoginButton
              loginView={loginView}
              onSuccess={onGoogleAuth}
              skeleton={googleLoginSkeleton}
              round
            />
          </div>
          <p className={'py-2 text-sm'}>Or</p>
          <form autoComplete={loginView ? 'on' : 'off'} onSubmit={submit}>
            <div>
              <FormControl htmlFor='email'>Email</FormControl>
              <TextField
                id='email'
                aria-describedby='my-email-text'
                placeholder='Email'
                type='email'
                aria-invalid={email.length < 4}
                onChange={onChangeEmailEvent}
                value={email}
                autoFocus
                autoComplete='email'
                className={'min-w-[200px]'}
                required
              />
              <p
                id='my-email-text'
                className={'text-center text-xs text-gray-600 py-2'}
              >
                {`We'll never share your email.`}
              </p>
            </div>
            <div>
              <FormControl htmlFor='password'>Password</FormControl>
              <TextField
                id='password'
                aria-describedby='my-password-text'
                className={'min-w-[200px]'}
                placeholder='Password'
                minLength={6}
                aria-invalid={password.length < 4}
                onChange={onChangePasswordEvent}
                value={password}
                type='password'
                autoComplete='current-password'
                required
              />
              <p
                id='my-password-text'
                className={'text-center text-xs text-gray-600 py-2'}
              >
                {`We'll never share your password.`}
              </p>
            </div>
            <div className='py-3'>
              <Button
                className={
                  'w-[200px] md:min-w-[200px] md:border-2 md:rounded-sm md:font-medium'
                }
                type='submit'
              >
                {loginView ? 'Login' : 'Sign up with email'}
              </Button>
            </div>
          </form>

          <p className='text-xs'>
            Forgot Password?{' '}
            <Link href='/reset-password' className='text-xs'>
              Reset
            </Link>
          </p>
        </div>
        <div className={'text-xs px-3 text-center py-4 line-clamp-3'}>
          This site is protected by the{' '}
          <Link
            href={'https://policies.google.com/privacy'}
            className='text-xs'
          >
            Google Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href={'https://policies.google.com/terms'} className='text-xs'>
            Terms of Service
          </Link>{' '}
          apply. By clicking {`"Create account"`}, I agree to {`A11yWatch's `}
          <Link href={'/terms-of-service'} className='text-xs'>
            TOS
          </Link>{' '}
          and{' '}
          <Link
            href={'/privacy'}
            aria-label={`${DOMAIN_NAME} privacy policy statement.`}
            className='text-xs'
          >
            Privacy Policy
          </Link>
          .
        </div>
      </div>
      <LinearBottom loading={loading} />
    </Fragment>
  )
}

export const SignOnForm = memo(SignOnFormWrapper)

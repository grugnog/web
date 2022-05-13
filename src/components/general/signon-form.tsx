import React, { useEffect, useRef, FunctionComponent, Fragment } from 'react'
import { GoogleLoginButton } from './google-login'
import { useRouter } from 'next/router'
import {
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
  FormHelperText,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { useMutation } from '@apollo/react-hooks'
import { REGISTER, LOGIN } from '@app/mutations'
import { AppManager, UserManager } from '@app/managers'
import { Link } from './link'
import { LinearBottom } from './loaders'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  submit: {
    marginTop: 10,
    width: 200,
    border: `1px solid ${theme.palette.divider}`,
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: 10,
  },
  row: {
    marginTop: 10,
    flexDirection: 'row',
    display: 'inline-flex',
  },
  loginLink: {
    fontWeight: 'bold',
    marginLeft: 6,
  },
  or: {
    marginTop: 7,
  },
  google: {
    width: 200,
    minHeight: 40,
    border: `1px solid rgba(0, 0, 0, 0.3)`,
  },
}))

interface SignOnProps {
  loginView?: boolean
  home?: boolean
  isVisible?: boolean
}

const SignOnForm: FunctionComponent<SignOnProps> = ({
  loginView,
  home,
  isVisible = true,
}) => {
  const router = useRouter()
  const classes = useStyles()
  const [signOnMutation, { data, loading }] = useMutation(
    loginView ? LOGIN : REGISTER
  )
  const emailRef = useRef<any>(null)
  const passwordRef = useRef<any>(null)

  useEffect(() => {
    if (data) {
      const user = data[loginView ? 'login' : 'register']
      if (user) {
        try {
          const plan = String(router?.query?.plan).toLocaleLowerCase() as string
          const urlRoute = ['basic', 'premium'].includes(plan)
            ? `/payments?plan=${plan}`
            : '/'

          UserManager.setUser(user)
          ;(async () => {
            await router.push(urlRoute)
          })()
        } catch (e) {
          console.error(e)
        }

        // location.reload()
      }
    }
  }, [data, router, loginView])

  const submit = async (e: any) => {
    e?.preventDefault()
    // @ts-ignore
    if (!passwordRef?.current?.value || !emailRef?.current?.value) {
      AppManager.toggleSnack(
        true,
        !emailRef?.current?.value
          ? 'Please enter a password of at least 6 characters.'
          : 'Please check your email and password and try again.',
        'error'
      )
    } else {
      try {
        await signOnMutation({
          variables: {
            email: emailRef?.current?.value,
            password: passwordRef?.current?.value,
          },
        })
      } catch (e) {
        console.error(e)
      }

      // @ts-ignore
      if (passwordRef.current) {
        passwordRef.current.value = ''
      }
    }
  }

  const onGoogleAuth = async (response: any) => {
    try {
      await signOnMutation({
        variables: {
          email: response?.profileObj?.email,
          password: '',
          googleId: response?.googleId,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Fragment>
      <Container maxWidth='sm'>
        <Typography
          variant={home ? 'h4' : 'h2'}
          component={home ? 'h4' : 'h1'}
          gutterBottom
          align='center'
          style={{ fontWeight: 'bold' }}
        >
          {(loginView && 'Login') || (home && 'Sign up for free') || 'Register'}
        </Typography>
        <div className={classes.paper}>
          <GoogleLoginButton
            loginView={loginView}
            isVisible={isVisible}
            onSuccess={onGoogleAuth}
            classes={classes}
          />
          <Typography variant='overline' component='p' className={classes.or}>
            Or
          </Typography>
          <form autoComplete={loginView ? 'on' : 'off'} onSubmit={submit}>
            <div>
              <FormControl>
                <TextField
                  id='email'
                  aria-describedby='my-email-text'
                  className={classes.textField}
                  label='Email'
                  type='email'
                  margin='dense'
                  autoFocus={!home}
                  autoComplete='email'
                  variant='outlined'
                  required
                  inputRef={emailRef}
                />
                <FormHelperText
                  id='my-email-text'
                  className={classes.textCenter}
                >
                  {`We'll never share your email.`}
                </FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <TextField
                  id='password'
                  aria-describedby='my-password-text'
                  className={`${classes.textField}`}
                  label='Password'
                  margin='dense'
                  inputProps={{
                    minLength: '6',
                  }}
                  type='password'
                  autoComplete='current-password'
                  variant='outlined'
                  required
                  inputRef={passwordRef}
                />
                <FormHelperText
                  id='my-password-text'
                  className={classes.textCenter}
                  style={{ marginBottom: 0 }}
                >
                  {`We'll never share your password.`}
                </FormHelperText>
              </FormControl>
            </div>
            <Button className={classes.submit} type='submit'>
              {loginView ? 'Login' : 'Sign up with email'}
            </Button>
          </form>
          {home ? (
            <span className={classes.row}>
              <Typography variant='overline' component='span'>
                Already have an account?
                <Link href='/login' className={classes.loginLink}>
                  Log in
                </Link>
              </Typography>
            </span>
          ) : null}
          {!home ? (
            <span className={classes.row}>
              <Typography variant='overline' component='p'>
                Forgot Password? <Link href='/reset-password'>Reset</Link>
              </Typography>
            </span>
          ) : null}
        </div>
        <div className={'text-xs text-center py-4'}>
          This site is protected by the Google{' '}
          <Link href={'https://policies.google.com/privacy'}>
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href={'https://policies.google.com/terms'}>
            Terms of Service
          </Link>{' '}
          apply. By clicking {`"Create account"`}, I agree to {`A11yWatch's `}
          <Link href={'/terms-of-service'}>TOS</Link> and{' '}
          <Link href={'/privacy'}>Privacy Policy</Link>.
        </div>
      </Container>
      <LinearBottom loading={loading} />
    </Fragment>
  )
}

export { SignOnForm }

import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { metaSetter } from '@app/utils'
import type { GetServerSideProps } from 'next'
import { MarketingShortTitle } from '@app/components/marketing'
import { useMutation } from '@apollo/react-hooks'
import { REGISTER } from '@app/mutations'
import { AppManager, UserManager } from '@app/managers'
import { parseJwt } from '@app/lib/auth'

// handle auth redirects
function AuthRedirect(props: {
  email: string
  id: number
  cookie?: boolean
  jwt: string
}) {
  const [signOnMutation] = useMutation(REGISTER, { ignoreResults: true })
  const router = useRouter()
  const { email, id, cookie, jwt } = props ?? {}

  const onGithubAuth = useCallback(
    async ({ email, id }: { email: string; id: number }) => {
      try {
        if (email && id) {
          const { data } = await signOnMutation({
            variables: {
              email,
              githubId: id,
              password: '',
            },
          })

          const authValue = data?.register ?? data?.login

          if (authValue) {
            UserManager.setUser(authValue)

            const p = router?.query?.plan
            const plan = p && (String(p).toLocaleLowerCase() as string)
            const urlRoute =
              plan && plan !== 'free'
                ? `/payments?plan=${router?.query?.plan}`
                : '/dashboard'

            window.location.href = urlRoute
          } else {
            window.location.href = '/'
          }
        } else {
          AppManager.toggleSnack(
            true,
            'Your Github email set to private. Update your email to public to login.',
            'error'
          )
          window.location.href = '/'
        }
      } catch (e) {
        console.error(e)
      }
    },
    [signOnMutation, router?.query?.plan]
  )

  useEffect(() => {
    // todo: perform auth ssr
    if (!cookie) {
      ;(async () => {
        await onGithubAuth({ email, id })
      })()
    }
  }, [email, id, onGithubAuth, cookie])

  return (
    <>
      <MarketingShortTitle />
      {id ? (
        <>
          <div className='p-4'>
            <div className='text-lg'>Authenticated {email}!</div>
            <div>Redirecting to dashboard...</div>
          </div>
        </>
      ) : (
        <>
          <div className='p-4'>
            <div className='text-lg'>Authenticated {email}!</div>
            <div id='auth-value'>{jwt}</div>
          </div>
        </>
      )}
    </>
  )
}

// handle success login to routes either through CLI or Github
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  const { access_token, cookie } = query

  if (cookie) {
    const { jwt } = context.req.cookies

    if (!jwt) {
      return {
        notFound: true,
      }
    }

    const { email } = parseJwt(jwt)

    return {
      props: {
        email: email || '',
        id: null,
        token: jwt,
        cookie: true,
      },
    }
  } else if (access_token) {
    let email = ''
    let id = -1

    try {
      const res = await fetch('https://api.github.com/user', {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: 'token ' + access_token,
        },
      })
      const source = await res.json()

      email = source.email
      id = source.id
    } catch (e) {
      console.error(e)
    }

    if (email) {
      return {
        props: {
          email,
          id,
        },
      }
    }
  }

  return {
    redirect: '/',
    props: {},
  }
}

export default metaSetter({ AuthRedirect }, { gql: true })

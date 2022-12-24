import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { metaSetter } from '@app/utils'
import type { GetServerSideProps } from 'next'
import { MarketingShortTitle } from '@app/components/marketing'
import { useMutation } from '@apollo/react-hooks'
import { REGISTER } from '@app/mutations'
import { AppManager, UserManager } from '@app/managers'
import { parseJwt } from '@app/lib/auth/jwt'

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
    [signOnMutation, router]
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
      <div className='container mx-auto'>
        {id ? (
          <>
            <div className='p-4 space-y-2 overflow-hidden'>
              <div className='text-lg font-medium md:text-2xl'>
                Welcome <b>{email}</b>!
              </div>
              <div>Redirecting to dashboard...</div>
            </div>
          </>
        ) : (
          <>
            <div className='p-4 space-y-2 overflow-hidden'>
              <div className='text-lg font-medium md:text-2xl'>
                Welcome <b>{email}</b>!
              </div>
              <div id='auth-value' className='line-clamp-4 text-base'>
                {jwt}
              </div>
              <div className='text-sm text-gray-700'>
                You can now close this page.
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

// handle success login to routes either through CLI or Github
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  const { access_token, cookie } = query
  const { jwt } = context.req.cookies

  // redirect session oauth custom imp todo [ip webhook]
  if (cookie && jwt) {
    const token = parseJwt(`Bearer ${jwt}`)

    return {
      props: {
        email: token?.subject || '',
        id: null,
        jwt: jwt,
        role: token?.keyid || 0,
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

import { useEffect, useCallback } from 'react'
import { metaSetter } from '@app/utils'
import { GetServerSideProps } from 'next'
import { MarketingShortTitle } from '@app/components/marketing'
import { useMutation } from '@apollo/react-hooks'
import { REGISTER } from '@app/mutations'
import { AppManager, UserManager } from '@app/managers'
import { useRouter } from 'next/router'

// handle auth redirects
function AuthRedirect(props: { email: string; id: number; cookie?: boolean }) {
  const [signOnMutation] = useMutation(REGISTER, { ignoreResults: true })
  const router = useRouter()
  const { email, id, cookie } = props ?? {}

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
        <div className='p-4'>Redirecting to dashboard...</div>
      ) : (
        <div className='p-4' id='auth-value'>
          Authenticated!
        </div>
      )}
    </>
  )
}

// handle success login to routes either through CLI or Github
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  const { access_token, cookie } = query

  if (cookie) {
    return {
      props: {
        email: 'Authed!',
        id: null,
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

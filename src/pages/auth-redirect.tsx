import { useEffect, useCallback } from 'react'
import { metaSetter } from '@app/utils'
import { useRouter } from 'next/router'
import { MarketingShortTitle } from '@app/components/marketing'
import Head from 'next/head'
import { useMutation } from '@apollo/react-hooks'
import { REGISTER } from '@app/mutations'
import { AppManager, UserManager } from '@app/managers'

function AuthRedirect() {
  const router = useRouter()
  const [signOnMutation] = useMutation(REGISTER)
  const access_token = router.query?.access_token

  const onGithubAuth = useCallback(
    async ({ email, id }: { email: string; id: number }) => {
      try {
        if (email && id) {
          const data = await signOnMutation({
            variables: {
              email: email,
              githubId: id,
              password: '',
            },
          })

          const authValue = data?.data?.register ?? data?.data?.login

          if (authValue) {
            UserManager.setUser(authValue)
          }
        } else {
          AppManager.toggleSnack(
            true,
            'Your Github email set to private. Update your email to public to login.',
            'error'
          )
        }
        window.location.pathname = '/'
      } catch (e) {
        console.error(e)
      }
    },
    [signOnMutation]
  )

  useEffect(() => {
    if (access_token) {
      fetch('https://api.github.com/user', {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: 'token ' + access_token,
        },
      })
        .then((res) => res.json())
        .then(async (res) => {
          try {
            await onGithubAuth({ email: res.email, id: res.id })
          } catch (e) {
            AppManager.toggleSnack(true, `${e}`, 'error')
          }
        })
        .catch((e) => {
          AppManager.toggleSnack(true, `${e}`, 'error')
        })
    }
  }, [access_token, onGithubAuth])

  return (
    <>
      <Head>
        <meta name='robots' content='noindex' />
      </Head>
      <MarketingShortTitle />
      <div className='p-4'>Redirecting to dashboard...</div>
    </>
  )
}

export default metaSetter({ AuthRedirect }, { gql: true })

import { useEffect, useCallback } from 'react'
import { metaSetter } from '@app/utils'
import { GetServerSideProps } from 'next'
import { MarketingShortTitle } from '@app/components/marketing'
import { useMutation } from '@apollo/react-hooks'
import { REGISTER } from '@app/mutations'
import { AppManager, UserManager } from '@app/managers'
import { useRouter } from 'next/router'

function AuthRedirect(props: { email: string; id: number }) {
  const [signOnMutation] = useMutation(REGISTER)
  const { email, id } = props ?? {}
  const router = useRouter()

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

          authValue && UserManager.setUser(authValue)
          await router.push('/dashboard')
        } else {
          AppManager.toggleSnack(
            true,
            'Your Github email set to private. Update your email to public to login.',
            'error'
          )
          await router.push('/')
        }
      } catch (e) {
        console.error(e)
      }
    },
    [signOnMutation, router]
  )

  useEffect(() => {
    // todo; remove
    ;(async () => {
      await onGithubAuth({ email, id })
    })()
  }, [email, id, onGithubAuth])

  return (
    <>
      <MarketingShortTitle />
      <div className='p-4'>Redirecting to dashboard...</div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  const { access_token } = query

  if (access_token) {
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

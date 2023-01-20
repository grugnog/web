import { NavBar, IssueModal, Fab } from '@app/components/general'
import { useRouter } from 'next/router'
import { useIssue } from '@app/data'
import { AccessIframe } from '@app/components/ada/access-iframe'
import { metaSetter } from '@app/utils'
import { GetServerSideProps } from 'next'
import { useAuthContext } from '@app/components/providers/auth'

// add ssr for initial website url
function WebsiteDetails({ url: initUrl }: { url: string }) {
  const { account } = useAuthContext()
  const router = useRouter()
  const { url } = router?.query
  const baseUrl = (url as string) || initUrl
  const { issue } = useIssue(baseUrl, !baseUrl)

  return (
    <>
      <NavBar
        title={baseUrl}
        backButton
        notitle
        authenticated={account.authed}
      />
      <AccessIframe url={baseUrl} issue={issue} />
      <Fab issue={issue} />
      <IssueModal issue={issue} />
    </>
  )
}

export default metaSetter(
  { WebsiteDetails },
  {
    description: 'Detailed accessibility reports for your web page.',
    gql: true,
  }
)

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { url } = context.query ?? {}

  return {
    props: {
      url,
    },
  }
}

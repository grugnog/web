import { NavBar, IssueModal, Fab } from '@app/components/general'
import { useRouter } from 'next/router'
import { useIssue, useScript } from '@app/data'
import { AdaIframe } from '@app/components/ada/ada-iframe'
import { metaSetter } from '@app/utils'
import { GetServerSideProps } from 'next'

// add ssr for initial website url
function WebsiteDetails({ url: initUrl }: { url: string }) {
  const router = useRouter()
  const { url } = router?.query
  const baseUrl = (url as string) || initUrl
  const { issue } = useIssue(baseUrl, !baseUrl)
  const { script } = useScript(baseUrl, !baseUrl)

  return (
    <>
      <NavBar title={baseUrl} backButton notitle />
      <AdaIframe url={baseUrl} issue={issue} />
      <Fab issue={issue} script={script} />
      <IssueModal issue={issue} />
    </>
  )
}

export default metaSetter(
  { WebsiteDetails },
  {
    description: 'Detailed website reports for any page.',
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

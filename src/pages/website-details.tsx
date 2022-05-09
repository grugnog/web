import React from 'react'
import { NavBar, IssueModal, Pulse } from '@app/components/general'
import { useRouter } from 'next/router'
import { issueData, scriptData } from '@app/data'
import { metaSetter } from '@app/utils'
import dynamic from 'next/dynamic'

const AdaIframe = dynamic(
  // @ts-ignore
  () => import('../components/ada/ada-iframe').then((mod) => mod.AdaIframe),
  { loading: () => <Pulse />, ssr: false }
) as any

const Fab = dynamic(
  // @ts-ignore
  () => import('@app/components/general/fab').then((mod) => mod.Fab),
  { loading: () => <Pulse />, ssr: false }
) as any

function WebsiteDetails() {
  const router = useRouter()
  const { url } = router?.query
  const { issue } = issueData(url, !url)
  const { script } = scriptData(url, !url)

  return (
    <>
      <NavBar title={url} backButton notitle />
      <AdaIframe url={url} issue={issue} />
      <Fab autoFix issue={issue} script={script} />
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

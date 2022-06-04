import React from 'react'
import { NavBar, IssueModal, Fab } from '@app/components/general'
import { AdaIframe } from '@app/components/ada/ada-iframe'
import { useRouter } from 'next/router'
import { issueData, useScript } from '@app/data'
import { metaSetter } from '@app/utils'

function WebsiteDetails() {
  const router = useRouter()
  const { url } = router?.query
  const { issue } = issueData(url, !url)
  const { script } = useScript(url, !url)

  return (
    <>
      <NavBar title={url} backButton notitle />
      {url ? <AdaIframe url={url} issue={issue} /> : null}
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

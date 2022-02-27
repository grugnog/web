import React from 'react'
import { NavBar, Fab, IssueModal, Pulse } from '@app/components/general'
import { AdaIframe } from '@app/components/ada'
import { useRouter } from 'next/router'
import { issueData, scriptData } from '@app/data'
import { metaSetter } from '@app/utils'

function WebsiteDetails() {
  const router = useRouter()
  const { websiteUrl } = router?.query
  const { issue } = issueData(websiteUrl)
  const { script } = scriptData(websiteUrl)

  return (
    <>
      <NavBar title={websiteUrl} backButton notitle />
      {websiteUrl ? (
        <AdaIframe url={websiteUrl} issue={issue} />
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Pulse />
        </div>
      )}
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

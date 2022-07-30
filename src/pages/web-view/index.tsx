import { NavBar, PageTitle } from '@app/components/general'
import { useRouter } from 'next/router'
import { metaSetter } from '@app/utils'
import { RenderInnerPages } from '@app/components/general/lists/websites-pages'
import { RenderInnerIssues } from '@app/components/general/lists/websites-issues'
import { RenderInnerPageActions } from '@app/components/general/lists/websites-pages-actions'
import { RenderInnerAnalytics } from '@app/components/general/lists/websites-analytics'
import { RenderInnerScripts } from '@app/components/general/lists/websites-scripts'
import { useState } from 'react'
import { useAuthContext } from '@app/components/providers/auth'

// toggle details of cell
const WebCell = ({ title, children }: any) => {
  const [visible, setVisible] = useState<boolean>(false)

  const onTogglelist = () => {
    setVisible((v: boolean) => !v)
  }

  return (
    <div className={`border-4 rounded ${visible ? 'rounded-b-none' : ''}`}>
      <button
        className={`px-3 py-3 w-full text-left`}
        onClick={onTogglelist}
        aria-label={`Toggle section visible for ${title}`}
      >
        <div className={'text-2xl md:text-3xl font-bold'}>{title}</div>
      </button>
      {visible ? children : null}
    </div>
  )
}

// detauked information relating to a single website. Combine all paginaters into one.
function WebView() {
  const router = useRouter()
  const { url } = router?.query
  const { authed } = useAuthContext()

  return (
    <>
      <NavBar
        title={'Website Details'}
        backButton
        authenticated={authed}
        loading={false}
      />
      <div className='px-6 py-6 space-y-2'>
        <PageTitle>{url}</PageTitle>
        <WebCell title={'Issues'}>
          <RenderInnerIssues pageUrl={url} />
        </WebCell>
        <WebCell title={'Pages'}>
          <RenderInnerPages pageUrl={url} />
        </WebCell>
        <WebCell title={'Analytics'}>
          <RenderInnerAnalytics pageUrl={url} />
        </WebCell>
        <WebCell title={'Scripts'}>
          <RenderInnerScripts pageUrl={url} />
        </WebCell>
        <WebCell title={'Actions'}>
          <RenderInnerPageActions pageUrl={url} />
        </WebCell>
      </div>
    </>
  )
}

export default metaSetter(
  { WebView },
  {
    description: 'Information based on a single website to track and monitor.',
    gql: true,
  }
)

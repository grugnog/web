import { Fragment, useRef, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { mainFixed, mainFrame } from '@app/stylesheets/index.module.css'
import { IframeManager, HomeManager, frameDom } from '@app/managers'
import { AnnotationContainer } from './annotation-container'
import { ResetCss } from './styles'
import { sboxType } from './config'
import { onLoad } from './utils'
import { issueExtractor } from '@app/utils'

// main iframe viewer
const MainFrame = observer(
  ({ homeStore, iframeStore, url, issue, posRelative }: any) => {
    const iframeRef = useRef(null)

    useEffect(() => {
      onLoad(null, { iframeRef })

      if (issue && issue.length) {
        iframeStore.initIssueFix(issue, url)
      }

      return () => {
        iframeStore?.clearPortals()
        frameDom?.clearDom()
      }
    }, [iframeStore, issue, url])

    const loadFrame = (event: any) => {
      onLoad(event, { iframeRef })
      if (issue && issue.length) {
        iframeStore.initIssueFix(issue, url)
      }
    }

    const iframeSrc = homeStore.getIframeSource(url)

    return (
      <div className={posRelative ? '' : mainFixed}>
        <ResetCss />
        {iframeSrc.includes('.pdf') ? (
          <embed
            src={iframeSrc}
            id='ada-frame'
            className={mainFrame}
            title={`${iframeSrc} accessibility insight pdf viewer`}
            onLoad={loadFrame}
            ref={iframeRef}
          />
        ) : (
          <iframe
            src={iframeSrc}
            id='ada-frame'
            className={mainFrame}
            title={`${iframeSrc} accessibility insight view`}
            name='ada iframe'
            sandbox={`${sboxType} allow-scripts`}
            onLoad={loadFrame}
            ref={iframeRef}
            allowFullScreen
          />
        )}
      </div>
    )
  }
)

// container and portal of annonations into iframe
const Portals = observer(({ store }: { store: typeof IframeManager }) => {
  const frameProps = store?.selectedAnnotation ? store.selectedAnnotation : {}

  return store.Portals?.length ? (
    <>
      {store.Portals.slice()}
      <AnnotationContainer store={store} {...frameProps} />
    </>
  ) : null
})

// Iframe component to use for marketing websites
export const TestOutIframe = ({ url, website, issue, posRelative }: any) => {
  const pageIssues = issueExtractor(website || issue) // array of issues extract duplex types

  return (
    <Fragment>
      <MainFrame
        homeStore={HomeManager}
        iframeStore={IframeManager}
        issue={pageIssues}
        posRelative={posRelative}
        url={url}
      />
      <Portals store={IframeManager} />
    </Fragment>
  )
}

import React, { Fragment, useRef, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'
import { mainFixed, mainFrame } from '@app/stylesheets/index.module.css'
import { IframeManager, HomeManager, frameDom } from '@app/managers'
import { AnnotationContainer } from './annotation-container'
import { ResetCss } from './styles'
import { sboxType } from './config'
import { onLoad } from './utils'
import { issueExtractor } from '@app/utils'

const MainFrame = observer(
  ({ homeStore, iframeStore, url, issue, posRelative }: any) => {
    const iframeRef = useRef(null)

    useEffect(() => {
      onLoad(null, { iframeRef })
    }, [])

    useEffect(() => {
      if (issue && frameDom?.dom && !iframeStore.issueInited) {
        try {
          iframeStore.initIssueFix(issue, url)
        } catch (e) {
          console.error(e)
        }
      }

      return () => {
        iframeStore?.clearPortals()
        frameDom?.clearDom()
      }
    }, [iframeStore, issue, url])

    const loadFrame = (event: any) => {
      onLoad(event, { iframeRef })
      if (issue) {
        try {
          iframeStore.initIssueFix(issue, url)
        } catch (e) {
          console.error(e)
        }
      }
    }

    const iframeSrc = homeStore.getIframeSource(url)
    const pdfView = iframeSrc.includes('.pdf')

    return (
      <div className={posRelative ? '' : mainFixed}>
        <ResetCss />
        {pdfView ? (
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

const Portals = observer(({ store }: any) => toJS(store.Portals))

const Container = observer(({ store }: { store: typeof IframeManager }) => {
  return store.portals?.length ? (
    <AnnotationContainer store={store} {...store.selectedAnnotation} />
  ) : null
})

export const TestOutIframe = ({ url, website, issue, posRelative }: any) => {
  const pageIssues = issue || issueExtractor(website) // array of issues extract duplex types

  return (
    <Fragment>
      <MainFrame
        homeStore={HomeManager}
        iframeStore={IframeManager}
        issue={pageIssues}
        posRelative={posRelative}
        url={url}
      />
      <Container store={IframeManager} />
      <Portals store={IframeManager} />
    </Fragment>
  )
}

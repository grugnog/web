import React, { Fragment, forwardRef, useRef, useEffect } from 'react'
import {
  fixedFrame,
  mainFrame,
  mainFixed,
} from '@app/stylesheets/index.module.css'
import { IframeManager, HomeManager, frameDom } from '@app/managers'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { useIframe, useHtmlView } from '@app/data'
import { sboxType } from './config'
import { ResetCss } from './styles'
import { HtmlView } from './html-view'
import { onLoad } from './utils'
import { AnnotationContainer } from './annotation-container'

const IFrameComponent = forwardRef((props: any, ref: any) => {
  const src = props?.src || ''
  if (src?.includes('.pdf')) {
    return (
      <embed {...props} ref={ref} src={src.replace('/api/iframe/?url=', '')} />
    )
  }
  return <iframe {...props} ref={ref} />
})

IFrameComponent.displayName = 'IFrameComponent'

const urlReplacer = (url: string, homeStore: any) => {
  if (url) {
    if (url.includes('http://localhost')) {
      return url
    }
    return `/api/iframe?url=${url}`
  }
  return homeStore.getIframeSource(url)
}

const MainFrame = observer(
  ({
    homeStore,
    iframeStore,
    url,
    miniPlayer,
    // viewMode = iframeStore?.viewMode,
    issue,
  }: any) => {
    const iframeRef = useRef()
    const { setFrameContent } = useIframe()
    const { setHtmlViewContent } = useHtmlView()

    useEffect(() => {
      try {
        onLoad(null, { iframeRef })
      } catch (e) {
        console.error(e)
      }
      return () => {
        iframeStore.clearPortals()
        frameDom?.clearDom()
      }
    }, [iframeStore])

    useEffect(() => {
      if (issue && frameDom?.dom && !iframeStore.issueInited) {
        try {
          iframeStore.initIssueFix(issue)
        } catch (e) {
          console.error(e)
        }
      }
    }, [iframeStore, issue])

    const ariaL = `${url} accessibility insight view`

    const loadFrame = (event: any) => {
      try {
        onLoad(event, { setFrameContent, iframeRef, setHtmlViewContent })
        if (issue) {
          iframeStore.initIssueFix(issue)
        }
      } catch (e) {
        console.error(e)
      }
    }

    const src = iframeStore?.viewMode ? url : urlReplacer(url, homeStore)

    const frameProps = {
      src,
      title: ariaL,
      name: ariaL,
      onLoad: loadFrame,
      className: mainFrame,
      sandbox: `${sboxType} allow-scripts`,
      ref: iframeRef,
      allowFullScreen: true,
    }

    if (miniPlayer) {
      return (
        <div className={fixedFrame}>
          <IFrameComponent {...frameProps} />
        </div>
      )
    }
    return (
      <div className={mainFixed}>
        <ResetCss />
        <IFrameComponent {...frameProps} />
      </div>
    )
  }
)

const FixPortals = observer(({ store }: { store: any }) => toJS(store.Portals))
const Container = observer(({ store }: { store: any }) => (
  <AnnotationContainer store={store} {...store.selectedAnnotation} />
))

export const AdaIframe = ({ url, miniPlayer, issue }: any) => {
  return (
    <Fragment>
      <MainFrame
        homeStore={HomeManager}
        iframeStore={IframeManager}
        url={url}
        miniPlayer={miniPlayer}
        issue={issue}
      />
      <FixPortals store={IframeManager} />
      <Container store={IframeManager} />
      <HtmlView />
    </Fragment>
  )
}

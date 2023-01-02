import { Fragment, forwardRef, useRef, useEffect } from 'react'
import {
  fixedFrame,
  mainFrame,
  mainFixed,
} from '@app/stylesheets/index.module.css'
import { IframeManager, HomeManager, frameDom } from '@app/managers'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'
import { useIframe } from '@app/data'
import { sboxType } from './config'
import { ResetCss } from './styles'
import { onLoad } from './utils'
import { AnnotationContainer } from './annotation-container'
import { Issue } from '@app/types'

const IFrameComponent = forwardRef((props: any, ref: any) => {
  const src = props?.src || ''

  if (src?.includes('.pdf')) {
    return (
      <embed {...props} ref={ref} src={src.replace('/api/iframe?url=', '')} />
    )
  }
  return <iframe {...props} ref={ref} />
})

IFrameComponent.displayName = 'IFrameComponent'

const urlReplacer = (url: string) => {
  if (url) {
    return `/api/iframe?url=${encodeURIComponent(url)}`
  }
  return HomeManager.getIframeSource(url)
}

interface MainFrameProps {
  url: string
  miniPlayer: any
  issue: Issue
}

const AccessibilityIframe = ({
  url,
  miniPlayer,
  // viewMode = iframeStore?.viewMode,
  issue,
}: MainFrameProps) => {
  const iframeRef = useRef()
  const { setFrameContent } = useIframe()

  useEffect(() => {
    onLoad(null, { iframeRef })

    return () => {
      IframeManager.clearPortals()
      frameDom?.clearDom()
    }
  }, [])

  useEffect(() => {
    if (issue && frameDom?.dom && !IframeManager.issueInited) {
      IframeManager.initIssueFix(issue)
    }
  }, [issue])

  const ariaL = `${url} accessibility insight view`

  const loadFrame = (event: any) => {
    onLoad(event, { setFrameContent, iframeRef })
    if (issue) {
      IframeManager.initIssueFix(issue)
    }
  }

  const src = IframeManager.viewMode ? url : urlReplacer(url)

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

const MainFrame = observer(AccessibilityIframe)
const FixPortals = observer(({ store }: { store: any }) => toJS(store.Portals))
const Container = observer(({ store }: { store: any }) =>
  store.selectedAnnotation ? (
    <AnnotationContainer {...store.selectedAnnotation} />
  ) : null
)

export const AdaIframe = ({ url = '', miniPlayer, issue }: any) => {
  return (
    <Fragment>
      {url ? (
        <MainFrame url={url} miniPlayer={miniPlayer} issue={issue} />
      ) : null}
      <FixPortals store={IframeManager} />
      <Container store={IframeManager} />
    </Fragment>
  )
}

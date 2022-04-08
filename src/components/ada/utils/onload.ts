import { frameDom } from '@app/managers'

// IFRAME LOADER
export const onLoad = (event: any, { setFrameContent, iframeRef }: any) => {
  try {
    const dom =
      (typeof iframeRef !== 'undefined' &&
        iframeRef?.current?.contentDocument) ||
      event?.target?.contentDocument

    if (dom) {
      frameDom.setFrameDom(dom)
      if (typeof setFrameContent === 'function') {
        setFrameContent()
      }
    }
  } catch (e) {
    console.error(e)
  }
}

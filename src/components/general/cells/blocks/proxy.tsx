import React, { memo, useEffect, useState } from 'react'
import { InfoBlock } from '../info-block'
import { GrVirtualMachine } from 'react-icons/gr'
import { useWebsiteContext } from '@app/components/providers/website'

export const ProxyBoxWrapper = ({
  proxy: defaultProxy,
  url,
  activeSubscription,
}: {
  url: string
  proxy?: string
  activeSubscription?: boolean
}) => {
  const [proxy, setProxy] = useState<string>(defaultProxy || '')
  const [visible, setVisible] = useState<boolean>(false)

  const { updateWebsite } = useWebsiteContext()

  const onChangeProxy = (e: React.ChangeEvent<any>) => {
    setProxy(e?.target?.value)
  }

  useEffect(() => {
    if (
      defaultProxy === proxy ||
      proxy === '*************' ||
      !activeSubscription
    ) {
      return
    }
    const debounce = setTimeout(async () => {
      if (proxy !== defaultProxy) {
        try {
          await updateWebsite({
            variables: { url, proxy },
          })
        } catch (e) {
          console.error(e)
        }
      }
    }, 2300)

    return () => clearTimeout(debounce)
  }, [defaultProxy, proxy, url, updateWebsite, activeSubscription])

  const onFocusEvent = () => setVisible(true)
  const onBlurEvent = () => setVisible(false)

  const proxyLabel = `${url}-proxy-id`

  return (
    <InfoBlock title={'Proxy'} icon={<GrVirtualMachine className='grIcon' />}>
      <label htmlFor={proxyLabel} className={'sr-only'}>
        Proxy
      </label>
      <input
        className='py-1 bg-transparent focus:outline-none focus:border-r-2 focus:border-blue-300 hover:border-r-2'
        onChange={onChangeProxy}
        value={visible ? proxy : (proxy && '*************') || ''}
        id={proxyLabel}
        onFocus={onFocusEvent}
        onBlur={onBlurEvent}
        placeholder='Proxy'
        disabled={!activeSubscription}
        type='url'
        name={'proxy'}
      />
    </InfoBlock>
  )
}

export const ProxyBox = memo(ProxyBoxWrapper)

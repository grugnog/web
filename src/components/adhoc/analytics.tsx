'use client'

import { useEffect } from 'react'
import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'

export const AnalyticsHoc = () => {
  const router = useRouter()

  useEffect(() => {
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_CODE || '', {
      url: process.env.NEXT_PUBLIC_FATHOM_URL,
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  return null
}

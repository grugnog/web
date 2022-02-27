import dynamic from 'next/dynamic'

const WithSkipContent = dynamic(
  () => import('../general/skip-content').then((mod) => mod.SkipContent) as any,
  {
    ssr: false,
  }
)

export { WithSkipContent }

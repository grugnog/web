import dynamic from 'next/dynamic'
import { VideoSkeleton } from '../placeholders'
/* eslint-disable */

export const WithCtaVideo = dynamic(
  () => import('../cta/cta-video').then((mod) => mod.CtaVideo) as any,
  {
    ssr: true,
    loading: () => <VideoSkeleton />,
  }
)
WithCtaVideo.displayName = 'WithCtaVideo'

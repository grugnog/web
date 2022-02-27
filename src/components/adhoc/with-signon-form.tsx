import dynamic from 'next/dynamic'
import { SignOnFormSkeleton } from '../placeholders'
/* eslint-disable */

const WithSignOnForm = dynamic(
  () => import('../general/signon-form').then((mod) => mod.SignOnForm) as any,
  {
    ssr: true,
    loading: () => <SignOnFormSkeleton loginView={false} />,
  }
)

export { WithSignOnForm }

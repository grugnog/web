import dynamic from 'next/dynamic'
import { SignOnFormSkeleton } from '../placeholders'
/* eslint-disable */

const WithSignOnForm = dynamic(
  () =>
    import('../general/signon-form/gql-form').then(
      (mod) => mod.SignOnForm
    ) as any,
  {
    ssr: false,
    loading: () => <SignOnFormSkeleton />,
  }
) as any

export { WithSignOnForm }

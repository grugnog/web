import dynamic from 'next/dynamic'

const WithSnackBar = dynamic(
  () => import('../general/snack-bar').then((mod) => mod.SnackBar) as any,
  {
    ssr: false,
  }
)

export { WithSnackBar }

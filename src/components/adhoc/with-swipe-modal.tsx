import dynamic from 'next/dynamic'

const WithSwipeModal = dynamic(
  () => import('../modal').then((mod) => mod.SwipeableTemporaryDrawer) as any
)

export { WithSwipeModal }

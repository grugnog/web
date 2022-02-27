import { Routes } from '@app/configs'

const MainRoutes = Routes.filter(({ nav }: any) => nav)
const MobileRoutes = Routes.filter(
  ({ href }: any) =>
    ![
      ...MainRoutes,
      '/register',
      '/login',
      '/testout',
      'https://a11ywatch.blog',
      'https://docs.a11ywatch.com',
    ].includes(href)
)

export { MainRoutes, MobileRoutes }

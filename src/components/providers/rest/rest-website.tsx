import { createContext, useContext, FC, Fragment, memo } from 'react'
import { useSearchRest } from '@app/data'
import { restWebsiteDefaults } from '../defaults'

const AppContext = createContext(restWebsiteDefaults)

export const RestWebsiteProvider = AppContext.Provider

export const RestWebsiteProviderWrapperMain: FC = ({ children }) => {
  const sharedState = useSearchRest()

  return (
    <RestWebsiteProvider value={sharedState}>{children}</RestWebsiteProvider>
  )
}

export const RestWebsiteProviderWrapperContext: FC<{ rest?: boolean }> = ({
  children,
  rest,
}) => {
  if (!rest) {
    return <Fragment>{children}</Fragment>
  }

  return (
    <RestWebsiteProviderWrapperMain>{children}</RestWebsiteProviderWrapperMain>
  )
}

export const RestWebsiteProviderWrapper: FC<{ rest?: boolean }> = memo(
  RestWebsiteProviderWrapperContext
)

export function useRestWebsiteContext() {
  return useContext(AppContext)
}

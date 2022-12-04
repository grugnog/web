import { Component, PropsWithChildren } from 'react'

type ErrorBoundaryState = {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div className={'p-10 bg-blue-400 text-white ring'}>
            <div className={'text-xl'}>
              An error occurred, please contact support at{' '}
              <address>
                <a href={'mailto:support@a11ywatch.com'}>
                  support@a11ywatch.com
                </a>
              </address>
            </div>
          </div>
          {this.props.children}
        </>
      )
    }
    return this.props.children
  }
}

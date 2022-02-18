let IFRAME_ENDPOINT = String(
  process.env.IFRAME_URL || process.env.API || 'http://api:8080'
)

if (process.env.NODE_ENV !== 'production' && process.env.DOCKER_CONTAINER) {
  IFRAME_ENDPOINT = IFRAME_ENDPOINT.replace('localhost', 'api').replace(
    '/graphql',
    ''
  )
}

export { IFRAME_ENDPOINT }

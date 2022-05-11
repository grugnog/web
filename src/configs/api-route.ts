const API_ENDPOINT =
  (process.env.API && String(process.env.API).replace('/graphql', '/api')) ||
  'http://127.0.0.1:3280/api'

// REMOVE FOR CLEAN VAR USAGE
const getAPIRoute = (type: 'api' | 'graphql' = 'api', middleware?: boolean) => {
  const endpoint = API_ENDPOINT ? API_ENDPOINT.replace('graphql', type) : ''

  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.DOCKER_CONTAINER &&
    middleware
  ) {
    const newTarget = endpoint.replace('localhost', 'host.docker.internal')

    return newTarget
  }

  return endpoint
}

export { API_ENDPOINT, getAPIRoute }

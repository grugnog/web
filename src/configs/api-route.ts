const API_ENDPOINT =
  (process.env.API && String(process.env.API).replace('/graphql', '/api')) ||
  'http://localhost:8080/api'

const getAPIRoute = (type: 'api' | 'graphql' = 'api', middleware?: boolean) => {
  const endpoint = API_ENDPOINT ? API_ENDPOINT.replace('graphql', type) : ''

  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.DOCKER_CONTAINER &&
    middleware
  ) {
    // replace with container name
    return endpoint.replace('localhost', 'api')
  }

  return endpoint
}

export { API_ENDPOINT, getAPIRoute }

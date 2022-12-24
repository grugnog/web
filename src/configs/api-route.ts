const API_ENDPOINT =
  (process.env.API && String(process.env.API).replace('/graphql', '/api')) ||
  'http://127.0.0.1:3280/api'

// REMOVE FOR CLEAN VAR USAGE
const getAPIRoute = (type: 'api' | 'graphql' = 'api', middleware?: boolean) => {
  const endpoint = API_ENDPOINT ? API_ENDPOINT.replace('graphql', type) : ''

  if (
    // when inside a docker container the edge function needs to make internal request since localhost is not available and or the container name
    process.env.DOCKER_CONTAINER &&
    middleware
  ) {
    return endpoint.replace('localhost', 'host.docker.internal')
  }

  return endpoint
}

const IFRAME_URL = `${getAPIRoute('api', true)}/iframe`

export { API_ENDPOINT, IFRAME_URL, getAPIRoute }

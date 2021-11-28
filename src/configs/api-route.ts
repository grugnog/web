const API_ENDPOINT =
  (process.env.API && String(process.env.API).replace('/graphql', '/api')) ||
  'http://localhost:8080/api'

const getAPIRoute = (type: 'api' | 'graphql' = 'api') =>
  API_ENDPOINT ? API_ENDPOINT.replace('graphql', type) : ''

export { API_ENDPOINT, getAPIRoute }

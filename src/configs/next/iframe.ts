// TODO: CLEAN SETUP URLS IN ONE LOCATION BETWEEN LOCAL + DOCKER
let IFRAME_ENDPOINT =
  process.env.IFRAME_URL || process.env.API || 'http://api:8080'

// target docker container name only usable via SSR
if (!process.env.IFRAME_URL && process.env.DOCKER_CONTAINER) {
  IFRAME_ENDPOINT = IFRAME_ENDPOINT.replace('localhost', 'api')
}

// REMOVE GQL FROM STRING IF SINGLE ENDPOINT
IFRAME_ENDPOINT = IFRAME_ENDPOINT.replace('/graphql', '')

export { IFRAME_ENDPOINT }

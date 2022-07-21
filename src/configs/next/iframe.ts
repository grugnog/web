// TODO: CLEAN SETUP URLS IN ONE LOCATION BETWEEN LOCAL + DOCKER
let IFRAME_ENDPOINT =
  process.env.IFRAME_URL || process.env.API || 'http://api:3280'

// target docker container name only usable via SSR
if (!process.env.IFRAME_URL && process.env.DOCKER_CONTAINER) {
  IFRAME_ENDPOINT = IFRAME_ENDPOINT.replace('localhost', 'host.docker.internal')
}

// REMOVE GQL FROM STRING IF SINGLE ENDPOINT
IFRAME_ENDPOINT = `${IFRAME_ENDPOINT.replace('/graphql', '')}`

if (!IFRAME_ENDPOINT.endsWith('/api')) {
  IFRAME_ENDPOINT = `${IFRAME_ENDPOINT}/api`
}

export { IFRAME_ENDPOINT }

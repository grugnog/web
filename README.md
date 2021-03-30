# a11ywatch-web

[![A11yWatch](https://circleci.com/gh/A11yWatch/web.svg?style=svg)](https://circleci.com/gh/A11yWatch/web)[![Maintainability](https://api.codeclimate.com/v1/badges/f5fdfe29c6e911f323cf/maintainability)](https://codeclimate.com/github/A11yWatch/web/maintainability)[![codecov](https://codecov.io/gh/A11yWatch/web/branch/master/graph/badge.svg?token=MBV2LGQO3J)](https://codecov.io/gh/A11yWatch/web)

a11ywatch clientside web application

## Installation

```
npm install
```

## About

This project is setup to run as a multi-domain client. You can see examples of files named `a11y, adanet, enable` in the `src/content/strings/` folder and other locations to show seperation of static content. All pages are current rendered SSG using next.js.

## Google Auth

In order for google login to work please add the env variable `GOOGLE_CLIENT_ID` with your id to your .env file.

## Start

You can start the project using docker or local

`docker-compose up` or `npm run dev`

check https://localhost:3000

## Iframe local website

in order to enable iframe rending to get websites with annotations currently you need to start the container or app using
`npm run dev:server`. Theres a work in progress to try to replicate this without needing a server proxy.

## Credits

logo and theme [Gilbert Bagaoisan](https://twitter.com/gbertb)

## LICENSE

check the license file in the root of the project.

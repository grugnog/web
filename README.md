# a11ywatch-web

[![A11yWatch](https://circleci.com/gh/a11ywatch/web.svg?style=svg)](https://circleci.com/gh/a11ywatch/web)
[![codecov](https://codecov.io/gh/a11ywatch/web/branch/main/graph/badge.svg?token=0LZKQ2H848)](https://codecov.io/gh/a11ywatch/web)
<!-- [![A11yWatch status](https://api.a11ywatch.com/status/a11ywatch.com?style=svg)](https://a11ywatch.com/reports/a11ywatch.com) -->

a11ywatch website

## Installation

```
yarn
```

## Start

You can start the project using docker or local

`docker-compose up` or `yarn run dev`

open [localhost:3000](http://localhost:3000) in your browser.

## API

In order to use the application you need to make sure you have the [A11yWatch](https://github.com/A11yWatch/a11ywatch) system running locally. View the [compose](https://github.com/A11yWatch/a11ywatch/blob/master/docker-compose.yml) file to see the micro services used.

## Development

Some things to note in development.

### Creating new Pages

This app uses a meta like way to enhance the build step with auto generated html from the page components.
Some of the enhancements require a certain format for Page naming and exports to build the pages correctly.
The default export component in the `./pages` directory needs to match the route or naming of the file as camel-case.

## Environment

check out [ENVIRONMENT CONFIG](./ENVIRONMENT.md) for configuring project specefics like google authentication.

## Translations

At the moment all text is supported for english-en. Help contribute to the [translations](https://github.com/A11yWatch/web/tree/main/src/content/strings/a11y) by sending a [PR](https://github.com/A11yWatch/web/compare).

## LICENSE

check the license file in the root of the project.

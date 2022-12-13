# a11ywatch-web

[![A11yWatch](https://circleci.com/gh/a11ywatch/web.svg?style=svg)](https://circleci.com/gh/a11ywatch/web)
[![codecov](https://codecov.io/gh/a11ywatch/web/branch/main/graph/badge.svg?token=0LZKQ2H848)](https://codecov.io/gh/a11ywatch/web)
<!-- [![A11yWatch status](https://api.a11ywatch.com/status/a11ywatch.com?style=svg)](https://a11ywatch.com/reports/a11ywatch.com) -->

a11ywatch website

## Installation

Make sure Rust is installed if you want to build the wasm bundle for the web or Desktop application.

`curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh`

Install the dev modules normally with yarn.

`yarn`

### Desktop Install

You can also install the desktop application by using [tauri](https://tauri.app/v1/guides/getting-started/prerequisites) and running the following:

Install the [tauri-cli](https://tauri.app/v1/api/cli/) with:

`cargo install tauri-cli`

## Start Web or Desktop

You can start the project using docker or local

`docker-compose up` or `yarn run dev`

open [localhost:3000](http://localhost:3000) in your browser.

or run the desktop application

`cargo tauri dev`.

## API

In order to use the application you need to make sure you have the [A11yWatch](https://github.com/A11yWatch/a11ywatch) system running locally. View the [compose](https://github.com/A11yWatch/a11ywatch/blob/master/docker-compose.yml) file to see the micro services used.

## Development

Some things to note in development.

### Creating Pages

This app uses a meta like way to enhance the build step with auto generated html from the page components.
Some of the enhancements require a certain format for Page naming and exports to build the pages correctly.
The default export component in the `./pages` directory needs to match the route or naming of the file as camel-case.

## Environment

check out [ENVIRONMENT CONFIG](https://docs.a11ywatch.com/documentation/web/#environmental-configuration) for configuring project specefics like google authentication.

## Translations

At the moment all text is supported for english-en. Help contribute to the [translations](https://github.com/A11yWatch/web/tree/main/src/content/strings/a11y) by sending a [PR](https://github.com/A11yWatch/web/compare).

## LICENSE

check the license file in the root of the project.

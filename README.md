# a11ywatch-web

[![A11yWatch](https://circleci.com/gh/A11yWatch/web.svg?style=svg)](https://circleci.com/gh/A11yWatch/web)[![Maintainability](https://api.codeclimate.com/v1/badges/702d7d7ce56b7e28bcf4/maintainability)](https://codeclimate.com/github/A11yWatch/web/maintainability)[![codecov](https://codecov.io/gh/A11yWatch/web/branch/main/graph/badge.svg?token=0LZKQ2H848)](https://codecov.io/gh/A11yWatch/web)

a11ywatch web application built using next.js

## Installation

```
npm i
```

## Start

You can start the project using docker or local

`docker-compose up` or `npm run dev`

open [localhost:3000](http://localhost:3000) in your browser.

## API

In order to use the application you need to make sure you have the [A11yWatch](https://github.com/A11yWatch/a11ywatch) system running locally. This central project starts
all the services needed for the project. View the [compose](https://github.com/A11yWatch/a11ywatch/blob/master/docker-compose.yml) file to see the micro services used.

## Environment

check out [ENVIRONMENT CONFIG](./ENVIRONMENT.md) for configuring project specefics like google authentication.

## LICENSE

check the license file in the root of the project.

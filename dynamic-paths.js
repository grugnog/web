/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
const { resolve } = require('path')

const A11YWATCH_PATH = '@a11ywatch/ui'

const getDynamicPaths = ({ themeType }) => ({
  uiStylePath: resolve(__dirname, `${A11YWATCH_PATH}/css/tailwind.css`),
  uiComponentPath: resolve(__dirname, `${A11YWATCH_PATH}/${themeType}`),
})

module.exports = {
  getDynamicPaths,
}

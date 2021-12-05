/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
const sitemap = require('nextjs-sitemap-generator')
const config = require('./sitemap-config')

async function generateSiteMap(extra) {
  try {
    return await sitemap({
      ...config,
      ...extra,
      ignoredPaths: [...config.ignoredPaths],
    })
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  generateSiteMap,
}

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { IFRAME_ENDPOINT } from '../configs/next/iframe'

export const iframe = async (
  url: string,
  baseHref: string | string[] | true
) => {
  if (/^((http|https):\/\/)/.test(url) === false) {
    url = `http://${url}`
  }

  const path = `${IFRAME_ENDPOINT}/iframe?url=${encodeURI(url)}&baseHref=${
    baseHref || true
  }`

  try {
    const data = await fetch(path)
    const iframe = await data.text()

    return iframe
  } catch (e) {
    console.error(e)
    return ''
  }
}

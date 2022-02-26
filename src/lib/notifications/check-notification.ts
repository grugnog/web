/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export function checkNotification(): boolean {
  return (
    typeof window !== 'undefined' &&
    'Notification' in window &&
    Notification.permission === 'granted'
  )
}

export function enableNotifications():
  | Promise<NotificationPermission>
  | boolean {
  try {
    if (!checkNotification()) {
      return Notification.requestPermission()
    }
    return false
  } catch (e) {
    console.error(e)
    return false
  }
}

export function sendNotification(url: string, issueCount: number = 0) {
  if (checkNotification()) {
    const isS = issueCount === 1 ? '' : 's'
    const body = `${issueCount} new issue${isS} occured for ${url}`
    const notification = new Notification(`New issue${isS} arised`, {
      body,
      icon: '/img/favicon.png',
    })

    setTimeout(notification.close.bind(notification), 4000)
  }
}

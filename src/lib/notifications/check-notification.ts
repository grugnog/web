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

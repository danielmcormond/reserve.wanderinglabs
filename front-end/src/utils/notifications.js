export const allowsNotifications = () => {
  if (!('indexedDB' in window)) {
    return false
  }

  if (!window.isSecureContext) {
    return false
  }

  if (!('serviceWorker' in navigator)) {
    return false
  }

  if (!('PushManager' in window)) {
    return false
  }

  return true
}

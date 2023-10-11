function getLocalStorageItem(key: string) {
  return window.localStorage.getItem(key)
}

export { getLocalStorageItem }
const STORAGE_NAME = 'pietroStorageData'

export const readStorage = () => {
  try {
    const storage = localStorage.getItem(STORAGE_NAME)
    return JSON.parse(storage)
  } catch(err) {
    return null
  }
}

export const saveStorage = data => {
  localStorage.setItem(STORAGE_NAME, JSON.stringify(data))
}
export const UPDATE_TITLE = 'UPDATE_TITLE'
export const updateTitle = title => ({
  type: UPDATE_TITLE,
  title,
})

export const UPDATE_AUTHOR = 'UPDATE_AUTHOR'
export const updateAuthor = author => ({
  type: UPDATE_AUTHOR,
  author,
})

export const UPDATE_TOWN = 'UPDATE_TOWN'
export const updateTown = town => ({
  type: UPDATE_TOWN,
  town,
})

export const UPDATE_AUTHOR_INFO = 'UPDATE_AUTHOR_INFO'
export const updateAuthorInfo = info => ({
  type: UPDATE_TOWN,
  ...info,
})

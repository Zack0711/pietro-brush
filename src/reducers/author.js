import {
  UPDATE_TITLE,
  UPDATE_AUTHOR,
  UPDATE_TOWN,
  UPDATE_AUTHOR_INFO,
} from '../actions'

export const DEFAULT_STATE = {
  title: 'Magic Pattern',
  author: 'Pietro',
  town: 'Riku',
}

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case UPDATE_TITLE:
      return {
        ...state,
        title: action.title,
      }

    case UPDATE_AUTHOR:
      return {
        ...state,
        author: action.author,
      }

    case UPDATE_TOWN:
      return {
        ...state,
        town: action.town,
      }

    case UPDATE_AUTHOR_INFO:
      return {
        ...state,
        ...action.info,
      }

    default:
      return state
  }
}

import {
  UPDATE_PATTERNS,
} from '../actions'

export const DEFAULT_STATE = {
  patterns: [],
}

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case UPDATE_PATTERNS:
      return {
        ...state,
        patterns: action.patterns,
      }

    default:
      return state
  }
}

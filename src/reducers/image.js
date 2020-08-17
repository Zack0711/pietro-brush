import {
  UPDATE_PATTERN,
  UPDATE_PALETTE,
  UPDATE_ACTIVE_INDEX,
  UPDATE_DATA_AND_LIST,
  UPDATE_TITLE,
  UPDATE_AUTHOR,
  UPDATE_TOWN,
} from '../actions'

import { genArray } from '../utils/tools'

const DEFAULT_STATE = {
  activeIndex: 0,
  title: '',
  author: '',
  town: '',
  list: [0],
  data: {
    0: {
      x: 0,
      y: 0,
      pattern: genArray(1024),
      palette: [17,26,35,44,53,62,71,80,89,98,107,116,125,134,142],
    },
  }
}

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case UPDATE_PATTERN:
      return {
        ...state,
        data: {
          ...state.data,
          [state.activeIndex]: {
            ...state.data[state.activeIndex],
            pattern: [...action.pattern],
          }
        },
      }

    case UPDATE_PALETTE: 
      const palette = [...state.data[state.activeIndex].palette]
      const { paletteIndex, colorIndex } = action

      const currentPaletteIndex = palette.indexOf(colorIndex)

      if (currentPaletteIndex > -1 && currentPaletteIndex !== paletteIndex) {
        palette[currentPaletteIndex] = palette[paletteIndex]
      }
      palette[paletteIndex] = colorIndex

      return {
        ...state,
        data: {
          ...state.data,
          [state.activeIndex]: {
            ...state.data[state.activeIndex],
            palette,
          }
        },
      }

    case UPDATE_ACTIVE_INDEX:
      return {
        ...state,
        activeIndex: action.index
      }

    case UPDATE_DATA_AND_LIST:
      const {
        data,
        list,
      } = action

      return {
        ...state,
        activeIndex: -1,
        list,
        data,  
      }

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

    default:
      return state
  }
}

import {
  UPDATE_PATTERN,
  UPDATE_PALETTE,
  UPDATE_COLOR_SERIE_PALETTE,
  UPDATE_ACTIVE_INDEX,
  UPDATE_DATA_AND_LIST,
  UPDATE_IMAGE_STATE,
  UPDATE_STEP,
} from '../actions'

import { readStorage, saveStorage } from '../utils/storage'

const DEFAULT_STATE = {
  activeIndex: -1,
  col: 1,
  row: 1,
  zoom: 4,
  list: [],
  data: {},
  listUpdateBy: '',
  step: -1,
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

      /*
      const currentPaletteIndex = palette.indexOf(colorIndex)
      if (currentPaletteIndex > -1 && currentPaletteIndex !== paletteIndex) {
        palette[currentPaletteIndex] = palette[paletteIndex]
      }
      */
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

    case UPDATE_COLOR_SERIE_PALETTE:
      const newPalette = [...action.colorSerie, ...state.data[state.activeIndex].palette.slice(9)]
      console.log(newPalette)

      return {
        ...state,
        data: {
          ...state.data,
          [state.activeIndex]: {
            ...state.data[state.activeIndex],
            palette: newPalette,
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
        row,
        col,
      } = action

      return {
        ...state,
        activeIndex: 0,
        list,
        data,
        row,
        col,
        zoom: 4 / ( row > col ? row : col )
      }

    case UPDATE_IMAGE_STATE:
      return {
        ...state,
        ...action.state,
      }

    case UPDATE_STEP:
      return {
        ...state,
        step: action.step,
      }

    default:
      return state
  }
}

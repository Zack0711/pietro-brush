import {
  STORE_PIXEL,
  UPDATE_PALETTE_COLOR_INDEX,
} from '../actions'

export const DEFAULT_STATE = {
  pixelsArray: new Array(1024),
  palette: [16,24,32,40,48,56,64,72,80,88,96,104,112,120,128,136]
}

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case STORE_PIXEL:
      const newPixelsArray = [...state.pixelsArray]
      newPixelsArray[action.index] = action.color
      return {
        ...state,
        pixelsArray: newPixelsArray,
      }

    case UPDATE_PALETTE_COLOR_INDEX: 
      const newPalette = [...state.palette]
      newPalette[action.index] = action.colorIndex
      return {
        ...state,
        palette: newPalette,
      }

    default:
      return state
  }
}

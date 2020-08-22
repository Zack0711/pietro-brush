import { getActivePalette } from '../selectors/image'

export const UPDATE_PATTERN = 'UPDATE_PATTERN'
export const updatePattern = pattern => ({
  type: UPDATE_PATTERN,
  pattern,
})

export const UPDATE_PALETTE = 'UPDATE_PALETTE'
export const updatePalette = (paletteIndex, colorIndex) => ({
  type: UPDATE_PALETTE,
  paletteIndex,
  colorIndex,
})

export const UPDATE_ACTIVE_INDEX = 'UPDATE_ACTIVE_INDEX'
export const updateActiveIndex = (index) => ({
  type: UPDATE_ACTIVE_INDEX,
  index,
})

export const UPDATE_DATA_AND_LIST = 'UPDATE_DATA_AND_LIST'
export const updateDataAndList = (list, data, row, col) => ({
  type: UPDATE_DATA_AND_LIST,
  list,
  data,
  row, 
  col
})

export const UPDATE_IMAGE_STATE = 'UPDATE_IMAGE_STATE'
export const updateImageState = state => ({
  type: UPDATE_IMAGE_STATE,
  state,
})

export const UPDATE_STEP = 'UPDATE_STEP'
export const updateStep = step => ({
  type: UPDATE_STEP,
  step,
})

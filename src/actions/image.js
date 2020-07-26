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
export const updateDataAndList = (list, data) => ({
  type: UPDATE_DATA_AND_LIST,
  list,
  data,
})
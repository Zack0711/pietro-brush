
export const STORE_PIXEL = 'STORE_PIXEL'
export const storePixel = (index, color) => ({
  type: STORE_PIXEL,
  index,
  color,
})

export const UPDATE_PALETTE_COLOR_INDEX = 'UPDATE_PALETTE_COLOR_INDEX'
export const updatePaletteColorIndex = (index, colorIndex) => ({
  type: UPDATE_PALETTE_COLOR_INDEX,
  colorIndex,
  index,
})
import get from 'lodash-es/get'

export const getPalette = state =>
  get(state, 'pixel.palette')

export const getPixelsArray = state =>
  get(state, 'pixel.pixelsArray')
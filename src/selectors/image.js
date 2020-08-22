import get from 'lodash-es/get'

export const getImageList = state =>
  get(state, 'image.list')

export const getImageData = state =>
  get(state, 'image.data')

export const getActiveIndex = state =>
  get(state, 'image.activeIndex')

export const getActiveData = state => {
  const activeIndex = getActiveIndex(state)
  return get(state, `image.data.${activeIndex}`)
}

export const getActivePalette = state => {
  const activeIndex = getActiveIndex(state)
  return get(state, `image.data.${activeIndex}.palette`)
}

export const getActivePattern = state => {
  const activeIndex = getActiveIndex(state)
  return get(state, `image.data.${activeIndex}.pattern`)
}

export const getZoom = state => get(state, `image.zoom`)

export const getStep = state => get(state, `image.step`)

export const getListUpdateBy = state => get(state, 'image.listUpdateBy')

export const getColAndRow = state => ({
  col: get(state, `image.col`),
  row: get(state, `image.row`),
})

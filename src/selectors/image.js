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

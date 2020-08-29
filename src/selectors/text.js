import get from 'lodash-es/get'

export const getPatterns = state =>
  get(state, 'text.patterns', [])

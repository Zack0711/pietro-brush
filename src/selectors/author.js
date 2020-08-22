import get from 'lodash-es/get'

export const getTitle = state => get(state, `author.title`)

export const getAuthor = state => get(state, `author.author`)

export const getTown = state => get(state, `author.town`)

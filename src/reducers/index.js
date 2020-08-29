import { combineReducers } from 'redux'

import author from './author'
import image from './image'
import text from './text'

const rootReducer = combineReducers({
  author,
  image,
  text,
})

export default rootReducer

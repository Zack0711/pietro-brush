import { combineReducers } from 'redux'

import author from './author'
import image from './image'

const rootReducer = combineReducers({
  author,
  image,
})

export default rootReducer

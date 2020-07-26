import { combineReducers } from 'redux'

import pixel from './pixel'
import image from './image'

const rootReducer = combineReducers({
  pixel,
  image,
})

export default rootReducer

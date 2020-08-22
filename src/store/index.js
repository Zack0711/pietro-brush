import { 
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import thunk from 'redux-thunk'
import identity from 'lodash-es/identity'
import rootReducer from '../reducers'

import { saveStorage } from '../utils/storage'

const storage = ({ getState }) => {
  return next => action => {
    const returnValue = next(action)
    //console.log('state after dispatch', getState(), action)
    if (action.type !== 'UPDATE_IMAGE_STATE' && action.type !== 'UPDATE_STEP' ) {
      saveStorage({...getState().image})
    }
    return returnValue
  }
}


//const middleware = applyMiddleware(thunk)
const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(thunk),
    applyMiddleware(storage),
    process.env.NODE_ENV !== 'production' && global.window.__REDUX_DEVTOOLS_EXTENSION__
      ? global.window.__REDUX_DEVTOOLS_EXTENSION__()
      : identity
  )
)


export default store

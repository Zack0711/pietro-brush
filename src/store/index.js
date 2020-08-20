import { 
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import thunk from 'redux-thunk'
import identity from 'lodash-es/identity'
import rootReducer from '../reducers'

import { saveStorage } from '../utils/storage'

const logger = ({ getState }) => {
  return next => action => {
    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)
    console.log('state after dispatch', getState())
    saveStorage(getState().image)

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}


//const middleware = applyMiddleware(thunk)
const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(logger),
    applyMiddleware(thunk),
    process.env.NODE_ENV !== 'production' && global.window.__REDUX_DEVTOOLS_EXTENSION__
      ? global.window.__REDUX_DEVTOOLS_EXTENSION__()
      : identity
  )
)


export default store

import { 
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import thunk from 'redux-thunk'
import identity from 'lodash-es/identity'
import rootReducer from '../reducers'

const middleware = applyMiddleware(thunk)
const store = createStore(
  rootReducer,
  {},
  compose(
    middleware,
    process.env.NODE_ENV !== 'production' && global.window.__REDUX_DEVTOOLS_EXTENSION__
      ? global.window.__REDUX_DEVTOOLS_EXTENSION__()
      : identity
  )
)


export default store

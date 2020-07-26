import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import {
  Router,
  Redirect,
  createHistory,
  LocationProvider,
} from '@reach/router'

import "@babel/polyfill";
import './reset.css'

import ImageInput from './src/components/image-input'
import Painter from './src/components/painter'
import Editor from './src/components/editor'

import store from './src/store'

const history = createHistory(window)

const App = () => {
  return (
    <Provider store={store}>
      <Editor />
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

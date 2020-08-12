import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'

import {
  Router,
  Redirect,
  createHistory,
  LocationProvider,
} from '@reach/router'

import "core-js/stable"
import "regenerator-runtime/runtime"

import './reset.css'

import Editor from './src/components/editor'

import store from './src/store'
import theme from './src/theme'

const history = createHistory(window)

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Editor />
      </ThemeProvider>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

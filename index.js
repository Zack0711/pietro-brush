import React from 'react'
import ReactDOM from 'react-dom'
import {
  Router,
  Redirect,
  createHistory,
  LocationProvider,
} from '@reach/router'

import "@babel/polyfill";

import ImageInput from './src/components/image-input'

const history = createHistory(window)

const App = () => {
  return (
    <>
      <ImageInput />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

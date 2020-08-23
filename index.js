import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/apm';

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

Sentry.init({
  dsn: "https://d45502e3d91647baaf14421f64fc61f1@o437865.ingest.sentry.io/5400910",
  integrations: [
    new Integrations.Tracing(),
  ],
  tracesSampleRate: 1.0,
});

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

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/apm';

import "core-js/stable"
import "regenerator-runtime/runtime"

import './reset.css'

import Editor from './components/editor'

import store from './store'
import theme from './theme'

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

import isEqual from 'lodash-es/isEqual'
import * as Sentry from '@sentry/react';

import store from '../store'
import { updateStep, updateImageState } from '../actions/image'
import { genArray } from '../utils/tools'

const STORAGE_NAME = 'pietroStorageData'
const DEFAULT_STATE = {
  activeIndex: 0,
  list: [0],
  data: {
    0: {
      palette: [17, 26, 35, 44, 53, 62, 71, 80, 89, 98, 107, 116, 125, 134, 142],
      pattern: genArray(1024),
      x: 0,
      y: 0,
      zoom: 4,
    }
  }
}

let steps = []
let currentStep = -1

const keyCheck = ['palette', 'pattern', 'x', 'y', 'zoom']

export const readStorage = () => {
  let state
  let storage
  let parseError = false
  try {
    storage = localStorage.getItem(STORAGE_NAME)
    state = JSON.parse(storage)
    state.list.forEach( d => {
      const listData = state.data[d]
      keyCheck.forEach( key => {
        if(!listData.hasOwnProperty(key)) {
          throw Error(`missing key: ${key}`)
        }
      })
    })
  } catch(err) {
    Sentry.captureException(err)
    console.log(err)
    parseError = true
  }

  if ( !storage || parseError) {
    storage = JSON.stringify(DEFAULT_STATE)
    state = DEFAULT_STATE
    localStorage.setItem(STORAGE_NAME, storage)    
  }

  steps = [storage]
  currentStep = 0
  state['step'] = 0
  return state
}

export const saveStorage = data => {
  delete data.step
  const storageString = JSON.stringify(data)
  if (storageString !== steps[currentStep]) {
    localStorage.setItem(STORAGE_NAME, storageString)
    steps.push(storageString)
    currentStep += 1
    store.dispatch(updateStep(currentStep))
  }
}

export const backToPreviousStorage = () => {
  if (currentStep > 0) {
    currentStep -= 1
    const prevState = steps[currentStep]
    localStorage.setItem(STORAGE_NAME, prevState)
    store.dispatch(updateImageState({
      ...JSON.parse(prevState),
      step: currentStep,
    }))
    steps.pop()
  }
}
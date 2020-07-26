import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ImageConverter from '../image-converter'
import Previewer from '../previewer'
import Painter from '../painter'

import './index.styl'

const Editor = props => {
  const dispatch = useDispatch()

  useEffect(() => {
  },[])

  return (
    <div className="editor">
      <ImageConverter />
      <Previewer />
      <Painter />
    </div>
  )
}

Editor.propTypes = {}

export default Editor
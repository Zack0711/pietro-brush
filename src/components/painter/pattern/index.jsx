import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { colors } from '../../../utils/color'

import './index.styl'

const Pattern = ({ zoom, hoverCallBack, showPreview }) => {
  const canvasRef = useRef(null)
  const previewRef = useRef(null)

  const handleMouseOver = () => {
  }

  const handleMouseOut = () => {
  }

  useEffect(() => {
    if(canvasRef.current && previewRef.current) {
      hoverCallBack(canvasRef, previewRef)
    }
  },[canvasRef, previewRef])

  return (
    <div className="pattern">
      <canvas 
        ref={canvasRef} 
        width={32 * zoom}
        height={32 * zoom}
      />
      <canvas 
        ref={previewRef} 
        className={classNames('pattern__preview', {'pattern__preview--hide': !showPreview })}
        width={32 * zoom}
        height={32 * zoom}
      />
    </div>
  )
}

Pattern.propTypes = {}

export default Pattern
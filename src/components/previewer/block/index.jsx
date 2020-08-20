import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {
  updateActiveIndex,
} from '../../../actions/image'

import { 
  getActiveIndex,
  getZoom,
} from '../../../selectors/image'

import { colors } from '../../../utils/color'

import './index.styl'

const Block = ({index, data}) => {
  const dispatch = useDispatch()
  const canvasRef = useRef(null)

  const activeIndex = useSelector(getActiveIndex)
  const zoom = useSelector(getZoom)

  const renderCanvas = () => {
    const ctx = canvasRef.current.getContext('2d')
    const { palette, pattern } = data

    pattern.forEach( (d, i) => {
      const x = i % 32
      const y = Math.floor( i / 32)
      const colorIndex = palette[d]

      if (d > -1 && colorIndex > -1) {
        ctx.fillStyle = colors[colorIndex][0]
        ctx.fillRect(x*zoom, y*zoom, zoom, zoom)
      } else {
        ctx.clearRect (x*zoom, y*zoom, zoom, zoom)
      }
    })      
  }  

  useEffect(() => {
    renderCanvas()
  }, [data])

  return (
    <div 
      className={classNames('block', {
        'block--active': index === activeIndex,
      })}
      onClick={() => dispatch(updateActiveIndex(index))}
    >
      <canvas 
        ref={canvasRef} 
        width={32 * zoom}
        height={32 * zoom}
      />
    </div>
  )
}

Block.propTypes = {}

export default Block
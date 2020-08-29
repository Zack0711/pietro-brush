import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { colors } from '../../utils/color'

import { 
  drawTextPattern,
  genArray,
} from '../../utils/tools'

import './index.styl'

const TextPattern = ({ pattern, size = 32, className }) => {
  const canvasRef = useRef(null)
  const palette = [14, 12, 10, 8]

  const renderCanvas = () => {
    const ctx = canvasRef.current.getContext('2d')
    const canvasPattern = genArray(1024)

    drawTextPattern({
      x: 16,
      y: 16,
      callback: (x, y, index) => {
        const pixelIndex = x + y * 32
        canvasPattern[pixelIndex] = index
      },
      pattern: pattern,
    })

    canvasPattern.forEach( (d, i) => {
      const x = i % 32
      const y = Math.floor( i / 32)
      const colorIndex = palette[d]
      if (d > -1 && colorIndex > -1) {
        ctx.fillStyle = colors[colorIndex][0]
        ctx.fillRect(x, y, 1, 1)
      } else {
        ctx.clearRect (x, y, 1, 1)
      }
    })      
  }

  useEffect(() => {
    if(pattern && pattern.length > 0) {
      renderCanvas()
    }
  }, [pattern])

  return (
    <div className={classNames('text-pattern', className)}>
      <canvas 
        ref={canvasRef} 
        width={32}
        height={32}
      />
    </div>
  )
}

TextPattern.propTypes = {}

export default TextPattern

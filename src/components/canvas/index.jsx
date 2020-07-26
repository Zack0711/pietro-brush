import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Canvas = ({imgData, width, height, className}) => {
  const canvasRef = useRef(null)
  useEffect(() => {
    if(imgData) {
      const ctx = canvasRef.current.getContext('2d')
      ctx.putImageData(imgData, 0, 0)
    }
  },[imgData])
  return (
    <canvas 
      ref={canvasRef} 
      className={className}
      width={width} 
      height={height} 
    />
  )
}

Canvas.propTypes = {}

export default Canvas
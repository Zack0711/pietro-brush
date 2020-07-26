import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { rgb2hex } from '../../utils/color'

import Canvas from '../canvas'

import './index.styl'

const zoomImgData = (data, zoom = 8) => {
  let result = new Array()

  for(let i = 0; i < 32; i += 1) {
    let row = new Array()
    for (let j = 0; j < 32; j += 1) {
      const pixel = [...data[ i*32 + j], 255]
      for (let k = 0; k < zoom; k += 1) {
        //row.push(pixel)
        row = row.concat(pixel)
      }
    }

    for (let l = 0; l < zoom; l += 1) {
      result = result.concat(row)
    }
  }

  return result
}

const IMAGE_WIDTH = 32
const IMAGE_HEIGHT = 32

const CanvasBlock = ({palette, bytesData, zoom = 1}) => {
  const [imgData, setImgData] = useState(null)

  const drawImg = () => {
    const zoomImgDataArray = new Uint8ClampedArray(zoomImgData(bytesData, zoom))
    const imgData = new ImageData( zoomImgDataArray, IMAGE_WIDTH*zoom, IMAGE_HEIGHT*zoom)
    setImgData(imgData)
  }

  useEffect(() => {
    if(palette.length > 0 && bytesData.length > 0) {
      drawImg()
    }
  },[palette, bytesData])

  return (
    <div>
      <div className="palette">
        {
          palette.map( d => (
            <div className="palette__block" style={{ background: rgb2hex(d)}}/>
          ))
        }
      </div>
      <Canvas width={IMAGE_WIDTH*zoom} height={IMAGE_HEIGHT*zoom} imgData={imgData} />
    </div>
  )
}

CanvasBlock.propTypes = {}

export default CanvasBlock

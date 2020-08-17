import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import DynamicFeedIcon from '@material-ui/icons/DynamicFeed'

import { makeQrContents } from '../../utils/qrcode'
import qrcodegen from '../../utils/qrcodegen'

import { 
  colors,
  hex2rgb,
} from '../../utils/color'

import {
  updateTitle,
  updateAuthor,
  updateTown,
} from '../../actions/image'

import { 
  getActiveIndex,
  getActivePalette,
  getActivePattern,
  getTitle,
  getAuthor,
  getTown,
} from '../../selectors/image'

import './index.styl'

const ZOOM = 4

const QrCode = qrcodegen.QrCode

const QrGenerator = ({onClose}) => {
  const dispatch = useDispatch()

  const palette = useSelector(getActivePalette)
  const pattern = useSelector(getActivePattern)
  const activeIndex = useSelector(getActiveIndex)
  const title = useSelector(getTitle)
  const author = useSelector(getAuthor)
  const town = useSelector(getTown)

  const canvasRef = useRef(null)
  const qrRef = useRef(null)

  const renderCanvas = () => {
    const ctx = canvasRef.current.getContext('2d')
    pattern.forEach( (d, i) => {
      const x = i % 32
      const y = Math.floor( i / 32)
      const colorIndex = palette[d]

      if (d > -1 && colorIndex > -1) {
        ctx.fillStyle = colors[colorIndex][0]
        ctx.fillRect(x*ZOOM, y*ZOOM, ZOOM, ZOOM)
      } else {
        ctx.clearRect (x*ZOOM, y*ZOOM, ZOOM, ZOOM)
      }
    })      
  }

  const handleQRGenerate = () => {
    const acPalette = new Array()
    let acPattern = new Array()

    palette.forEach( d => {
      const colorHex = hex2rgb(colors[d][0])
      acPalette.push([...colorHex, 255])
    })

    pattern.forEach( d => { 
      acPattern = acPattern.concat(acPalette[d] ? acPalette[d] : [0, 0, 0, 0]) 
    })

    console.log(acPattern)
    const imageData = new ImageData( new Uint8ClampedArray(acPattern), 32, 32)
    console.log(imageData)

    const bytes = makeQrContents({
      title: 'Test Pattern',
      author: 'Zack',
      town: 'Liku',
      imageData,      
      palette: acPalette, 
    })
    const qr = QrCode.encodeSegments([qrcodegen.QrSegment.makeBytes(bytes)], QrCode.Ecc.MEDIUM, 19, 19)
    qr.drawCanvas(2, 2, qrRef.current)

    console.log(palette)
    console.log(acPattern, acPalette, pattern)
    console.log('handleQRGenerate')
  }

  useEffect(() => {
    if(activeIndex > -1 && pattern && palette) {
      renderCanvas()
    }
  }, [pattern, palette])

  return (
    <div className="qr-generator">
      <div className="qr-generator--block">
        <canvas 
          ref={canvasRef} 
          width={32 * ZOOM}
          height={32 * ZOOM}
        />
      </div>
      <Button onClick={handleQRGenerate}>
        <DynamicFeedIcon />
        Generate QR Code
      </Button>
      <Button onClick={onClose}>
        Contiune Edit
      </Button>
      <div className="qr-generator--qr-code">
        <canvas ref={qrRef} />
      </div>
    </div>
  )
}

QrGenerator.propTypes = {}

export default QrGenerator

import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { 
  rgb2hex, 
  colorsPalette,
  colors,
} from '../../utils/color'

import {
  readImage,
  loadImageData,
  downsampleImage,
  downsamplePixel,
  converImageData,
  convert2PaletteColor,
} from '../../utils/image'

import {
  makeQrContents
} from '../../utils/qrcode'

import qrcodegen from '../../utils/qrcodegen'

import CanvasBlock from '../canvas-block'

const QrCode = qrcodegen.QrCode

const IMAGE_WIDTH = 32
const IMAGE_HEIGHT = 32

import './index.styl'

const ImageInput = (props) => {
  const imageInputElRef = useRef(null)
  const imageElRef = useRef(null)
  const canvasQrRef = useRef(null)

  const [imgString, setImgString] = useState('')
  const [palette, setPalette] = useState([])
  const [acPalette, setACPalette] = useState([])

  const [bytesData, setBytesData] = useState([])
  const [acBytes, setACBytes] = useState([])
  const [convertedBytesData, setConvertedBytesData] = useState([])

  const handleImgSelect = async (e) => {
    const {
      base64String,
      palette,
      imageData,
    } = await loadImageData(imageInputElRef.current.files[0])

    const acPalette = convert2PaletteColor(palette, colorsPalette)

    setBytesData(converImageData(imageData, []))
    setConvertedBytesData(converImageData(imageData, palette))
    setACBytes(converImageData(imageData, acPalette))

    setImgString(base64String)
    setPalette(palette)
    setACPalette(acPalette)
  }

  const handleQRClick = () => {
    const dataArray = new Array()
    acBytes.forEach( bytes => {
      bytes.forEach( d => dataArray.push(d))
      dataArray.push(255)
    })


    const imgDataArray = new Uint8ClampedArray(dataArray)
    const imgData = new ImageData( imgDataArray, IMAGE_WIDTH, IMAGE_HEIGHT)

    let bytes = makeQrContents({
      title: 'Test Pattern',
      author: 'Zack',
      town: 'Liku',
      palette: acPalette, 
      imageData: imgData,      
    })

    const qr = QrCode.encodeSegments([qrcodegen.QrSegment.makeBytes(bytes)], QrCode.Ecc.MEDIUM, 19, 19)
    qr.drawCanvas(6, 2, canvasQrRef.current)
  }

  return (
    <div>
      <button onClick={handleQRClick}>QR Code</button>
      <div className="row">
        <div>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            ref={imageInputElRef}
            onChange={handleImgSelect}
          /><br/>
          <img className="input-img" ref={imageElRef} src={imgString} />
        </div>
        <CanvasBlock palette={palette} bytesData={bytesData} zoom={8} />
        <CanvasBlock palette={palette} bytesData={convertedBytesData} zoom={8} />
        <CanvasBlock palette={acPalette} bytesData={acBytes} zoom={8} />
      </div>
      <canvas ref={canvasQrRef} />
    </div>
  )
}

ImageInput.propTypes = {}

export default ImageInput

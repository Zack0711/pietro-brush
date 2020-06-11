import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.styl'

const readImage = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    resolve(e.target.result)
  }
  reader.readAsDataURL(file)
})

const ImageInput = (props) => {
  const imageInputElRef = useRef(null)

  const imageElRef = useRef(null)
  const canvasElRef = useRef(null)

  const [imgString, setImgString] = useState('')

  const handleImgSelect = async (e) => {
    const base64String = await readImage(imageInputElRef.current.files[0])
    setImgString(base64String)

    const ctx = canvasElRef.current.getContext('2d')
    const img = new Image()

    img.onload = () => {
      const {
        width,
        height
      } = img

      const imgWidth = width > height ? height : width
      ctx.drawImage(img, 0, 0, imgWidth, imgWidth, 0, 0, 64, 64)
      console.log(ctx.getImageData(0, 0, 64, 64))
    }

    img.src = base64String
    console.log(ctx)
  }

  return (
    <div>
      <div>
        <input
          name="broadcastImg"
          type="file"
          accept=".jpg,.jpeg,.png"
          ref={imageInputElRef}
          onChange={handleImgSelect}
        />
      </div>
      <img ref={imageElRef} src={imgString} />
      <canvas width="64" height="64" ref={canvasElRef} />
    </div>
  )
}

ImageInput.propTypes = {}

export default ImageInput

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
  const [imgString, setImgString] = useState('')

  const handleImgSelect = async (e) => {
    const base64String = await readImage(imageInputElRef.current.files[0])
    setImgString(base64String)
    //console.log(base64String)
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
      {
        imgString && (
          <img src={imgString} />
        )
      }
    </div>
  )
}

ImageInput.propTypes = {}

export default ImageInput

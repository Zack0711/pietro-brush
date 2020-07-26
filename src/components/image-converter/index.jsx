import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

import Button from '@material-ui/core/Button'

import InputIcon from '@material-ui/icons/Input'
import ImageIcon from '@material-ui/icons/Image'

import { updateDataAndList } from '../../actions'

import { 
  colorsPalette,
} from '../../utils/color'

import {
  loadImage,
  imageQuantize,
} from '../../utils/image'

import './index.styl'

const ImageConverter = props => {
  const dispatch = useDispatch()

  const inputElRef = useRef(null)
  const imageElRef = useRef(null)
  const cropperRef = useRef(null)

  const [imgObj, setImgObj] = useState(null)
  const [imgSize, setImgSize] = useState({ width: 100, height: 100})

  const handleImgSelect = async (e) => {
    const img = await loadImage(inputElRef.current.files[0])
    setImgObj(img)
  }

  const converImg = async (e) => {
    const {
      list,
      data,
    } = imageQuantize(cropperRef.current.getCroppedCanvas(), 2, 2)
    dispatch(updateDataAndList(list, data))
  }

  useEffect(() => {
    if(imgObj){
      if (cropperRef.current) {
        cropperRef.current.destroy()
        cropperRef.current = null
      }

      cropperRef.current = new Cropper(imageElRef.current, {
        aspectRatio: 2 / 2,
        viewMode: 1,
      })
    }
  },[imgObj])

  return (
    <div className="image-converter">
      <div className="image-converter__preview">
        <img className="image-converter__input-img" ref={imageElRef} src={imgObj && imgObj.src} />
      </div>
      <div className="image-converter__tool">
        <label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            className="image-converter__select-input"
            ref={inputElRef}
            onChange={handleImgSelect}
          />
          <ImageIcon />
        </label>
        <Button onClick={converImg}>
          <InputIcon />
        </Button>
      </div>
    </div>
  )
}

ImageConverter.propTypes = {}

export default ImageConverter
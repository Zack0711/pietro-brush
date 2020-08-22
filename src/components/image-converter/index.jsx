import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import CloseIcon from '@material-ui/icons/Close'

import { IconFont } from '../icons'

import { updateDataAndList, updateActiveIndex } from '../../actions'

import { 
  colorsPalette,
} from '../../utils/color'

import {
  loadImage,
  imageQuantize,
} from '../../utils/image'

import './index.styl'

const ImageConverter = ({onClose}) => {
  const dispatch = useDispatch()

  const inputElRef = useRef(null)
  const imageElRef = useRef(null)
  const cropperRef = useRef(null)

  const [imgObj, setImgObj] = useState(null)
  const [imgSize, setImgSize] = useState({ width: 100, height: 100})
  const [col, setCol] = useState(2)
  const [row, setRow] = useState(2)

  const handleImgSelect = async (e) => {
    const img = await loadImage(inputElRef.current.files[0])
    setImgObj(img)
  }

  const converImg = async (e) => {
    const {
      list,
      data,
    } = imageQuantize(cropperRef.current.getCroppedCanvas(), row, col)
    dispatch(updateDataAndList(list, data, row, col))
    onClose()
  }

  const setImgCropper = () => {
    if (cropperRef.current) {
      cropperRef.current.destroy()
      cropperRef.current = null
    }

    cropperRef.current = new Cropper(imageElRef.current, {
      aspectRatio: col / row,
      viewMode: 1,
    })    
  }

  useEffect(() => {
    if(imgObj){
      setImgCropper()
    }
  },[imgObj])

  useEffect(() => {
    if(imgObj){
      setImgCropper()
    }
  },[col, row])

  return (
    <div className="image-converter">
      <div className="image-converter__header">
        匯入圖片進行裁切
        <IconButton 
          className="image-converter__close-btn"
          onClick={() => onClose()}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div className="image-converter__preview">
        <img className="image-converter__input-img" ref={imageElRef} src={imgObj && imgObj.src} />
      </div>
      <div className="image-converter__tool">
        <label className="image-converter__select-wrap">
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            className="image-converter__select-input"
            ref={inputElRef}
            onChange={handleImgSelect}
          />
          <IconFont style="folder" /> 匯入
        </label>
        <div className="image-converter__crop-count">
          塊數:  
          <Select
            labelId="col-select"
            value={row}
            onChange={(e) => setRow(e.target.value)}
            disabled={!imgObj}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </Select>
          x
          <Select
            labelId="row-select"
            value={col}
            onChange={(e) => setCol(e.target.value)}
            disabled={!imgObj}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </Select>
        </div>
        <Button onClick={converImg} disabled={!imgObj}>
          <IconFont style="crop" /> 裁切
        </Button>
      </div>
    </div>
  )
}

ImageConverter.propTypes = {}

export default ImageConverter
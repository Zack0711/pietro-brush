import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

import Button from '@material-ui/core/Button'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

import { IconFont } from '../icons'

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
    dispatch(updateDataAndList(list, data))
  }

  const setImgCropper = () => {
    if (cropperRef.current) {
      cropperRef.current.destroy()
      cropperRef.current = null
    }

    cropperRef.current = new Cropper(imageElRef.current, {
      aspectRatio: row / col,
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
      <div className="image-converter__tool">
        <label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            className="image-converter__select-input"
            ref={inputElRef}
            onChange={handleImgSelect}
          />
          <IconFont style="folder" />
        </label>
        <Button onClick={converImg}>
          <IconFont style="picture" />
        </Button>
        Col:  
        <Select
          labelId="col-select"
          value={col}
          onChange={(e) => setCol(e.target.value)}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
        Row: 
        <Select
          labelId="row-select"
          value={row}
          onChange={(e) => setRow(e.target.value)}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      </div>
      <div className="image-converter__preview">
        <img className="image-converter__input-img" ref={imageElRef} src={imgObj && imgObj.src} />
      </div>
    </div>
  )
}

ImageConverter.propTypes = {}

export default ImageConverter
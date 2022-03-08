import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'

import { IconFont } from '../icons'

import { makeQrContents } from '../../utils/qrcode'
import qrcodegen from '../../utils/qrcodegen'

import { 
  colors,
  hex2rgb,
} from '../../utils/color'

import {
  updateAuthorInfo,
} from '../../actions/author'

import { 
  getActiveIndex,
  getActivePalette,
  getActivePattern,
} from '../../selectors/image'

import { 
  getTitle,
  getAuthor,
  getTown,
} from '../../selectors/author'

import './index.styl'

const ZOOM = 4

const QrCode = qrcodegen.QrCode

const AuthorEditModal = React.forwardRef(({ author, title, onClose}, ref) => {
  const dispatch = useDispatch()

  const [inputTitle, setInputTitle] = useState('')
  const [inputAuthor, setInputAuthor] = useState('')

  const handleSave = () => {
    dispatch(updateAuthorInfo({title: inputTitle, author: inputAuthor}))
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  useEffect(() => {
    setInputTitle(title)
    setInputAuthor(author)
  },[])

  return(
    <div className="author-edit-modal" ref={ref}>
      <TextField 
        label="標題"
        value={inputTitle}
        className="author-edit-modal__input"
        onChange={e => setInputTitle(e.currentTarget.value)}
      />
      <TextField 
        label="作者"
        value={inputAuthor}
        onChange={e => setInputAuthor(e.currentTarget.value)}
        className="author-edit-modal__input"
      />
      <div className="author-edit-modal__tool">
        <Button onClick={handleSave}>
          儲存
        </Button>
        <Button onClick={handleCancel}>
          取消
        </Button>
      </div>
    </div>
  )
})

const QrGenerator = ({onClose}) => {
  const dispatch = useDispatch()

  const palette = useSelector(getActivePalette)
  const pattern = useSelector(getActivePattern)
  const activeIndex = useSelector(getActiveIndex)
  const title = useSelector(getTitle)
  const author = useSelector(getAuthor)
  const town = useSelector(getTown)

  const [authorEditModalOpen, setAuthorEditModalOpen] = useState(false)

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

    const imageData = new ImageData( new Uint8ClampedArray(acPattern), 32, 32)
    const bytes = makeQrContents({
      title,
      author,
      town,
      imageData,      
      palette: acPalette, 
    })
    const qr = QrCode.encodeSegments([qrcodegen.QrSegment.makeBytes(bytes)], QrCode.Ecc.MEDIUM, 19, 19)
    qr.drawCanvas(2, 2, qrRef.current)
  }

  const handleAuthorEditModalClose = () => {
    setAuthorEditModalOpen(false)
  }

  useEffect(() => {
    if(activeIndex > -1 && pattern && palette) {
      renderCanvas()
      handleQRGenerate()
    }
  }, [pattern, palette])

  useEffect(() => {
    if(activeIndex > -1 && pattern && palette) {
      handleQRGenerate()
    }
  }, [title, author])

  return (
    <div className="qr-generator">
      <div className="qr-generator__author-information">
        <div className="qr-generator__author-title">{title}</div>
        <div className="qr-generator__author-name">{author}</div>
        <Button 
          className="qr-generator__author-edit-btn"
          onClick={() => setAuthorEditModalOpen(true)}>
          <IconFont style="pen" />
        </Button>
      </div>
      <div className="qr-generator__block">
        <canvas 
          ref={canvasRef} 
          width={32 * ZOOM}
          height={32 * ZOOM}
        />
      </div>
      <div className="qr-generator__qr-code">
        <canvas ref={qrRef} />
      </div>
      <Button onClick={onClose}>
        關閉視窗
      </Button>
      <Modal
        open={authorEditModalOpen}
        onClose={handleAuthorEditModalClose}
        className="qr-generator__modal"
        keepMounted={true}
      >
        <AuthorEditModal
          author={author}
          title={title}
          onClose={handleAuthorEditModalClose}
        />
      </Modal>
    </div>
  )
}

QrGenerator.propTypes = {}

export default QrGenerator

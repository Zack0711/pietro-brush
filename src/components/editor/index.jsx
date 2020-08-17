import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'

import ImageConverter from '../image-converter'
import Previewer from '../previewer'
import Painter from '../painter'
import QrGenerator from '../qr-generator'

import './index.styl'

const Editor = props => {
  const dispatch = useDispatch()
  const [imgConverterOpen, setImgConverterOpen] = useState(false)
  const [qrGeneratorOpen, setQrGeneratorOpen] = useState(false)

  const handleImgConverterOpen = () => {
    setImgConverterOpen(true)
  }

  const handleImgConverterClose = () => {
    setImgConverterOpen(false)
  }

  const handleQrGeneratorOpen = () => {
    setQrGeneratorOpen(true)
  }

  const handleQrGeneratorClose = () => {
    setQrGeneratorOpen(false)
  }

  useEffect(() => {
  },[])

  return (
    <div className="editor">
      <Painter />
      <aside className="editor__aside">
        <Previewer />
        <div>
          <Button onClick={handleImgConverterOpen}>
            Import Image
          </Button>
          <Button onClick={handleQrGeneratorOpen}>
            QR code
          </Button>
        </div>
      </aside>
      <Modal
        open={imgConverterOpen}
        onClose={handleImgConverterClose}
        keepMounted={true}
      >
        <ImageConverter
          onClose={handleImgConverterClose}
        />
      </Modal>
      <Modal
        open={qrGeneratorOpen}
        onClose={handleQrGeneratorClose}
        keepMounted={true}
      >
        <QrGenerator
          onClose={handleQrGeneratorClose}
        />
      </Modal>
    </div>
  )
}

Editor.propTypes = {}

export default Editor
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'

import { updateImageState } from '../../actions/image'

import useScreen from '../../hooks/use-screen'
import { readStorage } from '../../utils/storage'

import ImageConverter from '../image-converter'
import Previewer from '../previewer'
import Painter from '../painter'
import QrGenerator from '../qr-generator'

import { IconFont } from '../icons'

import './index.styl'

const Editor = props => {
  const dispatch = useDispatch()
  const [imgConverterOpen, setImgConverterOpen] = useState(false)
  const [qrGeneratorOpen, setQrGeneratorOpen] = useState(false)

  const screen = useScreen()

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
    const state = readStorage()
    dispatch(updateImageState(state))
  }, [])

  return (
    <div className="editor">
      <div className="editor__wrap">
        <Painter screen={screen} />
        <aside className="editor__aside">
          <Previewer />
          <div className="editor__aside--tool">
            <Button onClick={handleImgConverterOpen}>
              <IconFont style="crop" /> 裁切匯入圖片
            </Button>
            <Button onClick={handleQrGeneratorOpen}>
              <IconFont style="qrcode" /> 生成QR code
            </Button>
          </div>
        </aside>
      </div>
      <Modal
        open={imgConverterOpen}
        onClose={handleImgConverterClose}
        className="editor__modal"
        keepMounted={true}
      >
        <ImageConverter
          onClose={handleImgConverterClose}
        />
      </Modal>
      <Modal
        open={qrGeneratorOpen}
        onClose={handleQrGeneratorClose}
        className="editor__modal"
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
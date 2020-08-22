import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './index.styl'
import './fontello.css'

const FONT_STYLE = {
  crop: 'icon-crop',
  qrcode: 'icon-qrcode',
  pen: 'icon-pen',
  folder: 'icon-folder',
  picture: 'icon-picture',
  palette: 'icon-palette',
  pigment: 'icon-pigment',
  bucket: 'icon-bucket',
  move: 'icon-move',
  'bucket-all': 'icon-bucket-all',
  'mirror-no': 'icon-pen',
  'mirror-horizontal': 'icon-mirror-horizontal',
  'mirror-vertical': 'icon-mirror-vertical',
  'mirror-corner': 'icon-mirror-corner',
  rect: 'icon-rect',
  ellipse: 'icon-ellipse',
  line: 'icon-line',
  stamp: 'icon-stamp',
  'heart-l': 'icon-heart-l',
  'heart-m': 'icon-heart-m',
  'heart-s': 'icon-heart-s',
  'star-l': 'icon-star-l',
  'star-m': 'icon-star-m',
  'star-s': 'icon-star-s',
  github: 'icon-github',
  libary: 'icon-archive'
}

const FONT_SIZE = {
  s: '16px',
  m: '24px',
  l: '32px',  
}

const IconFont = ({size = 'm', style = 'github'}) => {
  return (
    <div
      className={ classNames(FONT_STYLE[style]) }
      style = {{
        fontSize: FONT_SIZE[size],
        lineHeight: 1,
      }}
    />
  )
}

IconFont.propTypes = {}

export default IconFont
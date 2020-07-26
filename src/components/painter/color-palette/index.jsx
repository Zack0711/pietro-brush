import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { updatePalette } from '../../../actions/image'
import { colors } from '../../../utils/color'

import './index.styl'

const ColorPalette = ({paletteIndex}) => {
  const dispatch = useDispatch()

  const handlePaletteColorChange = colorIndex => {
    dispatch(updatePalette(paletteIndex, colorIndex))
  }

  useEffect(() => {
  },[])

  return (
    <div className="color-palette">
      {
        colors.map((color, i) => (
          <div 
            key={color[0]}
            className={classNames('color-palette__color-block')}
            onClick={() => handlePaletteColorChange(i)}
            style={{ backgroundColor: `${color[0]}` }}
          />
        ))
      }
    </div>
  )
}

ColorPalette.propTypes = {}

export default ColorPalette
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { IconFont } from '../../icons'
import ColorPalette from '../color-palette'

import { getActivePalette } from '../../../selectors/image'
import { colors } from '../../../utils/color'

import './index.styl'

const Palette = ({ pickupColor, paletteIndex, className }) => {
  const dispatch = useDispatch()

  const palette = useSelector(getActivePalette)

  const handleColorPickup = pIndex => {
    pickupColor(pIndex)
  }

  useEffect(() => {
  },[])

  return (
    <div className={classNames('palette', className)}>
      <div className="palette__color-wrap">
        {
          palette.map((colorIndex, i) => (
            <div 
              key={`${i}-${colorIndex}`}
              className={classNames('palette__color-block', {
                'palette__color-block--active': i === paletteIndex
              })}
              onClick={() => handleColorPickup(i)}
              style={{ background: `${colors[colorIndex][0]}` }}
            />
          ))
        }
        <div 
          className={classNames('palette__color-block', {
            'palette__color-block--active': paletteIndex === -1
          })}
          onClick={() => handleColorPickup(-1)}
        />
      </div>
      <ColorPalette paletteIndex={paletteIndex} />
    </div>
  )
}

Palette.propTypes = {}

export default Palette
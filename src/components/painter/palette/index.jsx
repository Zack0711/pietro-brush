import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { getActivePalette } from '../../../selectors/image'
import { colors } from '../../../utils/color'

import './index.styl'

const Palette = ({ pickupColor, paletteIndex }) => {
  const dispatch = useDispatch()

  const palette = useSelector(getActivePalette)

  const handleColorPickup = pIndex => {
    pickupColor(pIndex)
  }

  useEffect(() => {
  },[])

  return (
    <div className="palette">
      {
        palette.map((colorIndex, i) => (
          <div 
            key={`${i}-${colorIndex}`}
            className={classNames('palette__color-block', {
              'palette__color-block--active': i === paletteIndex
            })}
            onClick={() => handleColorPickup(i)}
            style={{ backgroundColor: `${colors[colorIndex][0]}` }}
          />
        ))
      }
    </div>
  )
}

Palette.propTypes = {}

export default Palette
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { updatePalette } from '../../../actions/image'
import { colors } from '../../../utils/color'

import './index.styl'

const COLOR_GREY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const COLOR_INDEX = [0, 1, 2, 3, 4, 5, 6, 7]
const COLOR_SERIES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

const ColorPalette = ({paletteIndex}) => {
  const dispatch = useDispatch()

  const handlePaletteColorChange = colorIndex => {
    dispatch(updatePalette(paletteIndex, colorIndex))
  }

  useEffect(() => {
  },[])

  return (
    <div className="color-palette">
      <div className="color-palette__grey">
        {
          COLOR_GREY.map(d => (
            <div 
              key={colors[d][0]}
              className={classNames('color-palette__color-block')}
              onClick={() => handlePaletteColorChange(i)}
              style={{ backgroundColor: `${colors[d][0]}` }}
            />
          ))
        }
      </div>
      {
        COLOR_SERIES.map(d => (
          <div>
            {
              COLOR_INDEX.map(i => (
                <div 
                  key={colors[15 + i + d*9][0]}
                  className={classNames('color-palette__color-block')}
                  onClick={() => handlePaletteColorChange(i)}
                  style={{ backgroundColor: `${colors[15 + i + d*9][0]}` }}
                />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

ColorPalette.propTypes = {}

export default ColorPalette
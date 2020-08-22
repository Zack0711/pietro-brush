import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { IconFont } from '../../icons'

import { updatePalette } from '../../../actions/image'
import { colors } from '../../../utils/color'

import './index.styl'

const COLOR_GREY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const COLOR_INDEX = [0, 1, 2, 3, 4, 5, 6, 7]
const COLOR_SERIES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

const ColorPalette = ({paletteIndex}) => {
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleBtnClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)    
  }

  const handlePaletteColorChange = colorIndex => {
    dispatch(updatePalette(paletteIndex, colorIndex))
    handleClose()
  }

  useEffect(() => {
  },[])

  return (
    <div className="color-palette">
      <Button onClick={handleBtnClick}>
        <IconFont style="pigment" />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className="color-palette__wrap">
          <div className="color-palette__grey">
            {
              COLOR_GREY.map(d => (
                <div 
                  key={`${d}-${colors[d][0]}`}
                  className={classNames('color-palette__color-block')}
                  onClick={() => handlePaletteColorChange(d)}
                  style={{ backgroundColor: `${colors[d][0]}` }}
                />
              ))
            }
          </div>
          {
            COLOR_SERIES.map(d => (
              <div key={`color-set-${d}`}>
                {
                  COLOR_INDEX.map(i => (
                    <div 
                      key={`${d}-${i}-${colors[15 + i + d*9][0]}`}
                      className={classNames('color-palette__color-block')}
                      onClick={() => handlePaletteColorChange(15 + i + d*9)}
                      style={{ backgroundColor: `${colors[15 + i + d*9][0]}` }}
                    />
                  ))
                }
              </div>
            ))
          }
        </div>
      </Menu>
    </div>
  )
}

ColorPalette.propTypes = {}

export default ColorPalette
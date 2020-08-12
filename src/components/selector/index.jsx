import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import './index.styl'

const Selector = ({selectedLabel, itemRender, options, onChange}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleBtnClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)    
  }

  const handleItemClick = (item) => {
    onChange(item)
    handleClose()
  }

  return (
    <div>
      <Button onClick={handleBtnClick}>
        { selectedLabel }
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          options.map(item => (
            <MenuItem 
              key={item.key}
              onClick={() => handleItemClick(item)}
            >
              { itemRender(item) }
            </MenuItem>
          ))
        }
      </Menu>
    </div>
  )
}

Selector.propTypes = {}

export default Selector

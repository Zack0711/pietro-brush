import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import Selector from '../../selector'
import IconLabel from '../icon-label'
import { IconFont } from '../../icons'

import './index.styl'

const StampSelector = ({ selectedStamp, options, onSizeChange, onStampChange }) => {

  const [sizes, setSizes] = useState(['s', 'm', 'l'])

  const handleStampChange = stamp => {
    onStampChange(stamp.val)
    setSizes(stamp.sizes)
    if( stamp.sizes.indexOf(selectedStamp.size) == -1) {
      onSizeChange(stamp.sizes[0])    
    }
  }

  const handleSizeChange = size => {
    onSizeChange(size)
  }

  return (
    <div className="stamp-selector">
      <Selector 
        options={options}
        onChange={ item => handleStampChange(item) }
        selectedLabel={(<IconFont style="libary" />)}
        itemRender={ item => (<IconLabel icon={item.icon} label={item.label} />) }
      />    
      {
        sizes.map( size => (
          <IconButton
            onClick={ () => handleSizeChange(size) }
            color={ size === selectedStamp.size ? 'primary' : 'default' }
            size="large">
            <IconFont style={`${selectedStamp.type}-${size}`} />
          </IconButton>
        ))
      }
    </div>
  );
}

StampSelector.propTypes = {}

export default StampSelector

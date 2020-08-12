import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Selector from '../../selector'
import { IconFont } from '../../icons'

import './index.styl'

const IconLabel = ({ label, icon }) => (
  <div className="icon-label">
  	<IconFont style={icon} />
  	<div className="icon-label__label">{label}</div>
  </div>
)

IconLabel.propTypes = {}

export default IconLabel

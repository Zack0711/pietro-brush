import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {
  updateActiveIndex,
} from '../../actions/image'

import { 
  getImageList,
  getImageData,
  getColAndRow,
  getZoom,
} from '../../selectors/image'

import Block from './block'

import './index.styl'

const Previewer = props => {
  const dispatch = useDispatch()

  const list = useSelector(getImageList)
  const data = useSelector(getImageData)
  const { col, row } = useSelector(getColAndRow)
  const zoom = useSelector(getZoom)

  useEffect(() => {
    if(list.length > 0) {
    //  dispatch(updateActiveIndex(0))
    }
  }, [list])

  useEffect(() => {
  }, [])

  return (
    <div className="previewer">
      <div 
        className="previewer__block--wrap"
        style={{ width: `${(32 * zoom + 2)*col}px`}}
      >
      {
        list.map((d, i) => (
          <Block
            key={`rwo-${data[d].x}-${data[d].y}`}
            index={i}
            data = {data[d]}
          />
        ))
      }
      </div>
    </div>
  )
}

Previewer.propTypes = {}

export default Previewer
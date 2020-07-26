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
  getActiveIndex,
} from '../../selectors/image'

import { colors } from '../../utils/color'

import './index.styl'

const ZOOM = 8

const Canvas = ({pattern, palette, zoom, index, active}) => {
  const dispatch = useDispatch()
  const canvasRef = useRef(null)

  const renderCanvas = () => {
    const ctx = canvasRef.current.getContext('2d')
    pattern.forEach( (d, i) => {
      const x = i % 32
      const y = Math.floor( i / 32)
      const colorIndex = palette[d]

      if (d > -1 && colorIndex > -1) {
        ctx.fillStyle = colors[colorIndex][0]
        ctx.fillRect(x*zoom, y*zoom, zoom, zoom)
      } else {
        ctx.clearRect (x*zoom, y*zoom, zoom, zoom)
      }
    })      
  }  

  useEffect(() => {
    renderCanvas()
  }, [pattern, palette])

  return (
    <div 
      className="previewer__block" 
      className={classNames('previewer__block', {
        'previewer__block--active': active,
      })}
      onClick={() => dispatch(updateActiveIndex(index))}
    >
      <canvas 
        ref={canvasRef} 
        width={32 * zoom}
        height={32 * zoom}
      />
    </div>
  )
}

const Previewer = props => {
  const dispatch = useDispatch()

  const [canvasList, setCanvasList] = useState([])

  const list = useSelector(getImageList)
  const data = useSelector(getImageData)
  const activeIndex = useSelector(getActiveIndex)

  useEffect(() => {
    if (list && data) {
      const canvasList = []
      list.forEach( d => {
        const {x, y} = data[d]
        if (!canvasList[y]) canvasList[y] = []
        canvasList[y][x] = d
      })
      setCanvasList(canvasList)
    }
  }, [list, data])

  return (
    <div className="previewer">
      {
        canvasList.map((row, i) => (
          <div className="previewer__row" key={`rwo-${i}`}>
            {
              row.map(d => (
                <Canvas
                  key={d}
                  index={d}
                  pattern={data[d].pattern}
                  palette={data[d].palette}
                  zoom={4}
                  active={ d === activeIndex}
                />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

Previewer.propTypes = {}

export default Previewer
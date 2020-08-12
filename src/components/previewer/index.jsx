import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import TextField from '@material-ui/core/TextField'

import {
  updateActiveIndex,
  updateTitle,
  updateAuthor,
  updateTown,
} from '../../actions/image'

import { 
  getImageList,
  getImageData,
  getActiveIndex,
  getTitle,
  getAuthor,
  getTown,
} from '../../selectors/image'

import { colors } from '../../utils/color'

import './index.styl'

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
  const title = useSelector(getTitle)
  const author = useSelector(getAuthor)
  const town = useSelector(getTown)

  useEffect(() => {
    if (list && data) {
      const canvasList = []
      list.forEach( d => {
        const {x, y} = data[d]
        if (!canvasList[y]) canvasList[y] = []
        canvasList[y][x] = d
      })
      setCanvasList(canvasList)
      console.log(canvasList)
    }
  }, [list, data])

  return (
    <div className="previewer">
      <TextField
        label="Title"
        variant="outlined"
        onChange={e => dispatch(updateTitle(e.target.value))}
        value={title}
      />
      <TextField
        label="Author"
        variant="outlined"
        onChange={e => dispatch(updateAuthor(e.target.value))}
        value={author}
      />
      <TextField
        label="Town"
        variant="outlined"
        onChange={e => dispatch(updateTown(e.target.value))}
        value={town}
      />
      {
        canvasList.map((row, i) => (
          <div className="previewer__row" key={`rwo-${i}`}>
            {
              row.map(d => (
                data[d] && 
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
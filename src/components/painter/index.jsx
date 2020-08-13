import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { IconFont } from '../icons'
import Selector from '../selector'

import Pattern from './pattern'
import Palette from './palette'
import StampSelector from './stamp-selector'
import IconLabel from './icon-label'

import {
  updatePattern,
} from '../../actions/image'

import { 
  getActiveIndex,
  getActivePalette,
  getActivePattern,
} from '../../selectors/image'

import { colors } from '../../utils/color'
import { 
  drawLine,
  drawEllipse,
  drawRect,
  drawSticker,
  genArray,
} from '../../utils/tools'

import './index.styl'

const ZOOM = 8

let pixelsArray = []
let previeArray = genArray(1024)

const TOOLS = [
  { label: 'pen', key: 'pen', val: 'pen', icon: 'pen' },
  { label: 'bucket', key: 'bucket', val: 'bucket', icon: 'bucket'  },
  { label: 'stamp', key: 'stamp', val: 'stamp', icon: 'stamp'  },
  { label: 'ellipse', key: 'ellipse', val: 'ellipse', icon: 'ellipse'  },
  { label: 'rect', key: 'rect', val: 'rect', icon: 'rect'  },
  { label: 'line', key: 'line', val: 'line', icon: 'line'  },
  { label: 'move', key: 'move', val: 'move', icon: 'move'  },
]

const MIRROR_OPTIONS = [
  { label: 'mirror-0', key: 'mirror-0', val: 0, icon: 'mirror-horizontal' },
  { label: 'mirror-1', key: 'mirror-1', val: 1, icon: 'mirror-horizontal' },
  { label: 'mirror-2', key: 'mirror-2', val: 2, icon: 'mirror-vertical' },
  { label: 'mirror-3', key: 'mirror-3', val: 3, icon: 'mirror-corner' },
]

const STAMP_OPTIONS = [
  { label: 'star', key: 'star', val: 'star', icon: 'star-m', sizes: ['s', 'm', 'l'] },
  { label: 'heart', key: 'heart', val: 'heart', icon: 'heart-m', sizes: ['s', 'm', 'l'] },
]

const PREVIEW_TOOL = {
  tool: 1,
  ellipse: 1,
  rect: 1,
  stamp: 1,
}

const canvasCtx = {
  pattern: null,
  preview: null,
}

const Painter = props => {
  const dispatch = useDispatch()

  const palette = useSelector(getActivePalette)
  const pattern = useSelector(getActivePattern)

  const activeIndex = useSelector(getActiveIndex)

  const [indicatorPos, setIndicatorPos] = useState({ x: 0, y: 0 })
  const [anchorPos, setAnchorPos] = useState({ x: 0, y: 0 })

  const [paletteIndex, setPaletteIndex] = useState(0)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [stamp, setStamp] = useState({size: 'm', type: 'star'})
  const [tool, setTool] = useState(TOOLS[0].val)
  const [mirror, setMirror] = useState(MIRROR_OPTIONS[0])

  const stretcherRef = useRef(null)
  const activeIndexRef = useRef(null)

  const drawPixel = (x, y, paletteIndex, ctx = canvasCtx['pattern'], storeToArray = true) => {
    if (ctx) {
      const pixelIndex = x + y * 32
      const colorIndex = palette[paletteIndex]

      if (colorIndex > -1) {
        ctx.fillStyle = colors[colorIndex][0]
        ctx.fillRect(x*ZOOM, y*ZOOM, ZOOM, ZOOM)
      } else {
        ctx.clearRect (x*ZOOM, y*ZOOM, ZOOM, ZOOM)
      }

      if (storeToArray) {
        pixelsArray[pixelIndex] = paletteIndex
        dispatch(updatePattern(pixelsArray))
      }
    }
  }

  const getPixelPIndex = pixelIndex => {
    const paletteIndex = pixelsArray[pixelIndex]
    return paletteIndex > -1 ? paletteIndex : -1
  }

  const penDraw = (x, y, paletteIndex) => {
    const coordinates = [{ x, y }]
    switch(mirror.val) {
      case 1:
        coordinates.push({x: 31 - x, y,})
        break
      case 2:
        coordinates.push({x, y: 31 -y,})
        break
      case 3:
        coordinates.push({x: 31 - x, y,})
        coordinates.push({x, y: 31 -y,})
        coordinates.push({x: 31 - x, y: 31 -y,})
        break
    }

    coordinates.forEach( d => {
      drawPixel(d.x, d.y, paletteIndex)
    })
  }

  const bucketFill = (x, y, paletteIndex) => {
    const pixelIndex = x + y * 32
    const currentPIndex = getPixelPIndex(pixelIndex)

    const resetPixel = (x, y) => {
      const pixelIndex = x + y * 32
      if ( x >= 0 && x <= 31 && y >=0 && y <= 31) {
        if( currentPIndex === getPixelPIndex(pixelIndex)) {
          drawPixel(x, y, paletteIndex)
          resetPixel(x + 1, y)
          resetPixel(x - 1, y)
          resetPixel(x, y + 1)
          resetPixel(x, y - 1)
        }        
      }
    }

    if (currentPIndex !== paletteIndex) {
      resetPixel(x, y)
    }
  }

  const canvasMove = (x, y) => {
    const dX = indicatorPos.x - x
    const dY = indicatorPos.y - y

    const newPixelsArray = new Array(1024)

    pixelsArray.forEach((d, i) => {
      let x = i % 32
      let y = Math.floor( i / 32)

      x = x - dX
      y = y - dY

      if( x > 31) x = x - 32
      if( y > 31) y = y - 32

      if( x < 0) x = 32 + x
      if( y < 0) y = 32 + y

      const pixelIndex = x + y * 32
      newPixelsArray[pixelIndex] = d
    })

    pixelsArray = newPixelsArray
    renderCanvas()
  }

  const renderCanvas = (pArray = pixelsArray, ctx = canvasCtx.pattern, storeToArray = true ) => {
    if (ctx) {
      pArray.forEach( (d, i) => {
        const x = i % 32
        const y = Math.floor( i / 32)
        drawPixel(x, y, d, ctx, storeToArray)
      })      
    }
  }

  const handleMouseDown = e => {
    setIsMouseDown(true)
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
  }

  const handleMouseMove = e => {
    const stretcherRect = stretcherRef.current.getBoundingClientRect()
    const coordinate = {
      x: Math.floor((e.clientX - stretcherRect.x)/ZOOM),
      y: Math.floor((e.clientY - stretcherRect.y)/ZOOM),      
    }

    let pArray = []

    if (isMouseDown) {
      switch(tool) {
        case 'pen':
          penDraw(coordinate.x, coordinate.y, paletteIndex)
          break
        case 'move':
          canvasMove(coordinate.x, coordinate.y)
          break
        case 'line':
          pArray = [...previeArray]
          drawLine(
            anchorPos.x, anchorPos.y,
            indicatorPos.x, indicatorPos.y,
            (x, y) => {
              const pixelIndex = x + y * 32
              pArray[pixelIndex] = paletteIndex
            }
          )
          renderCanvas(pArray, canvasCtx.preview, false)
          break
        case 'ellipse': 
          pArray = [...previeArray]
          const cX = (anchorPos.x + indicatorPos.x) / 2
          const cY = (anchorPos.y + indicatorPos.y) / 2
          const w = Math.abs(anchorPos.x - indicatorPos.x)
          const h = Math.abs(anchorPos.y - indicatorPos.y)

          drawEllipse(cX, cY, w, h, (x ,y) => {
            const pixelIndex = x + y * 32
            pArray[pixelIndex] = paletteIndex
          })

          renderCanvas(pArray, canvasCtx.preview, false)
          break
        case 'rect':
          pArray = [...previeArray]
          drawRect(
            anchorPos.x, anchorPos.y,
            indicatorPos.x, indicatorPos.y,
            (x, y) => {
              const pixelIndex = x + y * 32
              pArray[pixelIndex] = paletteIndex
            }
          )

          renderCanvas(pArray, canvasCtx.preview, false)
          break
      }
    }

    if (tool === 'stamp') {
      pArray = [...previeArray]
      drawSticker({
        x: coordinate.x,
        y: coordinate.y,
        callback: (x, y) => {
          const pixelIndex = x + y * 32
          pArray[pixelIndex] = paletteIndex          
        },
        size: stamp.size,
        type: stamp.type,
      })
      renderCanvas(pArray, canvasCtx.preview, false)
    }

    setIndicatorPos(coordinate)
  }

  const pickupColor = pIndex => {
    setPaletteIndex(pIndex)
  }

  const onPatternHover = (patternRef, previewRef) => {
    canvasCtx.pattern = patternRef.current.getContext('2d')
    canvasCtx.preview = previewRef.current.getContext('2d')
  }

  useEffect(() => {
  }, [indicatorPos])

  useEffect(() => {
    if (activeIndex > -1) {
      renderCanvas()
    }
  }, [palette])

  useEffect(() => {
    const coordinates = []
    if (isMouseDown) {
      switch(tool) {
        case 'pen':
          penDraw(indicatorPos.x, indicatorPos.y, paletteIndex)
          break
        case 'bucket':
          bucketFill(indicatorPos.x, indicatorPos.y, paletteIndex)
          break
        case 'rect':
        case 'ellipse':
        case 'line':
          setAnchorPos(indicatorPos)
          break
        case 'stamp':
          drawSticker({
            x: indicatorPos.x,
            y: indicatorPos.y,
            callback: (x, y) => {coordinates.push({x, y})},
            size: stamp.size,
            type: stamp.type,
          })
          renderCanvas(previeArray, canvasCtx.preview, false)
          coordinates.forEach( d => { drawPixel(d.x, d.y, paletteIndex)})
          break
      }
    } else {
      switch(tool) {
        case 'line':
          drawLine(
            anchorPos.x, anchorPos.y,
            indicatorPos.x, indicatorPos.y,
            (x, y) => {coordinates.push({x, y})}
          )
          renderCanvas(previeArray, canvasCtx.preview, false)
          coordinates.forEach( d => { drawPixel(d.x, d.y, paletteIndex)})
          break

        case 'ellipse':
          const cX = (anchorPos.x + indicatorPos.x) / 2
          const cY = (anchorPos.y + indicatorPos.y) / 2
          const w = Math.abs(anchorPos.x - indicatorPos.x)
          const h = Math.abs(anchorPos.y - indicatorPos.y)

          drawEllipse(cX, cY, w, h, (x ,y) => {coordinates.push({x, y})})
          coordinates.forEach( d => { drawPixel(d.x, d.y, paletteIndex)})
          break

        case 'rect':
          drawRect(
            anchorPos.x, anchorPos.y,
            indicatorPos.x, indicatorPos.y,
            (x, y) => {coordinates.push({x, y})}
          )

          renderCanvas(previeArray, canvasCtx.preview, false)
          coordinates.forEach( d => { drawPixel(d.x, d.y, paletteIndex)})
          break
      }
    }
  }, [isMouseDown])

  useEffect(() => {
    if (activeIndexRef.current !== activeIndex && activeIndex > -1) {
      activeIndexRef.current = activeIndex
      pixelsArray = pattern
      renderCanvas()
    }
  }, [activeIndex, pattern])

  return (
    <div className="painter">
      <div className="painter__stretcher-wrap">
        <div className="painter__tool">
          <Selector 
            options={TOOLS}
            onChange={ item => setTool(item.val) }
            selectedLabel={(<IconFont style={tool} />)}
            itemRender={ item => (<IconLabel icon={item.icon} label={item.label} />) }
          />
          {
            tool === 'stamp' && (
              <StampSelector
                options={STAMP_OPTIONS}
                selectedStamp={stamp}
                onStampChange={(type) => setStamp({...stamp, type})}
                onSizeChange={(size) => setStamp({...stamp, size})}
              />
            )
          }
          <Selector 
            options={MIRROR_OPTIONS}
            onChange={ item => setMirror(item) }
            selectedLabel={(<IconFont style={mirror.icon} />)}
            itemRender={ item => (<IconLabel icon={item.icon} label={item.label} />) }
          />
        </div>
        <div 
          className="painter__stretcher"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          ref={stretcherRef}
        >
          <Pattern
            zoom={ZOOM}
            hoverCallBack={onPatternHover}
          />
          {
            ( tool !== 'line' && activeIndex > -1 ) && (
              <div 
                className="painter__indicator"
                style={{
                  top: `${indicatorPos.y * ZOOM}px`,
                  left: `${indicatorPos.x * ZOOM}px`,
                  width: `${ZOOM}px`,
                  height: `${ZOOM}px`,
                  backgroundColor: `${colors[palette[paletteIndex]][0]}`,
                }}
              />
            )
          }
        </div>
      </div>
      {
        activeIndex > -1 && (
          <Palette 
            className="painter__palette-wrap"
            pickupColor={pickupColor}
            paletteIndex={paletteIndex}
          />
        )
      }
    </div>
  )
}

Painter.propTypes = {}

export default Painter
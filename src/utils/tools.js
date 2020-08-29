import * as stickers from './stickers'

export const drawLine = (x1, y1, x2, y2, callback) => {
  // Bresenham's line algorithm
  x1=~~x1, x2=~~x2, y1=~~y1, y2=~~y2
  
  const dx = Math.abs(x2 - x1)
  const dy = Math.abs(y2 - y1)
  const sx = (x1 < x2) ? 1 : -1
  const sy = (y1 < y2) ? 1 : -1
  let err = dx - dy
  
  while(true){
    callback(x1, y1)
    if(x1===x2 && y1===y2) break
    const e2 = err*2
    if(e2 >-dy){ err -= dy; x1 += sx }
    if(e2 < dx){ err += dx; y1 += sy }
  }
}

export const drawEllipse = (cX, cY, w, h, callback) => {
  const TAU = 2 * Math.PI
  const step = 0.05;
  for(let theta = 0; theta < TAU; theta += step){
    const x = Math.round(cX + Math.cos(theta) * w/2)
    const y = Math.round(cY + Math.sin(theta) * h/2)
    if (callback) callback(x, y)
  }
}

export const drawRect = (x1, y1, x2, y2, callback) => {
  const sx = (x1 < x2) ? 1 : -1
  const sy = (y1 < y2) ? 1 : -1

  let x = x1
  let y = y1

  callback(x1, y1)
  callback(x2, y2)

  while (x !== x2) {
    callback(x, y1)
    callback(x, y2)
    x += sx
  }

  while (y !== y2) {
    callback(x1, y)
    callback(x2, y)
    y += sy
  }
}

const P_WIDTH = {
  s: 5,
  m: 11,
  l: 23
}

export const drawSticker = ({x, y, callback, size = 'm', type = 'star'}) => {
  const pWidth = P_WIDTH[size]
  const stickerArray = stickers[type][size]
  const cx = Math.floor(pWidth / 2)
  const cy = Math.floor(pWidth / 2)

  const dx = x - cx
  const dy = y - cy

  stickerArray.forEach((d, i) => {
    const px = i % pWidth
    const py = Math.floor( i / pWidth)

    if( px + dx >=0 &&  py + dy >=0 && px + dx < 32 &&  py + dy < 32 && d ) {
      callback(px + dx, py + dy)
    }
  })
}

export const drawTextPattern = ({ x, y, callback, pattern }) => {
  const width = Math.sqrt(pattern.length)

  const cx = Math.floor(width / 2)
  const cy = Math.floor(width / 2)

  const dx = x - cx
  const dy = y - cy

  pattern.forEach((d, i) => {
    const px = i % width
    const py = Math.floor( i / width)

    if( px + dx >=0 &&  py + dy >=0 && px + dx < 32 &&  py + dy < 32 && d < 3 ) {
      callback(px + dx, py + dy, d)
    }
  })

}

export const genArray = (len, init = -1) => {
  const result = []
  for(let i = 0; i < len; i += 1) result.push(init)
  return result
}

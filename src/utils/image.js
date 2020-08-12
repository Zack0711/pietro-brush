import ColorThief from 'colorthief'
import RgbQuant from 'rgbquant'

import {
  deltaE,
  rgb2lab,
  colorsPalette,
} from './color'

export const readImage = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    resolve(e.target.result)
  }
  reader.readAsDataURL(file)
})

const colorThief = new ColorThief()
const IMAGE_WIDTH = 32
const IMAGE_HEIGHT = 32
const PALETTE_COUNT = 15

export const loadImage = file => new Promise(async (resolve, reject) => {
  const base64String = await readImage(file)
  const img = new Image()
  img.onload = () => resolve(img)
  img.src = base64String
})

export const loadImageData = file => new Promise(async (resolve, reject) => {
  const base64String = await readImage(file)

  const canvas = document.createElement(`canvas`)
  const ctx = canvas.getContext('2d')
  const img = new Image()

  img.onload = async () => {
    const {
      width,
      height
    } = img

    const palette = await colorThief.getPalette(img, PALETTE_COUNT)

    const imgWidth = width > height ? height : width
    ctx.drawImage(img, Math.floor((width - imgWidth)/2), Math.floor((height - imgWidth)/2), imgWidth, imgWidth, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT)

    const imageData = ctx.getImageData(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT)

    resolve({ 
      base64String,
      palette,
      imageData,
    })
  }

  img.src = base64String
})

export const downsampleImage = (imageData, alphaThreshold = 128, mode = '7bit') => {
  let opaqueBytes = new Array()
  for (let i = 0; i < imageData.data.length; i += 4) {
    if (imageData.data[i + 3] > alphaThreshold) {
        //opaqueBytes.push(downsamplePixel(imageData.data.slice(i, i + 3), mode));
      opaqueBytes = opaqueBytes.concat([...downsamplePixel(imageData.data.slice(i, i + 3), mode), 255])
    }
  }
  return opaqueBytes
}

// http://threadlocalmutex.com/?page_id=60
export const downsamplePixel = (color, mode) => {
  // color = Color.rgb2lab(color);
  let newColor = [0, 0, 0];
  if (mode === '4bit') {
    for (let i = 0; i < color.length; i++) {
      let tmp = (color[i] * 15 + 135) >> 8;
      newColor[i] = tmp * 17;
    }
  } else if (mode === '5bit') {
    for (let i = 0; i < color.length; i++) {
      let tmp = (color[i] * 249 + 1024) >> 11;
      newColor[i] = (tmp * 527 + 23) >> 6;
    }
  } else if (mode === '6bit') {
    for (let i = 0; i < color.length; i++) {
      let tmp = (color[i] * 253 + 512) >> 10;
      newColor[i] = (tmp * 259 + 33) >> 6;
    }
  } else if (mode === '7bit') {
    for (let i = 0; i < color.length; i++) {
      let tmp = (color[i] * 2 + 1) >> 2;
      newColor[i] = (tmp * 257 + 64) >> 7;
    }
  } else {
    newColor = color;
  }
  // newColor = Color.lab2rgb(newColor)
  // return [newColor[0], newColor[1], newColor[2]]
  return newColor;
}

const pickNearestColorFromPalette = (color, palette) => {
  let minDistance = Number.MAX_VALUE
  let pickedColor = color

  palette.forEach( d => {
    const distance = deltaE(rgb2lab(color), rgb2lab(d))
    if (distance < minDistance) {
      minDistance = distance
      pickedColor = d
    }
  })

  return pickedColor
}

const pickNearestColorIndexFromPalette = (color, palette) => {
  let minDistance = Number.MAX_VALUE
  let pickedIndex = -1

  palette.forEach( (d, i) => {
    const distance = deltaE(rgb2lab(color), rgb2lab(d))
    if (distance < minDistance) {
      minDistance = distance
      pickedIndex = i
    }
  })

  return pickedIndex
}

export const convert2PaletteColor = (colorArray, palette) => {
  let convertData = new Array()
  for (let i = 0; i < colorArray.length; i += 1) {
    convertData.push(pickNearestColorFromPalette(colorArray[i], palette))
  }
  return convertData  
}

export const convert2PaletteIndex = (colorArray, palette) => {
  let convertData = new Array()
  let paletteRef = [...palette]
  for (let i = 0; i < colorArray.length; i += 1) {
    const coloeIndex = pickNearestColorIndexFromPalette(colorArray[i], paletteRef)
    convertData.push(coloeIndex)
    //paletteRef.splice(coloeIndex, 1)
  }
  return convertData  
}

export const converImageData = (imageData, palette) => {
  let convertData = new Array()
  //console.log(imageData, palette)
  for (let i = 0; i < imageData.data.length; i += 4) {
    convertData.push(pickNearestColorFromPalette(imageData.data.slice(i, i + 3), palette))
  }
  return convertData
}

const opts = {
  colors: 15,             // desired palette size
  method: 1,               // histogram method, 2: min-population threshold within subregions; 1: global top-population
  boxSize: [64,64],        // subregion dims (if method = 2)
  boxPxls: 2,              // min-population threshold (if method = 2)
  initColors: 4096,        // # of top-occurring colors  to start with (if method = 1)
  minHueCols: 0,           // # of colors per hue group to evaluate regardless of counts, to retain low-count hues
  dithKern: null,          // dithering kernel name, see available kernels in docs below
  dithDelta: 0,            // dithering threshhold (0-1) e.g: 0.05 will not dither colors with <= 5% difference
  dithSerp: false,         // enable serpentine pattern dithering
  palette: [],             // a predefined palette to start with in r,g,b tuple format: [[r,g,b],[r,g,b]...]
  reIndex: false,          // affects predefined palettes only. if true, allows compacting of sparsed palette once target palette size is reached. also enables palette sorting.
  useCache: true,          // enables caching for perf usually, but can reduce perf in some cases, like pre-def palettes
  cacheFreq: 10,           // min color occurance count needed to qualify for caching
  colorDist: "euclidean",  // method used to determine color distance, can also be "manhattan"
}

export const imageQuantize = (img, row, col) => {
  const list = []
  const data = {}

  let index = 0

  const dx = img.width / row
  const dy = img.height / col

  for( let i = 0; i < col; i += 1) {
    for (let j = 0; j < row; j +=1 ) {
      const canvas = document.createElement('CANVAS')
      const ctx = canvas.getContext('2d')
      const q = new RgbQuant(opts)

      canvas.width = 32
      canvas.height = 32
      ctx.drawImage(img, dx*j, dy*i, dx, dy, 0, 0, 32, 32)
      q.sample(ctx)

      const palette = convert2PaletteIndex(q.palette(true), colorsPalette)
      const pattern = q.reduce(ctx, 2)

      list.push(index)
      data[index] = {
        x: j,
        y: i,
        palette,
        pattern,
      }
      index += 1
    }
  }

  return ({
    list,
    data,
  })

}
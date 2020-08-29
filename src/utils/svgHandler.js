import {
  converImageData,
  convert2PaletteIndex,
} from './image'

export const getSVGBlob = (svgNode) => {
  let svgString = ''
  const serializer = new XMLSerializer()
  svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink')

  svgString = new XMLSerializer().serializeToString(svgNode)
  svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink=') // Fix root xlink without namespace
  svgString = svgString.replace(/NS\d+:href/g, 'xlink:href') // Safari NS namespace fix

  const svgBlob = new Blob([svgString], { type: "image/svg+xml" })
  return svgBlob
  //return URL.createObjectURL(svgBlob)
}

export const blobToBase64 = blob => new Promise( async (resolve, reject) =>{
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = () => { resolve(reader.result) }
})

const loadFont = (font, url) => {
  return new Promise( async (resolve, reject) => {
    const blob = await fetch(url).then(rsp => rsp.blob());
    const base64 = await blobToBase64(blob);
    resolve({base64, font})
  })
}

export const embedFont = (fonts=[]) => {
  return new Promise( async (resolve, reject) => {      
    const fontsArray = []

    const results = await Promise.all(fonts.map(d => loadFont(d, d.url)));

    results.forEach( d => {
      //const fontURL = `data:application/font-woff;base64,${d.base64}`
      const fontURL = `${d.base64}`
      const newFontStyle = `
        @font-face {
          font-family: ${d.font.name};
          font-style: normal;
          font-weight: 400;
          src: url(${fontURL});
          unicode-range: ${d.font.unicodeRange};
        }
      `

      fontsArray.push({ 
        name: d.font.name,
        fontStyle: newFontStyle
      })
    })

    resolve(fontsArray);
  })
}

const DEFAULT_FONT_FAMILY = '"Noto Sans", Roboto, Helvetica, Arial, sans-serif'

export const creatSVGNode = async (text, size = 16, font = [] ) => {
  const svgns = 'http://www.w3.org/2000/svg'

//  const fontData = await embedFont([font])

//  console.log(font)
//  console.log(fontData)

  const svgEl = document.createElementNS(svgns, 'svg')
  const defEl = document.createElementNS(svgns, 'defs')
  const groupEl = document.createElementNS(svgns, 'g')
  const textEl = document.createElementNS(svgns, 'text')

  svgEl.setAttributeNS(null, 'viewBox', `0 0 ${size} ${size}`)
  svgEl.setAttributeNS(null, 'width', `${size}px`)
  svgEl.setAttributeNS(null, 'height', `${size}px`)

/*
      allStyleTags = svgDefs.selectAll('style').data(fontDataArray);
      allStyleTags.enter().append('style').attr('type', 'text/css');
*/

  if (font.length > 0) {
    font.forEach( d => {
      const styleEl = document.createElement('style')
      styleEl.setAttribute('type', 'text/css')
      styleEl.innerHTML = d.fontStyle
      defEl.appendChild(styleEl)
    })
  }

  groupEl.setAttributeNS(null, 'x', size/2)
  groupEl.setAttributeNS(null, 'y', size/2)
  groupEl.setAttributeNS(null, 'font-size', size)
  groupEl.setAttributeNS(null, 'font-family', font[0] ? font[0].name : DEFAULT_FONT_FAMILY)

  textEl.setAttributeNS(null, 'dominant-baseline', 'text-before-edge')
  textEl.setAttributeNS(null, 'text-anchor', 'start')
  textEl.textContent = text

  groupEl.appendChild(textEl)

  svgEl.appendChild(defEl)
  svgEl.appendChild(groupEl)

  return svgEl
}

const GREY_PALETTE = [[0, 0, 0], [85, 85, 85], [170, 170, 170], [255, 255, 255]]

export const convertTextPattern = (character, size = 24, font) => new Promise( async (resolve, reject) => {
  const svgNode = await creatSVGNode(character, size, font)

  const blob = getSVGBlob(svgNode)
  const base64 = await blobToBase64(blob)

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const image = new Image()

  image.onload = () => {
    ctx.canvas.width = size
    ctx.canvas.height = size
    ctx.drawImage(image, 0, 0, size, size)
    const imageData = ctx.getImageData(0, 0, size, size)
    const textPattern = converImageData(imageData, GREY_PALETTE)
    resolve({textPattern, svgNode})
  }
  image.src = base64  
})

export const getTextPatterns = async (textString, size, font) => {
  const patterns = []
  //const fontData = await embedFont([font])

  for(let i = 0; i < textString.length; i += 1){
    const textPattern = await convertTextPattern(textString[i], size, font)
    patterns.push(textPattern)    
  }

  return patterns
}


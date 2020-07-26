import { rgb2hex, colorMap } from './color'

const stringToBytes = str => {
  let bytes = new Array();
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i)
    bytes.push(char & 0xFF)
    bytes.push(char >>> 8)
  }
  return bytes
}

export const makeQrContents = ({
  title,
  author,
  town,
  palette, 
  imageData,
}) => {

  //const title = document.getElementById('title').value;
  const titleBytes = stringToBytes(title)
  const nTitleBytes = 20 * 2
  //const author = document.getElementById('author').value;
  const authorBytes = stringToBytes(author)
  const nAuthorBytes = 9 * 2
  //const town = document.getElementById('town').value;
  const nTownBytes = 9 * 2;
  const townBytes = stringToBytes(town)

  let contents = new Array()
  // header

  contents = contents.concat(titleBytes)
  for (let i = titleBytes.length; i < nTitleBytes; i++) {
    contents.push(0)
  }

  contents = contents.concat([0, 0, 182, 236])

  contents = contents.concat(authorBytes)
  for (let i = authorBytes.length; i < nAuthorBytes; i++) {
    contents.push(0);
  }

  contents = contents.concat([0, 0, 68, 197])

  contents = contents.concat(townBytes)
  for (let i = townBytes.length; i < nTownBytes; i++) {
    contents.push(0)
  }

  contents = contents.concat([0, 0, 25, 49]);

  let paletteMap = new Map();
  for (let idx = 0; idx < palette.length; idx++) {
    const colorHex = rgb2hex(palette[idx])
    paletteMap.set(colorHex, idx)
    const colorByte = colorMap.get(colorHex)
    contents.push(colorByte)
  }

  contents = contents.concat([204, 10, 9, 0, 0])

  // image
  const transparent = 15 // transparent palette index
  let data = imageData.data

  for (let idx = 0; idx < data.length; idx += 8) {
    let firstPixel = [
      data[idx + 0],
      data[idx + 1],
      data[idx + 2],
      data[idx + 3]
    ]

    let secondPixel = [
        data[idx + 4],
        data[idx + 5],
        data[idx + 6],
        data[idx + 7]
    ]

    let firstPaletteIdx
    if (firstPixel[3] == 0) {
      firstPaletteIdx = transparent;
    } else {
      firstPaletteIdx = paletteMap.get(rgb2hex([
        firstPixel[0],
        firstPixel[1],
        firstPixel[2]
      ]))
    }

    let secondPaletteIdx
    if (secondPixel[3] == 0) {
      secondPaletteIdx = transparent
    } else {
      secondPaletteIdx = paletteMap.get(rgb2hex([
        secondPixel[0],
        secondPixel[1],
        secondPixel[2]
      ]))
    }

    contents.push(16 * secondPaletteIdx + firstPaletteIdx)
  }

  return contents
}

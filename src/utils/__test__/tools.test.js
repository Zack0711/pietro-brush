import {
  drawLine
} from '../tools'

function sum(a, b) {
  return a + b;
}

describe('drawLine', () => {
  let coordinates = []

  beforeEach(() => {
    coordinates = []
  })

  test('draw a horizon line form left', () => {
    const start = [-2, 0]
    const end = [2, 0]
    const expectedCoordinates = [-2,0,-1,0,0,0,1,0,2,0]
    drawLine( start[0], start[1], end[0], end[1],
      (x, y) => coordinates.push(x,y))
    expect(coordinates).toStrictEqual(expectedCoordinates)
  })

  test('draw a horizon line form right', () => {
    const start = [2, 0]
    const end = [-2, 0]
    const expectedCoordinates = [2,0,1,0,0,0,-1,0,-2,0]
    drawLine( start[0], start[1], end[0], end[1],
      (x, y) => coordinates.push(x,y))
    expect(coordinates).toStrictEqual(expectedCoordinates)
  })

  test('draw a vertical line form top', () => {
    const start = [0, 2]
    const end = [0, -2]
    const expectedCoordinates = [0,2,0,1,0,0,0,-1,0,-2]
    drawLine( start[0], start[1], end[0], end[1],
      (x, y) => coordinates.push(x,y))
    expect(coordinates).toStrictEqual(expectedCoordinates)
  })

  test('draw a vertical line form bottom', () => {
    const start = [0, -2]
    const end = [0, 2]
    const expectedCoordinates = [0,-2,0,-1,0,0,0,1,0,2]
    drawLine( start[0], start[1], end[0], end[1],
      (x, y) => coordinates.push(x,y))
    expect(coordinates).toStrictEqual(expectedCoordinates)
  })
})

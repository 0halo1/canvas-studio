import { fill } from '../canvas-studio/canvas/core/fill'
import { line } from '../canvas-studio/canvas/core/point'
import { rect } from '../canvas-studio/canvas/core/rect'
import { stroke } from '../canvas-studio/canvas/core/stroke'
import { strokeWeight } from '../canvas-studio/canvas/core/strokeWeight'
import { DrawAlgorithmContext } from '../canvas-studio/canvas/interfaces'
import { dist } from '../canvas-studio/canvas/math/dist'
import { lerp } from '../canvas-studio/canvas/math/lerp'
import AnimatedDrawableComponent from '../canvas-studio/engine/components/animated-drawable-component'
import Size from '../canvas-studio/engine/math/size'
import Vector2D from '../canvas-studio/engine/math/vector-2d'

export class KGrid extends AnimatedDrawableComponent {
  columns: number = 15
  rows: number = 15
  lineSpacing: number = 30
  cellSize: number
  currentPalette: string[] = ['#FF6138', '#FFFF9D', '#BEEB9F', '#79BD8F', '#00A388']

  constructor(position: Vector2D, size: Size) {
    super(position, size)
    this.cellSize = size.width / this.columns
  }

  draw(ctx: DrawAlgorithmContext): void {
    // Draw the background
    fill(ctx, 'white')
    rect(ctx, 0, 0, this.size.width, this.size.height)

    for (let col = 0; col < this.columns; col++) {
      for (let row = 0; row < this.rows; row++) {
        this.fillCube(ctx, col, row)
      }
    }
  }

  update(deltaTime: number): void {
    // throw new Error('Method not implemented.')
  }

  getRandomColor() {
    // Get a random index from the currentPalette array
    let index = Math.floor(Math.random() * this.currentPalette.length)

    // Get the color at the randomly selected index
    let color = this.currentPalette[index]

    return color
  }

  fillDiagonalLines1(ctx: DrawAlgorithmContext, x: number, y: number, weight = 2) {
    let color = this.getRandomColor()
    stroke(ctx, color)
    fill(ctx, color)
    strokeWeight(ctx, weight)

    for (let offset = -this.cellSize - 1; offset < this.cellSize + 1; offset += this.lineSpacing) {
      let startX = x + offset
      let startY = y

      let endX = x + offset + this.cellSize
      let endY = y + this.cellSize

      // Adjust start and end positions to keep the line inside the cube
      if (startX < x) {
        startY += x - startX
        startX = x
      }
      if (endX > x + this.cellSize) {
        endY -= endX - (x + this.cellSize)
        endX = x + this.cellSize
      }

      line(ctx, startX, startY, endX, endY)
    }
  }

  fillCube(ctx: DrawAlgorithmContext, col: number, row: number) {
    // Calculate the total width and height of the grid
    let totalGridWidth = this.columns * this.cellSize
    let totalGridHeight = this.rows * this.cellSize

    // Calculate the starting x and y positions to center the grid
    let startX = (this.size.width - totalGridWidth) / 2
    let startY = (this.size.height - totalGridHeight) / 2

    let x = startX + col * this.cellSize
    let y = startY + row * this.cellSize

    // 1. Calculate the distance of the center of the cube to the center of the canvas
    let cubeCenterX = x + this.cellSize / 2
    let cubeCenterY = y + this.cellSize / 2
    let canvasCenterX = this.size.width / 2
    let canvasCenterY = this.size.height / 2
    let distToCenter = dist(cubeCenterX, cubeCenterY, canvasCenterX, canvasCenterY)

    // 2. Normalize this distance
    let maxDist = dist(0, 0, this.size.width / 2, this.size.height / 2) // maximum distance (corner to center)
    let normalizedDist = distToCenter / maxDist

    // 3. Calculate the strokeWeight based on this normalized distance
    let minStroke = 0.25 // you can adjust this value to the desired minimum stroke weight
    let maxStroke = 12 // you can adjust this value to the desired maximum stroke weight
    let currentStroke = lerp(maxStroke, minStroke, normalizedDist) // lerp is used to interpolate between two numbers

    this.fillDiagonalLines1(ctx, x, y, currentStroke)
  }
}

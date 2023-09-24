import { background } from '../canvas-studio/canvas/core/background'
import { fill } from '../canvas-studio/canvas/core/fill'
import { line } from '../canvas-studio/canvas/core/line'
import { stroke } from '../canvas-studio/canvas/core/stroke'
import { strokeWeight } from '../canvas-studio/canvas/core/strokeWeight'
import { DrawAlgorithmContext } from '../canvas-studio/canvas/interfaces'
import { random } from '../canvas-studio/canvas/math/random'
import AnimatedDrawableComponent from '../canvas-studio/engine/components/animated-drawable-component'
import Size from '../canvas-studio/engine/math/size'
import Vector2D from '../canvas-studio/engine/math/vector-2d'

type ColorPalette = string[]

export class KGrid extends AnimatedDrawableComponent {
  private readonly PALETTE_1: ColorPalette = ['#053B50', '#176B87', '#64CCC5', '#EEEEEE']
  private readonly PALETTE_2: ColorPalette = ['#C06C84', '#355C7D', '#F67280']
  private readonly PALETTE_3: ColorPalette = ['#00B8A9', '#F6416C', '#FFDE7D', '#F8F3D4']
  // private readonly PALLETE_4: ColorPalette = ['#000', '#FFF']

  private currentPalette!: ColorPalette
  private cellSize!: number
  private rows!: number
  private columns!: number
  private strokeSize!: number
  private cubeDrawnBoolean!: boolean[][]
  private visited!: boolean[][]
  private groups!: { col: number; row: number }[][]
  private cubeOccurance!: number
  private lineSpacing!: number

  constructor(position: Vector2D, size: Size) {
    super(position, size)
  }

  private init(): void {
    this.cellSize = Math.floor(random(2, 9)) * 5
    const rnd = Math.floor(this.size.width / this.cellSize)
    this.rows = rnd
    this.columns = rnd
    this.strokeSize = Math.ceil(this.cellSize / Math.ceil(random(12, 16)))
    this.cubeDrawnBoolean = Array(this.columns)
      .fill(null)
      .map(() => Array(this.rows).fill(false))
    this.visited = Array(this.columns)
      .fill(null)
      .map(() => Array(this.rows).fill(false))
    this.groups = []
    this.cubeOccurance = 0.5
    this.lineSpacing = this.cellSize / Math.floor(random(1, 5))
    this.currentPalette = random([this.PALETTE_1, this.PALETTE_2, this.PALETTE_3])
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.init()
    background(ctx, this.getBackgroundColor())
    this.createCubes()
    this.removeChildlessCubes()
    this.groupByConnectedCubes()

    for (let group of this.groups) {
      for (let cube of group) {
        this.fillCube(ctx, cube.col, cube.row)
      }
    }

    // Uncomment if needed
    // if (Math.random() > 0.5) {
    //     this.createLines();
    // }
  }

  private groupByConnectedCubes() {
    for (let col = 0; col < this.columns; col++) {
      for (let row = 0; row < this.rows; row++) {
        if (!this.visited[col][row] && this.cubeDrawnBoolean[col][row]) {
          let currentGroup: { col: number; row: number }[] = []
          this.dfs(col, row, currentGroup)
          if (currentGroup.length > 0) {
            this.groups.push(currentGroup)
          }
        }
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

  getBackgroundColor() {
    return this.currentPalette[this.currentPalette.length - 1] || '#000'
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

    this.fillDiagonalLines1(ctx, x, y)
  }

  createCubes() {
    for (let col = 0; col < this.columns; col++) {
      for (let row = 0; row < this.rows; row++) {
        if (this.cubeOccurance === 1 || random(1) > this.cubeOccurance) {
          this.cubeDrawnBoolean[col][row] = true
        }
      }
    }
  }

  removeChildlessCubes() {
    let toBeRemoved = []

    for (let col = 0; col < this.columns; col++) {
      for (let row = 0; row < this.rows; row++) {
        if (this.cubeDrawnBoolean[col][row]) {
          let hasNeighbor = false

          // Check top neighbor
          if (row > 0 && this.cubeDrawnBoolean[col][row - 1]) {
            hasNeighbor = true
          }

          // Check bottom neighbor
          if (row < this.rows - 1 && this.cubeDrawnBoolean[col][row + 1]) {
            hasNeighbor = true
          }

          // Check left neighbor
          if (col > 0 && this.cubeDrawnBoolean[col - 1][row]) {
            hasNeighbor = true
          }

          // Check right neighbor
          if (col < this.columns - 1 && this.cubeDrawnBoolean[col + 1][row]) {
            hasNeighbor = true
          }

          // If the cube doesn't have any neighbors, mark it for removal
          if (!hasNeighbor) {
            toBeRemoved.push([col, row])
          }
        }
      }
    }

    // Remove cubes that are marked for removal
    toBeRemoved.forEach((coords) => {
      this.cubeDrawnBoolean[coords[0]][coords[1]] = false
    })
  }

  dfs(col: number, row: number, currentGroup: { col: number; row: number }[]) {
    // Check out-of-boundary and if the cube is drawn
    if (col < 0 || row < 0 || col >= this.columns || row >= this.rows || this.visited[col][row] || !this.cubeDrawnBoolean[col][row]) {
      return
    }

    // Mark the cube as visited
    this.visited[col][row] = true
    currentGroup.push({ col, row })

    // Visit all neighboring cubes
    this.dfs(col - 1, row, currentGroup) // left
    this.dfs(col + 1, row, currentGroup) // right
    this.dfs(col, row - 1, currentGroup) // up
    this.dfs(col, row + 1, currentGroup) // down
  }
}

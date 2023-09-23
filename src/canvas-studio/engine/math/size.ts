import Vector2D from './vector-2d'

class Size extends Vector2D {
  constructor(width: number, height: number) {
    super(width, height)
  }

  get width(): number {
    return this.x
  }

  set width(value: number) {
    this.x = value
  }

  get height(): number {
    return this.y
  }

  set height(value: number) {
    this.y = value
  }
}

export default Size

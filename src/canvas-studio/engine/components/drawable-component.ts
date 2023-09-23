import type Component from '.'
import { DrawAlgorithmContext } from '../../canvas/interfaces'
import type Size from '../math/size'
import type Vector2D from '../math/vector-2d'

abstract class DrawableComponent implements Component {
  position: Vector2D
  size: Size

  constructor(position: Vector2D, size: Size) {
    this.position = position
    this.size = size
  }

  abstract draw(ctx: DrawAlgorithmContext): void

  abstract update(deltaTime: number): void
}

export default DrawableComponent

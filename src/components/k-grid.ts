import { fill } from '../canvas-studio/canvas/core/fill'
import { rect } from '../canvas-studio/canvas/core/rect'
import { DrawAlgorithmContext } from '../canvas-studio/canvas/interfaces'
import AnimatedDrawableComponent from '../canvas-studio/engine/components/animated-drawable-component'
import Size from '../canvas-studio/engine/math/size'
import Vector2D from '../canvas-studio/engine/math/vector-2d'

export class KGrid extends AnimatedDrawableComponent {
  constructor(position: Vector2D, size: Size) {
    super(position, size)
  }

  draw(ctx: DrawAlgorithmContext): void {
    const width = this.size.width
    const height = this.size.height

    fill(ctx, 'black')
    rect(ctx, 0, 0, width, height)
  }

  update(deltaTime: number): void {
    // throw new Error('Method not implemented.')
  }
}

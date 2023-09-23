import Component from '.'
import { DrawAlgorithmContext } from '../../canvas/interfaces'
import Size from '../math/size'
import Vector2D from '../math/vector-2d'

/**
 * AnimationComponent is a Component that represents an animation in the game
 *
 * An animation is typically made up of a series of frames, and the AnimationComponent
 * keeps track of the current frame and the time elapsed since the last frame was displayed.
 *
 * The update() function is used to advance the animation to the next frame.
 */
abstract class AnimatedDrawableComponent implements Component {
  position: Vector2D
  size: Size

  constructor(position: Vector2D, size: Size) {
    this.position = position
    this.size = size
  }

  abstract draw(ctx: DrawAlgorithmContext): void

  abstract update(deltaTime: number): void
}

export default AnimatedDrawableComponent

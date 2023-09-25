import { fill } from '../../../gl/core/fill'
import { point } from '../../../gl/core/point'
import { rect } from '../../../gl/core/rect'
import { DrawAlgorithmContext } from '../../../gl/interfaces'
import { mag } from '../../../gl/math/mag'
import PerlinNoise3D from '../../../gl/math/perlin-noise'
import type Size from '../../math/size'
import type Vector2D from '../../math/vector-2d'
import AnimatedDrawableComponent from '../animated-drawable-component'

export type ShapeType = 'rectangle' | 'circle'

/**
 * An example of a ShapeComponent that draws a rectangle or circle using the DrawableComponent abstract class.
 */
class ProtogylphComponent extends AnimatedDrawableComponent {
  amplitude: number = 5
  scale: number = 1
  intensity: number = 5000
  radius: number = 0
  noiseScale: number = 0.05
  perlin: PerlinNoise3D

  constructor(position: Vector2D, size: Size) {
    super(position, size)
    this.radius = this.size.width / this.scale / 2
    this.perlin = new PerlinNoise3D()
    this.perlin.noiseSeed(Math.random() * 1000)
  }

  draw(ctx: DrawAlgorithmContext): void {
    const width = this.size.width
    const height = this.size.height

    fill(ctx, 'white')
    rect(ctx, 0, 0, width, height)

    for (let y = -this.radius; y < this.radius; y++) {
      for (let x = -this.radius; x < this.radius; x++) {
        const random = this.perlin.get(
          (x / this.radius) * this.noiseScale,
          (y / this.radius) * this.noiseScale,
          mag(x, y) / this.radius - this.amplitude
        )

        const mod = Math.floor(Math.abs(random - 0.5) * this.intensity)
        if (mod % 2 == 0) {
          fill(ctx, 'black')
          point(ctx, x + this.radius, y + this.radius)
        }
      }
    }
  }

  update(deltaTime: number): void {
    // this.amplitude += 0.1
  }
}

export default ProtogylphComponent

import { Canvas } from './interfaces'

/**
 * An abstract canvas that can be used to draw on.
 */
abstract class CanvasImplementation<T, C> implements Canvas<T, C> {
  width: number
  height: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }

  createCanvas(): T {
    throw new Error('Method not implemented.')
  }

  getContext(): C {
    throw new Error('Method not implemented.')
  }

  getCanvas(): T {
    throw new Error('Method not implemented.')
  }

  getContext2D(): C {
    throw new Error('Method not implemented.')
  }
}

export default CanvasImplementation

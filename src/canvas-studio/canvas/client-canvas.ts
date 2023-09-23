import CanvasImplementation from './canvas'

/**
 * ClientCanvas is a wrapper around the core client-side Canvas API
 *
 * The Canvas API provides a means for drawing graphics via JavaScript and the HTML <canvas> element
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
 */
class ClientCanvas extends CanvasImplementation<HTMLCanvasElement, CanvasRenderingContext2D> {
  id: string
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  constructor(width: number, height: number, id: string) {
    super(width, height)
    this.id = id
    this.canvas = this.createCanvas()
    this.ctx = this.getContext()
  }

  /**
   * Connects to an existing canvas element, or creates a new one if it doesn't exist.
   *
   * @issues document.createElement("canvas") forces new creation of canvas if it doesn't exists. This can lead to
   *         issues where canvas element is randomly created. Fix it!
   */
  createCanvas(): HTMLCanvasElement {
    let canvas = document.getElementById(this.id) as HTMLCanvasElement

    if (!canvas) {
      canvas = document.createElement('canvas')
      canvas.id = this.id
      document.body.appendChild(canvas)
    }

    canvas.width = this.width
    canvas.height = this.height

    return canvas
  }

  getContext(): CanvasRenderingContext2D {
    return this.canvas.getContext('2d')!
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas
  }

  getContext2D(): CanvasRenderingContext2D {
    return this.ctx
  }

  clear(): void {
    this.getContext().clearRect(0, 0, this.width, this.height)
  }
}

export default ClientCanvas

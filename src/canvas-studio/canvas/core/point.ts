import { type DrawAlgorithmContext } from '../interfaces'
import { rect } from './rect'

export const point = (ctx: DrawAlgorithmContext, x: number, y: number) => {
  rect(ctx, x, y, 1, 1)
}

export const line = (ctx: DrawAlgorithmContext, x1: number, y1: number, x2: number, y2: number) => {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}

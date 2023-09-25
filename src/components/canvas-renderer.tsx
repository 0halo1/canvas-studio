// canvas-studio/canvas-renderer.tsx

import { useEffect, useState } from 'react'

import { getCanvas, getCanvasContext, initCanvas } from '../canvas-studio/engine/canvas'
import Entity from '../canvas-studio/engine/entity/entity'

type CanvasRendererOptions = {
  id: string
  debugEngine?: boolean
  width: number
  height: number
  iterations: number
  entity: Entity
}

export const CanvasRenderer = ({ options }: { options: CanvasRendererOptions }) => {
  const [id] = useState(options.id)
  const [width] = useState(options.width)
  const [height] = useState(options.height)
  const [debugEngine] = useState(options.debugEngine)
  const [iterations] = useState(options.iterations)
  const [entity] = useState(options.entity)

  useEffect(() => {
    if (debugEngine) {
      console.log('Initializing the Engine... Give this a few moments.')
    }

    // Initialize the Canvas setting
    try {
      console.log(id, width, height)
      initCanvas(id, width, height)
    } catch (e) {
      console.error('initCanvas-failed', e)
    }

    if (debugEngine) {
      console.log('Canvas was succesfully initialized...')
    }

    // For each iteration, render the engine and update the image, hence, we get new images for each iteration.
    for (let i = 0; i < iterations; i++) {
      if (debugEngine) {
        console.log(`Rendering iteration ${i + 1}`)
      }

      // Render the engine
      entity.draw(getCanvasContext(id))

      // Update the image
      const img = document.getElementById(`${id}-img-${i}`) as HTMLImageElement
      if (img) {
        img.src = getCanvas(id).toDataURL()
      }
    }
  }, [])

  return <canvas id={id} className='border border-border hidden' />
}

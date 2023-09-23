// canvas-studio/useEngineLoop.tsx

import { useEffect } from 'react'
import { EngineLoopOptions } from './types'
import Engine from './engine/engine'

/**
 * Options for the useEngineLoop hook.
 *
 * @todo should Engine & debug be here or inside EngineLoopOptions
 */
interface UseEngineLoopOptions extends EngineLoopOptions {
  engine: Engine | null
  debug: boolean
}

/**
 * A React hook that will run the game loop for the given engine.
 *
 * @param engine The engine to run the game loop for.
 * @param fps The number of frames per second to run the game loop at.
 * @param debug Whether or not to log debug information about the game loop.
 *
 * @todo Add a way to pause the game loop.
 * @todo Add a way to resume the game loop.
 * @todo Add a way to stop the game loop.
 * @todo Add a way to start the game loop.
 * @todo Add a way to restart the game loop.
 */
export const useEngineLoop = ({ engine, fps, debug }: UseEngineLoopOptions) => {
  useEffect(() => {
    if (engine === null) {
      return
    }

    // Log debug information
    if (debug) {
      console.log(`Starting game loop for engine at ${fps} fps.`)
    }

    // Calculate the frame duration
    const frameDuration = 1000 / fps
    let lastTime = performance.now()

    // The game loop
    const gameLoop = (timestamp: number) => {
      const deltaTime = timestamp - lastTime

      if (deltaTime >= frameDuration) {
        // Update the game state
        engine.update(deltaTime)

        // Render the game state
        engine.render()

        // Reset the last time
        lastTime = timestamp
      }

      // Request the next frame
      window.requestAnimationFrame(gameLoop)
    }

    // Start the game loop
    const animationFrameId = window.requestAnimationFrame(gameLoop)

    // Cleanup function
    return () => {
      if (debug) {
        console.log(`Closing game loop for engine.`)
      }
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [engine, fps])
}

// canvas-studio/useEngine.tsx

import { useEffect, useState } from 'react'

import { EngineOptions, EngineOptionsResolved } from './types'
import Engine from './engine/engine'

export const useEngine = ({ options }: { options: EngineOptions }) => {
  const [engineRef, setEngineRef] = useState<{ current: null | Engine }>({
    current: null,
  })

  // Compose in the generic options to the user options
  const resolvedOptions: EngineOptionsResolved = {
    // Add defaults here.
    entities: options.entities || [],
    debugEngine: options.debugEngine || false,
    createEngine: options.createEngine || ((width: number, height: number, id: string) => new Engine(width, height, id)),
    ...options,
  }

  useEffect(() => {
    if (resolvedOptions.debugEngine) {
      console.log('Initializing the Engine... Give this a few moments.')
    }

    const { createEngine, width, height, id } = resolvedOptions

    // Create a new Engine and store it in state
    const engine = createEngine(width, height, id)

    // Add the entities to the engine
    resolvedOptions.entities.forEach((entity) => engine.getEntityManager().addEntity(entity))

    // Store the engine in state
    setEngineRef({ current: engine })

    if (resolvedOptions.debugEngine) {
      console.log('Engine was succesfully created...')
    }
  }, [])

  useEffect(() => {
    if (!engineRef.current) return
    engineRef.current.render()
  }, [engineRef.current])

  return engineRef.current
}

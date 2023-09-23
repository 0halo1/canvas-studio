import Engine from './engine/engine'
import Entity from './engine/entity/entity'
import { PartialKeys } from './utils/partial-keys'

export interface EngineOptions extends PartialKeys<EngineLoopOptions, 'fps'>, PartialKeys<EngineCoreOptions, 'createEngine'> {
  entities?: Entity[]
  debugLoop?: boolean
  debugEngine?: boolean
}

export interface EngineOptionsResolved extends EngineLoopOptions, EngineCoreOptions {
  entities: Entity[]
  debugLoop: boolean
  debugEngine: boolean
}

export interface EngineCoreOptions {
  id: string
  width: number
  height: number
  createEngine: (width: number, height: number, id: string) => Engine
}

export interface EngineLoopOptions {
  fps: number
}

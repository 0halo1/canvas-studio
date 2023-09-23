import Engine from './engine/engine'
import Entity from './engine/entity/entity'
import { PartialKeys } from './utils/partial-keys'

export interface EngineOptions extends PartialKeys<EngineCoreOptions, 'createEngine'> {
  entities?: Entity[]
  debugEngine?: boolean
}

export interface EngineOptionsResolved extends EngineCoreOptions {
  entities: Entity[]
  debugEngine: boolean
}

export interface EngineCoreOptions {
  id: string
  width: number
  height: number
  iterations: number
  createEngine: (width: number, height: number, id: string) => Engine
}

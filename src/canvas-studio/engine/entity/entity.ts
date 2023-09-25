import { DrawAlgorithmContext } from '../../gl/interfaces'
import type Component from '../components'

/**
 * Entity is a class that represents an entity in the ECS system
 *
 * An entity is simply a unique identifier used to group together different components
 */
class Entity {
  readonly id: number
  components: Map<string, Component>

  constructor(id: number) {
    this.id = id
    this.components = new Map<string, Component>()
  }

  addComponent(component: Component): void {
    this.components.set(component.constructor.name, component)
  }

  getComponent<T extends Component>(componentConstructor: { new (...args: any[]): T }): T | undefined {
    return this.components.get(componentConstructor.name) as T | undefined
  }

  hasComponent<T extends Component>(componentConstructor: { new (...args: any[]): T }): boolean {
    return this.components.has(componentConstructor.name)
  }

  draw(ctx: DrawAlgorithmContext): void {
    this.components.forEach((component) => component.draw(ctx))
  }

  update(deltaTime: number): void {
    this.components.forEach((component) => component.update(deltaTime))
  }
}

export default Entity

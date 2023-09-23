import ClientCanvas from '../canvas/client-canvas'
import EntityManager from './entity/entity-manager'

class Engine {
  private canvas: ClientCanvas
  private entityManager: EntityManager

  constructor(width: number, height: number, id: string) {
    this.canvas = new ClientCanvas(width, height, id)
    this.entityManager = new EntityManager()
  }

  update(deltaTime: number): void {
    this.entityManager.getEntities().forEach((entity) => entity.update(deltaTime))
  }

  render(): void {
    const context = this.canvas.getContext()
    this.canvas.clear()
    this.entityManager.getEntities().forEach((entity) => entity.draw(context))
  }

  getClientCanvas(): ClientCanvas {
    return this.canvas
  }

  getEntityManager(): EntityManager {
    return this.entityManager
  }
}

export default Engine

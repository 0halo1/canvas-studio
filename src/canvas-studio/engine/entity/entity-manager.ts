import type Entity from './entity'

class EntityManager {
  private entities: Entity[] = []

  addEntity(entity: Entity): void {
    this.entities.push(entity)
  }

  removeEntity(entity: Entity): void {
    this.entities = this.entities.filter((e) => e.id !== entity.id)
  }

  getEntities(): Entity[] {
    return this.entities
  }

  getEntityById(id: number): Entity | undefined {
    return this.entities.find((e) => e.id === id)
  }
}

export default EntityManager

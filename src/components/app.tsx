import Entity from '../canvas-studio/engine/entity/entity'
import Size from '../canvas-studio/engine/math/size'
import Vector2D from '../canvas-studio/engine/math/vector-2d'
import { CanvasRenderer } from './canvas-renderer'
import { KGrid } from './k-grid'

const constants = {
  canvasWidth: 400,
  canvasHeight: 400,
  iterations: 8,
  id: 'canvas-studio',
}

export const createKGridEntity = (id: number): Entity => {
  const entity = new Entity(id)
  entity.addComponent(new KGrid(new Vector2D(0, 0), new Size(constants.canvasWidth, constants.canvasHeight)))
  return entity
}

export const App = () => {
  return (
    <div className='bg-background min-h-screen'>
      <div className='p-md grid grid-cols-4 items-center justify-center border border-accents_7 rounded-tertiary'>
        {[...Array(constants.iterations)].map((_, i) => (
          <img
            key={`${constants.id}-img-${i}`}
            id={`${constants.id}-img-${i}`}
            className='border border-accents_7 rounded-tertiary'
            width={400}
            height={400}
          />
        ))}
      </div>
      <CanvasRenderer
        options={{
          id: constants.id,
          debugEngine: true,
          width: constants.canvasWidth,
          height: constants.canvasHeight,
          iterations: constants.iterations,
          entity: createKGridEntity(0),
        }}
      />
    </div>
  )
}

import Engine from '../canvas-studio/engine/engine'
import Entity from '../canvas-studio/engine/entity/entity'
import Size from '../canvas-studio/engine/math/size'
import Vector2D from '../canvas-studio/engine/math/vector-2d'
import { useEngine } from '../canvas-studio/use-engine'
import { KGrid } from './k-grid'

export const createKGridEntity = (id: number): Entity => {
  const entity = new Entity(id)
  entity.addComponent(new KGrid(new Vector2D(0, 0), new Size(400, 400)))
  return entity
}

export const App = () => {
  const engine = useEngine({
    options: {
      id: 'canvas-studio-0',
      debugLoop: false,
      animate: false,
      debugEngine: false,
      width: 400,
      height: 400,
      entities: [createKGridEntity(0)],
      createEngine: (width: number, height: number, id: string) => new Engine(width, height, id),
    },
  })

  return (
    <div className='bg-background min-h-screen'>
      <div className='p-md h-screen grid grid-cols-4 items-center justify-center border border-accents_7 rounded-tertiary'>
        {[...Array(8)].map((_, i) => (
          <canvas id={`canvas-studio-${i}`} width={400} height={400} className='border border-border' />
        ))}
      </div>
    </div>
  )
}

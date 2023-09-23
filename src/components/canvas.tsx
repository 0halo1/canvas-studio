import ProtogylphComponent from '../canvas-studio/engine/components/examples/protoglyph-component'
import Engine from '../canvas-studio/engine/engine'
import Entity from '../canvas-studio/engine/entity/entity'
import Size from '../canvas-studio/engine/math/size'
import Vector2D from '../canvas-studio/engine/math/vector-2d'
import { useEngine } from '../canvas-studio/useEngine'

export const createProtoglyphEntity = (id: number): Entity => {
  const entity = new Entity(id)
  entity.addComponent(new ProtogylphComponent(new Vector2D(0, 0), new Size(400, 400)))
  return entity
}

export const App = () => {
  const engine = useEngine({
    options: {
      id: 'canvas-studio',
      debugLoop: true,
      debugEngine: true,
      width: 400,
      height: 400,
      entities: [createProtoglyphEntity(0)],
      createEngine: (width: number, height: number, id: string) => new Engine(width, height, id),
    },
  })

  return (
    <div className='bg-background min-h-screen'>
      <div className='p-md h-screen flex items-center justify-center border border-accents_7 rounded-tertiary'>
        <canvas
          id='canvas-studio'
          width={400}
          height={400}
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-border'
        />
      </div>
    </div>
  )
}

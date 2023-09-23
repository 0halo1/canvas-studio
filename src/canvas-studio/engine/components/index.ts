import { DrawAlgorithmContext } from '../../canvas/interfaces'

/**
 * In a game using an Entity-Component-System (ECS) architecture, the components you need
 * will depend on the specific requirements of your game. Some common components that can be
 * found in many games are:
 *
 * VelocityComponent: Holds the velocity vector (speed and direction) of an entity.
 * AccelerationComponent: Holds the acceleration vector of an entity.
 * SpriteComponent: Holds the image or sprite data for rendering an entity.
 * AnimationComponent: Holds the data required for animating a sprite, such as frame duration, frame sequence, and playback mode.
 * CollisionComponent: Holds information about the entity's collision shape, such as bounding box or bounding circle, and any related properties like restitution (bounciness).
 * InputComponent: Holds the data required to process user input, such as key bindings or touch controls.
 * HealthComponent: Holds the entity's health points and manages damage, healing, or death.
 * SoundComponent: Contains the data required to play sound effects associated with the entity.
 * AIComponent: Contains the data and logic required for implementing artificial intelligence or behavior for non-player characters.
 * CameraComponent: Holds the data required for controlling the game camera, such as position, zoom, and rotation.
 *
 * These are just a few examples of the many components that could be used in a game. The components you choose will depend on the specific features and mechanics you want to implement in your game. The beauty of the ECS architecture is that it allows you to easily add or remove components as needed, making it highly flexible and modular.
 */
interface Component {
  draw(ctx: DrawAlgorithmContext): void
  update(deltaTime: number): void
}

export default Component

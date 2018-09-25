import Scene from '../../../gamekit/src/Core/Scene';
import Entity from '../../../gamekit/src/Core/Entity';
import IEntity from '../../../gamekit/src/Core/interfaces/IEntity';

export default class Net extends Entity {
  
  constructor({id, color}: IEntity) {
    super({id, color})
  }

  update(scene: Scene) {}

  draw(scene: any) {
    scene.context.fillStyle = 'white';
    for (var i = 0; i < scene.canvas.height; i += 41) {
      scene.context.fillRect(scene.canvas.width / 2 - 1, i, 2, 25);
    }
  }
}
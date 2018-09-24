import IScene from '../Framework/interfaces/IScene';
import Entity from '../Framework/Entity';
import IEntity from '../Framework/interfaces/IEntity';

export default class Net extends Entity {
  
  constructor({id, color}: IEntity) {
    super({id, color})
  }

  update(scene: IScene) {}

  draw(scene: IScene) {
    scene.context.fillStyle = 'white';
    for (var i = 0; i < scene.canvas.height; i += 41) {
      scene.context.fillRect(scene.canvas.width / 2 - 1, i, 2, 25);
    }
  }
}
import {
  IScene,
  IEntity,
} from '../../../gamekit/src/Core/Interfaces';
import {
  Entity
} from '../../../gamekit/src';
import config from '../Config';

export default class Net extends Entity {
  
  constructor({id, color}: IEntity) {
    super({id, color})
  }

  update(scene: IScene) {}

  draw(scene: IScene) {

    for (var i = 0; i < scene.canvas.height; i += 41) {
      scene.rect({
        color: 'white',
        x: config.SCENE_WIDTH / 2 - 1,
        y: i,
        width: 2,
        height: 25
      });
    }
  }
}
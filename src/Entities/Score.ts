import {
  IScene,
  IEntity
} from '../../../gamekit/src/Core/interfaces';
import {
  Entity,
} from '../../../gamekit/src';
import config from '../Config';

export default class Score extends Entity {
  
  player1Score: string = '0';
  player2Score: string = '0';
  
  constructor({id, color}: IEntity) {

    super({id, color});
  }

  update(scene: IScene) {}

  draw(scene: IScene) {

    scene.text({
      text: this.player1Score,
      color: 'white',
      x: 100,
      y: 100,
      font: 'Arial',
      fontSize: 15,
    });
    scene.text({
      text: this.player2Score,
      color: 'white',
      x: config.SCENE_WIDTH - 100,
      y: 100,
      font: 'Arial',
      fontSize: 15,
    });
  }
}
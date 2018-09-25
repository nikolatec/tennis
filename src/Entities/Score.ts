import Scene from '../../../gamekit/src/Core/Scene';
import Entity from '../../../gamekit/src/Core/Entity';
import IEntity from '../../../gamekit/src/Core/interfaces/IEntity';
import config from '../Config';

export default class Score extends Entity {
  
  player1Score: string = '0';
  player2Score: string = '0';
  
  constructor({id, color}: IEntity) {

    super({id, color})
  }

  update(scene: Scene) {

  }

  draw(scene: Scene) {

    scene.context.fillText(this.player1Score, 100, 100);
    scene.context.fillText(this.player2Score, config.SCENE_WIDTH - 100, 100);
  }
}
import Scene from '../Framework/Scene';
import Entity from '../Framework/Entity';
import IEntity from '../Framework/interfaces/IEntity';

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
    scene.context.fillText(this.player2Score, scene.canvas.width - 100, 100);
  }
}
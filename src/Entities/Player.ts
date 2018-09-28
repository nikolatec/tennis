import {
  IScene,
  IEntity
} from '../../../gamekit/src/Core/Interfaces';
import {
  Entity,
} from '../../../gamekit/src';
import config from '../Config';

export default class Player extends Entity {
  
  ai = false;

  constructor({id, color, x, y, width, height, ai = false}: IEntity & {ai?: boolean}) {

    super({id, color, x, y, width, height});
    this.ai = ai;
  }

  public update(scene: IScene) {

    if (this.ai) {
      const ball = this.getEntitiesById('ball')[0];
      this.playAi(ball);
    } 
  };

  public draw(scene: IScene) {

    scene.rect({
      color: this.color,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    });
  }

  private playAi(ball: Entity) {

    var distance = Math.abs(this.y + this.height / 2 - ball.y);
    var deltaY = Math.floor(distance * 0.15);

    // move down
    if (this.y + this.height / 2 < ball.y) {
      this.y += deltaY;

      // wall collision with ai player
      if (this.y > config.SCENE_HEIGHT - this.height) {
        this.y = config.SCENE_HEIGHT - this.height;
      }
    }
    // move up
    if (this.y + this.height / 2 > ball.y) {
      this.y -= deltaY;

      // wall collision with ai player
      if (this.y < 0) {
        this.y = 0;
      }
    }
  }
}
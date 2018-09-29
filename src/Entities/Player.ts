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

  constructor({node, point, transform, ai = false}: IEntity & {ai?: boolean}) {

    super({node, point, transform});
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
      color: this.node.color,
      x: this.point.x,
      y: this.point.y,
      width: this.transform.width,
      height: this.transform.height
    });
  }

  private playAi(ball: Entity) {

    var distance = Math.abs(this.point.y + this.transform.height / 2 - ball.point.y);
    var deltaY = Math.floor(distance * 0.15);

    // move down
    if (this.point.y + this.transform.height / 2 < ball.point.y) {
      this.point.y += deltaY;

      // wall collision with ai player
      if (this.point.y > config.SCENE_HEIGHT - this.transform.height) {
        this.point.y = config.SCENE_HEIGHT - this.transform.height;
      }
    }
    // move up
    if (this.point.y + this.transform.height / 2 > ball.point.y) {
      this.point.y -= deltaY;

      // wall collision with ai player
      if (this.point.y < 0) {
        this.point.y = 0;
      }
    }
  }
}
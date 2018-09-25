import IEntity from '../../../gamekit/src/Core/Interfaces/IEntity';
import Entity from '../../../gamekit/src/Core/Entity';
import Scene from '../../../gamekit/src/Core/Scene';
import config from '../Config';

export default class Player extends Entity {
  
  ai = false;

  constructor({id, color, x, y, width, height, ai = false}: IEntity & {ai?: boolean}) {

    super({id, color, x, y, width, height});
    this.ai = ai;
  }

  public update(scene: Scene) {

    if (this.ai) {
      const ball = this.getEntitiesById('ball')[0];
      this.playAi(scene, ball);
    } 
  };

  public draw(scene: Scene) {

    scene.context.fillStyle = this.color;
    scene.context.shadowBlur = 20;
    scene.context.shadowColor = this.color;
    scene.context.fillRect(this.x, this.y,  this.width, this.height);
  }

  private playAi(scene: Scene, ball: Entity) {

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
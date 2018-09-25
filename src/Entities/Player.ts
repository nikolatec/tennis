import IEntity from '../Framework/Interfaces/IEntity';
import Entity from '../Framework/Entity';
import Scene from '../Framework/Scene';

export default class Player extends Entity {
  ai = false;

  constructor({id, color, x, y, width, height, ai = false}: IEntity & {ai?: boolean}) {
    super({id, color, x, y, width, height});
    this.ai = ai;
  }

  public draw(scene: Scene) {
    scene.context.fillStyle = this.color;
    scene.context.shadowBlur = 20;
    scene.context.shadowColor = this.color;
    scene.context.fillRect(this.x, this.y,  this.width, this.height);
  }

  public update(scene: Scene) {
    if (this.ai) {
      const ball = this.getEntitiesById('ball')[0];
      this.playAi(scene, ball);
    } 
  };

  private playAi(scene: Scene, ball: Entity) {
    var distance = Math.abs(this.y + this.height / 2 - ball.y);
    var deltaY = Math.floor(distance * 0.15);

    // move down
    if (this.y + this.height / 2 < ball.y) {
      this.y += deltaY;

      // wall collision with ai player
      if (this.y > scene.canvas.height - this.height) {
        this.y = scene.canvas.height - this.height;
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
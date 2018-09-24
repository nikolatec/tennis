import IEntity from '../Framework/Interfaces/IEntity';
import Entity from '../Framework/Entity';
import Scene from '../Framework/Scene';
import config from '../Config';

export default class Ball extends Entity {

  constructor({id, color, x, y, width, height, xVelocity, yVelocity}: IEntity) {
    super({id, color, x, y, width, height, xVelocity, yVelocity});
  }

  public update(scene: Scene) {
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    const player1 = this.getEntityById('player1');
    const player2 = this.getEntityById('player2');
    const score = this.getEntityById('score');

    this.handlePlayerCollision(scene, player1, player2);
    this.handleVoid(scene, score);
    this.handleVerticalWalls(scene);
  }

  private handleVoid(scene: Scene, score: any) {
    if (this.x > scene.canvas.width) {
      this.resetBall(scene);
      this.xVelocity = -this.xVelocity;
      score.player1Score++;
    }
    if (this.x < 0) {
      this.resetBall(scene);
      this.xVelocity = -this.xVelocity;
      score.player2Score++;
    }
  }

  private handleVerticalWalls(scene: Scene) {
    if (this.y > scene.canvas.height) {
      this.yVelocity = -this.yVelocity;
    }
    if (this.y < 0) {
      this.yVelocity = -this.yVelocity;
    }
  }

  private handlePlayerCollision(scene: Scene, player1: any, player2: any) {
    if (this.x < config.PADDING + player1.width + this.width) {
      if (this.y > player1.y && this.y < player1.y + player1.height) {
        this.xVelocity = -this.xVelocity;
        this.handlePlayer1Angle(player1);
      }
    }
    if (this.x > scene.canvas.width - (config.PADDING + player2.width + this.width)) {
      if (this.y > player2.y && this.y < player2.y + player2.height) {
        this.xVelocity = -this.xVelocity;
        this.handlePlayer2Angle(player2);
      }
    }
  }

  private handlePlayer1Angle(player1: any) {
    // speed up ball on edges
    var deltaY = this.y - (player1.y + player1.height / 2);
    this.yVelocity = deltaY * 0.15;
  }

  private handlePlayer2Angle(player2: any) {
    // speed up ball on edges
    var deltaY = this.y - (player2.y + player2.height / 2);
    this.yVelocity = deltaY * 0.15;
  }

  private resetBall(scene: Scene) {
    this.x = scene.canvas.width / 2;
    this.y = scene.canvas.height / 2;
  }

  public draw(scene: Scene) {
    scene.context.shadowBlur = 20;
    scene.context.shadowColor = this.color;
    scene.context.fillStyle = this.color;
    scene.context.beginPath();
    scene.context.arc(this.x, this.y, this.width, 0, Math.PI * 2, true);
    scene.context.fill();
  }
}
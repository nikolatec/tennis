import {
  IEntity,
  IScene
}from '../../../gamekit/src/Core/Interfaces';
import {
  Entity,
} from '../../../gamekit/src';
import Player from './Player';
import config from '../Config';

export default class Ball extends Entity {

  constructor({id, color, x, y, width, height, xVelocity, yVelocity}: IEntity) {

    super({id, color, x, y, width, height, xVelocity, yVelocity});
  }

  public update(scene: IScene) {

    this.x += this.xVelocity;
    this.y += this.yVelocity;

    const player1 = this.getEntitiesById('player1')[0];
    const player2 = this.getEntitiesById('player2')[0];
    const score = this.getEntitiesById('score')[0];

    this.handlePlayerCollision(scene, player1, player2);
    this.handleVoid(score);
    this.handleVerticalWalls(scene);
  }

  private handleVoid(score: any) {

    if (this.x > config.SCENE_WIDTH) {
      this.resetBall();
      this.xVelocity = -this.xVelocity;
      score.player1Score++;
    }
    if (this.x < 0) {
      this.resetBall();
      this.xVelocity = -this.xVelocity;
      score.player2Score++;
    }
  }

  private handleVerticalWalls(scene: IScene) {

    if (this.y > config.SCENE_HEIGHT) {
      this.yVelocity = -this.yVelocity;
    }
    if (this.y < 0) {
      this.yVelocity = -this.yVelocity;
    }
  }

  private handlePlayerCollision(scene: IScene, player1: any, player2: any) {

    if (this.x < config.PADDING + player1.width + this.width) {
      if (this.y > player1.y && this.y < player1.y + player1.height) {
        this.xVelocity = -this.xVelocity;
        this.speedBallOnEdge(player1);
      }
    }
    if (this.x > config.SCENE_WIDTH - (config.PADDING + player2.width + this.width)) {
      if (this.y > player2.y && this.y < player2.y + player2.height) {
        this.xVelocity = -this.xVelocity;
        this.speedBallOnEdge(player2);
      }
    }
  }

  private speedBallOnEdge(player: Player) {

    const deltaY = this.y - (player.y + player.height / 2);
    this.yVelocity = deltaY * 0.15;
  }

  private resetBall() {

    this.x = config.SCENE_WIDTH / 2;
    this.y = config.SCENE_HEIGHT / 2;
  }

  public draw(scene: IScene) {
    
    scene.arc({color: this.color, x: this.x, y: this.y, radius: this.width, startAngle: 0, endAngle: Math.PI * 2, close: true});
  }
}
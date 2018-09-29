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

  constructor({node, point, transform, velocity}: IEntity) {

    super({node, point, transform, velocity});
  }

  public update(scene: IScene) {

    this.point.x += this.velocity.x;
    this.point.y += this.velocity.y;

    const player1 = this.getEntitiesById('player1')[0];
    const player2 = this.getEntitiesById('player2')[0];
    const score = this.getEntitiesById('score')[0];

    this.handlePlayerCollision(scene, player1, player2);
    this.handleVoid(score);
    this.handleVerticalWalls(scene);
  }

  private handleVoid(score: any) {

    if (this.point.x > config.SCENE_WIDTH) {
      this.resetBall();
      this.velocity.x = -this.velocity.x;
      score.player1Score++;
    }
    if (this.point.x < 0) {
      this.resetBall();
      this.velocity.x = -this.velocity.x;
      score.player2Score++;
    }
  }

  private handleVerticalWalls(scene: IScene) {

    if (this.point.y > config.SCENE_HEIGHT) {
      this.velocity.y = -this.velocity.y;
    }
    if (this.point.y < 0) {
      this.velocity.y = -this.velocity.y;
    }
  }

  private handlePlayerCollision(scene: IScene, player1: Player, player2: Player) {

    if (this.point.x < config.PADDING + player1.transform.width + this.transform.width) {
      if (this.point.y > player1.point.y && this.point.y < player1.point.y + player1.transform.height) {
        this.velocity.x = -this.velocity.x;
        this.speedBallOnEdge(player1);
      }
    }
    if (this.point.x > config.SCENE_WIDTH - (config.PADDING + player2.transform.width + this.transform.width)) {
      if (this.point.y > player2.point.y && this.point.y < player2.point.y + player2.transform.height) {
        this.velocity.x = -this.velocity.x;
        this.speedBallOnEdge(player2);
      }
    }
  }

  private speedBallOnEdge(player: Player) {

    const deltaY = this.point.y - (player.point.y + player.transform.height / 2);
    this.velocity.y = deltaY * 0.15;
  }

  private resetBall() {

    this.point.x = config.SCENE_WIDTH / 2;
    this.point.y = config.SCENE_HEIGHT / 2;
  }

  public draw(scene: IScene) {
    
    scene.arc({color: this.node.color, x: this.point.x, y: this.point.y, radius: this.transform.width, startAngle: 0, endAngle: Math.PI * 2, close: true});
  }
}
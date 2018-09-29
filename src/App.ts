import {
  Node,
  Point,
  Transform,
  Velocity,
  Game,
  CalculateMousePosition
} from '../../gamekit/src';
import Net from './Entities/Net';
import Player from './Entities/Player';
import Ball from './Entities/Ball';
import Score from './Entities/Score';
import config from './Config';

let player1 = new Player({
  node: new Node('player1', 'white'),
  point: new Point(config.PADDING, config.SCENE_HEIGHT / 2 - config.PLAYER_HEIGHT / 2),
  transform: new Transform(config.PLAYER_WIDTH, config.PLAYER_HEIGHT)
});

let player2 = new Player({
  node: new Node('player2', 'white'),
  point: new Point(config.SCENE_WIDTH - config.PADDING - config.PLAYER_WIDTH, config.SCENE_HEIGHT / 2 - config.PLAYER_HEIGHT / 2),
  transform: new Transform(config.PLAYER_WIDTH, config.PLAYER_HEIGHT),
  ai: true,
});

new Ball({
  node: new Node('ball', 'white'),
  point: new Point(config.SCENE_WIDTH / 2, config.SCENE_HEIGHT / 2),
  transform: new Transform(config.BALL_SIZE, config.BALL_SIZE),
  velocity: new Velocity(5, 5)
});

new Score({
  node: new Node('score', 'white')
});

new Net({
  node: new Node('net', 'white')
});

let game = Game.createGame({
  fps: config.FPS,
  showFps: true,
  width: config.SCENE_WIDTH,
  height: config.SCENE_HEIGHT,
});

function handleMouse(event: any) {
  const mousePosition = CalculateMousePosition(event);
  const halfHeight = player1.transform.height / 2;
  // limit player
  if (mousePosition.y > config.SCENE_HEIGHT - halfHeight || mousePosition.y < halfHeight) {
    return;
  }
  player1.point.y = mousePosition.y - halfHeight;
}

game.scene.canvas.addEventListener('mousemove', handleMouse);

window.onload = game.run;
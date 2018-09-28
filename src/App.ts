import {
  Game,
  CalculateMousePosition
} from '../../gamekit/src';
import Net from './Entities/Net';
import Player from './Entities/Player';
import Ball from './Entities/Ball';
import Score from './Entities/Score';
import config from './Config';

let player1 = new Player({
  id: 'player1',
  color: 'white',
  x: config.PADDING,
  y: config.SCENE_HEIGHT / 2 - config.PLAYER_HEIGHT / 2,
  width: config.PLAYER_WIDTH,
  height: config.PLAYER_HEIGHT,
});

let player2 = new Player({
  id: 'player2',
  color: 'white',
  x: config.SCENE_WIDTH - config.PADDING - config.PLAYER_WIDTH,
  y: config.SCENE_HEIGHT / 2 - config.PLAYER_HEIGHT / 2,
  width: config.PLAYER_WIDTH,
  height: config.PLAYER_HEIGHT,
  ai: true,
});

new Ball({
  id: 'ball',
  color: 'white',
  x: config.SCENE_WIDTH / 2,
  y: config.SCENE_HEIGHT / 2,
  width: config.BALL_SIZE,
  height: config.BALL_SIZE,
  xVelocity: 5,
  yVelocity: 5,
});

new Score({
  id: 'score',
  color: 'white'
});

new Net({
  id: 'net',
  color: 'white'
});

let game = Game.createGame({
  fps: config.FPS,
  showFps: true,
  width: config.SCENE_WIDTH,
  height: config.SCENE_HEIGHT,
});

function handleMouse(event: any) {
  const mousePosition = CalculateMousePosition(event);
  const halfHeight = player1.height / 2;
  // limit player
  if (mousePosition.y > config.SCENE_HEIGHT - halfHeight || mousePosition.y < halfHeight) {
    return;
  }
  player1.y = mousePosition.y - halfHeight;
}

game.scene.canvas.addEventListener('mousemove', handleMouse);

window.onload = game.run;
import Mob_Boss from "./mob-boss";
import Mob_Normal from "./mob-normal";
import IMob from "./mobs"
import { randomGridPosition } from '../../game-engine/gameboard-grid.util';
import { Wall } from '../Decorator/wall';

export class MobsFactory {
  mob:any;
  snake;
  static getMob(mob: string): IMob {
      if (mob == 'Boss Mob') {
          return new Mob_Boss()
      } else {
          return new Mob_Normal()
      }
  }
  constructor(snake: any, public walls: Wall) {
    this.snake = snake;
    this.mob = this.getRandomMobPosition();
  }

  update() {
    this.mob = this.getRandomMobPosition();
  }

  draw(gameBoard: any) {
    const healElement = document.createElement('div');
    healElement.style.gridRowStart = this.mob.y;
    healElement.style.gridColumnStart = this.mob.x;
    healElement.classList.add('mob');
    gameBoard.appendChild(healElement);
  }

  getRandomMobPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || this.snake.onSnake(newFoodPosition)  || this.walls.onObject(newFoodPosition)) {
      newFoodPosition = randomGridPosition()
    }
    return newFoodPosition;
  }
}

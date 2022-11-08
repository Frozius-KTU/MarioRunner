import { NONE_TYPE } from '@angular/compiler';
import { BlackBorderWallDecorator, Wall } from '../Decorator/wall';
import {
  IHeal,
  HealMapOne,
  HealMapThree,
  HealMapTwo,
} from '../PickUps/Heals-Factory/Heal';
import { IPowerUp, PowerUp1, PowerUp2, PowerUp3 } from './PowerUps';
import { GameBoardComponent } from 'src/app/game-board/game-board.component';

interface IPickUps extends IPowerUp, IHeal {}

export class PickUpsFactory {
  public snake;
  public wall;
  constructor(snake: any, wall: Wall) {
    this.snake = snake;
    this.wall = wall;
  }
  getPowerUps(level: number, gameBoard: GameBoardComponent) {
    if (level == 1) {
      console.log(1);
      return new PowerUp1(this.snake, this.wall);
    }
    if (level == 2) {
      console.log(2);
      return new PowerUp2(this.snake, this.wall);
    }
    if (level == 3) {
      console.log(3);
      return new PowerUp3(this.snake, this.wall);
    } else {
      return new PowerUp1(this.snake, this.wall);
    }
  }
  getHeals(level: number, gameBoard: GameBoardComponent) {
    if (level == 1) {
      console.log(1);
      return new HealMapOne(this.snake, this.wall);
    }
    if (level == 2) {
      console.log(2);
      var x = new HealMapTwo(this.snake, this.wall);
      return x;
    }
    if (level == 3) {
      console.log(3);
      return new HealMapThree(this.snake, this.wall);
    } else {
      return new HealMapOne(this.snake, this.wall);
    }
  }
}

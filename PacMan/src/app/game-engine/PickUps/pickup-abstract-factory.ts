import { NONE_TYPE } from '@angular/compiler';
import { BlackBorderWallDecorator, Wall } from '../Decorator/wall';
import { IHeal, HealMapOne, HealMapThree, HealMapTwo } from '../PickUps/Heals-Factory/Heal';
import { IPowerUp, PowerUp1, PowerUp2 , PowerUp3 } from '../PickUps/PowerUpsFactory/PowerUps';
import { GameBoardComponent } from 'src/app/game-board/game-board.component';
import { HealsFactoryCreator1, HealsFactoryCreator2, HealsFactoryCreator3} from '../PickUps/Heals-Factory/HealsFactoryCreator';
import { PowerUpsFactoryCreator1, PowerUpsFactoryCreator2, PowerUpsFactoryCreator3} from '../PickUps/PowerUpsFactory/PowerUpsFactoryCreator';

interface IPickUps extends IPowerUp, IHeal {}

export class PickUpsFactory {
  public snake;
  public wall;
  public powerup? : any;
  public heal? : any;
  constructor(snake: any, wall: Wall) {
    this.snake = snake;
    this.wall = wall;
  }
  getPowerUps(level: number, gameBoard: GameBoardComponent) {
    if (level == 1) {
      console.log(1);
      this.powerup = new PowerUpsFactoryCreator1(this.snake, this.wall);
      return this.powerup.factoryMethod1(this.snake, this.wall);
    }
    if (level == 2) {
      console.log(2);
      this.powerup = new PowerUpsFactoryCreator2(this.snake, this.wall);
      return this.powerup.factoryMethod2(this.snake, this.wall);
    }
    if (level == 3) {
      console.log(3);
      this.powerup = new PowerUpsFactoryCreator3(this.snake, this.wall);
      return this.powerup.factoryMethod3(this.snake, this.wall);
    } else {
      this.powerup = new PowerUpsFactoryCreator1(this.snake, this.wall);
      return this.powerup.factoryMethod1(this.snake, this.wall);
    }
  }
  getHeals(level: number, gameBoard: GameBoardComponent) {
    if (level == 1) {
      console.log(1);
      this.heal = new HealsFactoryCreator1(this.snake,this.wall);
      return this.heal.factoryMethod1(this.snake,this.wall);
    }
    if (level == 2) {
      console.log(2);
      this.heal = new HealsFactoryCreator2(this.snake,this.wall);
      return this.heal.factoryMethod2(this.snake,this.wall);
    }
    if (level == 3) {
      console.log(3);
      this.heal = new HealsFactoryCreator3(this.snake,this.wall);
      return this.heal.factoryMethod3(this.snake,this.wall);
    } else {
      this.heal = new HealsFactoryCreator1(this.snake,this.wall);
      return this.heal.factoryMethod1(this.snake,this.wall);
    }
  }
}

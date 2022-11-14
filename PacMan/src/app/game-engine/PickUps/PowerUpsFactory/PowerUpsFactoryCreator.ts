import { Wall } from '../../Decorator/wall';
import { IHeal } from '../Heals-Factory/Heal';
import { IPowerUp, PowerUp1, PowerUp2, PowerUp3 } from './PowerUps';

export class PowerUpsFactoryCreator1 {
  public snake;
  public wall;
  constructor(wall: Wall, snake: any) {
    this.snake = snake;
    this.wall = wall;
  }
  public factoryMethod1(snake: any, wall: any): IPowerUp {
    return new PowerUp1(snake, wall);
  }
}

export class PowerUpsFactoryCreator2 {
  public snake;
  public wall;
  constructor(wall: Wall, snake: any) {
    this.snake = snake;
    this.wall = wall;
  }
  public factoryMethod2(snake: any, wall: any): IPowerUp {
    return new PowerUp2(snake, wall);
  }
}

export class PowerUpsFactoryCreator3 {
  public snake;
  public wall;
  constructor(wall: Wall, snake: any) {
    this.snake = snake;
    this.wall = wall;
  }
  public factoryMethod3(snake: any, wall: any): IPowerUp {
    return new PowerUp3(snake, wall);
  }
}

import { Wall } from '../../Decorator/wall';
import { IPowerUp, PowerUp1, PowerUp2, PowerUp3 } from './PowerUps';
import {
  IHeal,
  HealMapOne,
  HealMapTwo,
  HealMapThree,
} from '../Heals-Factory/Heal';

export abstract class PickUpsFactory {
  public snake;
  public wall;
  constructor(snake: any, wall: Wall) {
    this.snake = snake;
    this.wall = wall;
  }
  public createPowerUp(snake: any, wall: any) {
    return;
  }
  public createHeal(snake: any, wall: any) {
    return;
  }
}
export class PickUpsFactoryMap1 extends PickUpsFactory {
  public override createPowerUp(snake: any, wall: any): IPowerUp {
    return new PowerUp1(snake, wall);
  }
  public override createHeal(snake: any, wall: any): IHeal {
    return new HealMapOne(snake, wall);
  }
}

export class PickUpsFactoryMap2 extends PickUpsFactory {
  public override createPowerUp(snake: any, wall: any): IPowerUp {
    return new PowerUp2(snake, wall);
  }
  public override createHeal(snake: any, wall: any): IHeal {
    return new HealMapTwo(snake, wall);
  }
}

export class PickUpsFactoryMap3 extends PickUpsFactory {
  public override createPowerUp(snake: any, wall: any): IPowerUp {
    return new PowerUp3(snake, wall);
  }
  public override createHeal(snake: any, wall: any): IHeal {
    return new HealMapThree(snake, wall);
  }
}

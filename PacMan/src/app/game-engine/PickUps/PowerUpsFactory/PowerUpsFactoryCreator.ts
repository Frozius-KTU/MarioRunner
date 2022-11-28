import { Wall } from '../../Environment/Decorator';
import { IPowerUp, PowerUp1, PowerUp2, PowerUp3 } from './PowerUps';
import {
  IHeal,
  HealMapOne,
  HealMapTwo,
  HealMapThree,
} from '../Heals-Factory/Heal';

export abstract class PickUpsFactory {
  public player;
  public wall;
  constructor(player: any, wall: Wall) {
    this.player = player;
    this.wall = wall;
  }
  public createPowerUp(player: any, wall: any) {
    return;
  }
  public createHeal(player: any, wall: any) {
    return;
  }
}
export class PickUpsFactoryMap1 extends PickUpsFactory {
  public override createPowerUp(player: any, wall: any): IPowerUp {
    return new PowerUp1(player, wall);
  }
  public override createHeal(player: any, wall: any): IHeal {
    return new HealMapOne(player, wall);
  }
}

export class PickUpsFactoryMap2 extends PickUpsFactory {
  public override createPowerUp(player: any, wall: any): IPowerUp {
    return new PowerUp2(player, wall);
  }
  public override createHeal(player: any, wall: any): IHeal {
    return new HealMapTwo(player, wall);
  }
}

export class PickUpsFactoryMap3 extends PickUpsFactory {
  public override createPowerUp(player: any, wall: any): IPowerUp {
    return new PowerUp3(player, wall);
  }
  public override createHeal(player: any, wall: any): IHeal {
    return new HealMapThree(player, wall);
  }
}

import { Wall } from '../../Environment/Decorator';
import { IHeal, HealMapOne, HealMapTwo, HealMapThree } from './Heal';

export class HealsFactoryCreator1 {
  public player;
  constructor(public wall: Wall, player: any) {
    this.player = player;
  }
  public factoryMethod1(player: any, wall: any): IHeal {
    return new HealMapOne(player, wall);
  }
}

export class HealsFactoryCreator2 {
  public player;
  constructor(public wall: Wall, player: any) {
    this.player = player;
  }
  public factoryMethod2(player: any, wall: any): IHeal {
    return new HealMapTwo(player, wall);
  }
}

export class HealsFactoryCreator3 {
  public player;
  constructor(public wall: Wall, player: any) {
    this.player = player;
  }
  public factoryMethod3(player: any, wall: any): IHeal {
    return new HealMapThree(player, wall);
  }
}

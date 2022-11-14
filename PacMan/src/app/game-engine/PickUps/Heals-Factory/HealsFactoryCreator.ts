import { ɵHttpInterceptingHandler } from "@angular/common/http";
import { Wall } from "../../Decorator/wall";
import { IHeal, HealMapOne, HealMapTwo, HealMapThree } from "./Heal";

export class HealsFactoryCreator1{
  public snake;
  constructor(public wall: Wall, snake : any) {
    this.snake = snake;
  }
  public factoryMethod1(snake :any,wall: any) : IHeal{
    return new HealMapOne(snake,wall);
  }
}

export class HealsFactoryCreator2{
  public snake;
  constructor(public wall: Wall, snake : any) {
    this.snake = snake;
  }
  public factoryMethod2(snake :any,wall: any) : IHeal{
    return new HealMapTwo(snake,wall);
  }
}

export class HealsFactoryCreator3{
  public snake;
  constructor(public wall: Wall, snake : any) {
    this.snake = snake;
  }
  public factoryMethod3(snake :any,wall: any) : IHeal{
    return new HealMapThree(snake,wall);
  }

}


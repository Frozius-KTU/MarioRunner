import { Decorator } from "./component";

/**
* Concrete Decorators call the wrapped object and alter its result in some way.
*/
export class ConcreteDecoratorA extends Decorator {
  /**
   * Decorators may call parent implementation of the operation, instead of
   * calling the wrapped object directly. This approach simplifies extension
   * of decorator classes.
   */
  public override operation(): string {
      return `ConcreteDecoratorA(${super.operation()})`;
  }
}

/**
* Decorators can execute their behavior either before or after the call to a
* wrapped object.
*/
export class ConcreteDecoratorB extends Decorator {
  public override operation(): string {
      return `ConcreteDecoratorB(${super.operation()})`;
  }
}







/**
 * The base Component interface defines operations that can be altered by
 * decorators.
 */
 interface Component {
  operation(): string;
}

/**
* Concrete Components provide default implementations of the operations. There
* might be several variations of these classes.
*/
export class ConcreteComponent implements Component {
  public operation(): string {
      return 'ConcreteComponent';
  }
}

/**
* The base Decorator class follows the same interface as the other components.
* The primary purpose of this class is to define the wrapping interface for all
* concrete decorators. The default implementation of the wrapping code might
* include a field for storing a wrapped component and the means to initialize
* it.
*/
export class Decorator implements Component {
  protected component: Component;

  constructor(component: Component) {
      this.component = component;
  }

  /**
   * The Decorator delegates all work to the wrapped component.
   */
  public operation(): string {
      return this.component.operation();
  }
}

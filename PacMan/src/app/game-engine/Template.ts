export abstract class AbstractClass {
  public templateMethod(): void {
    this.baseOperation();

    this.requiredOperations1();

    if (this.hookOperation2()) {
      this.requiredOperation2();
    }
  }

  protected baseOperation(): void {
    console.log('AbstractClass says: Base operation done');
  }

  protected abstract requiredOperations1(): void;

  protected abstract requiredOperation2(): void;

  protected hookOperation2(): boolean {
    return false;
  }
}

export class ConcreteClass1 extends AbstractClass {
  protected requiredOperations1(): void {
    console.log('ConcreteClass1 says: Implemented Operation1');
  }

  protected requiredOperation2(): void {
    console.log('ConcreteClass1 says: Implemented Operation2');
  }
}

export class ConcreteClass2 extends AbstractClass {
  protected requiredOperations1(): void {
    console.log('ConcreteClass2 says: Implemented Operation1');
  }

  protected requiredOperation2(): void {
    console.log('ConcreteClass2 says: Implemented Operation2');
  }

  protected override hookOperation2(): boolean {
    console.log('ConcreteClass2 says: Overridden Hook1');
    return true;
  }
}

export class Template {
  main() {
    function clientCode(abstractClass: AbstractClass) {
      // ...
      abstractClass.templateMethod();
      // ...
    }

    console.log('Same client code can work with different subclasses:');
    clientCode(new ConcreteClass1());
    console.log('');

    console.log('Same client code can work with different subclasses:');
    clientCode(new ConcreteClass2());
  }
}

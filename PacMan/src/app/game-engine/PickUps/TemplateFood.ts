import { randomGridPosition } from '../gameboard-grid.util';
import { Wall } from '../Environment/Decorator';

export abstract class AbstractFood {
  constructor(player: any, public walls: Wall) {
    this.player = player;
    this.food = this.getRandomFoodPosition();
  }

  food: any;
  player;

  public templateMethod(gameBoard: any): void {
    this.update();
    this.draw(gameBoard);
    if (this.hook()) {
      this.extra();
    }
  }

  protected update(): void {
    if (this.player.onPlayer(this.food)) {
      this.food = this.getRandomFoodPosition();
      this.addScore = 1;
    }
  }

  protected getRandomFoodPosition() {
    let newFoodPosition;
    while (
      newFoodPosition == null ||
      this.player.onPlayer(newFoodPosition) ||
      this.walls.onObject(newFoodPosition)
    ) {
      newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
  }

  set addScore(val: number) {
    this.player.score += val;
  }

  protected abstract draw(gameBoard: any): void;

  protected abstract extra(): void;

  protected hook(): boolean {
    return false;
  }
}

export class Food extends AbstractFood {
  protected draw(gameBoard: any) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = this.food.y;
    foodElement.style.gridColumnStart = this.food.x;
    //foodElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/rokey/fantastic-dream/32/disc-red-cane-icon.png')"
    //foodElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/mozco/kitchen/32/Beer-2-icon.png')"
    //foodElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/mozco/kitchen/32/Beer-1-icon.png')";
    foodElement.style.backgroundImage =
      "url('https://icons.iconarchive.com/icons/jeanette-foshee/simpsons-09/32/Food-Duff-beer-icon.png')";
    foodElement.style.backgroundSize = 'cover';
    foodElement.classList.add('foodas');
    gameBoard.appendChild(foodElement);
  }

  protected extra(): void {}
}

export class SuperFood extends AbstractFood {
  protected draw(gameBoard: any) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = this.food.y;
    foodElement.style.gridColumnStart = this.food.x;
    //foodElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/rokey/fantastic-dream/32/disc-red-cane-icon.png')"
    foodElement.style.backgroundImage =
      "url('https://icons.iconarchive.com/icons/mozco/kitchen/32/Beer-2-icon.png')";
    //foodElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/mozco/kitchen/32/Beer-1-icon.png')"
    //foodElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/jeanette-foshee/simpsons-09/32/Food-Duff-beer-icon.png')";
    foodElement.style.backgroundSize = 'cover';
    foodElement.classList.add('foodas');
    gameBoard.appendChild(foodElement);
  }

  protected extra(): void {
    //console.log('ConcreteClass2 says: Implemented Operation1');
  }

  protected override hook(): boolean {
    //console.log('ConcreteClass2 says: Overridden Hook1');
    return true;
  }
}

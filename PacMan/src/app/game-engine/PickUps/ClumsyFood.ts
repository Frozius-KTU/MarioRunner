import { randomGridPosition } from '../gameboard-grid.util';
import { Wall } from '../Decorator/wall';
import { IMoveAlgorithm } from '../MoveAlgorithm/IMoveAlgorithm';

export class ClumsyFood {
  EXPANSION_RATE = 1;
  ClumsyFood: any;
  snake;
  clumsyInput?: IMoveAlgorithm;
  constructor(snake: any, public walls: Wall, clumsyInput: IMoveAlgorithm) {
    this.snake = snake;
    this.ClumsyFood = this.getRandomFoodPosition();
    this.clumsyInput = clumsyInput;
  }

  update(blob1?: any, blob2?: any, blob3?: any, blob4?: any) {
    if (this.snake.onSnake(this.ClumsyFood)) {
      this.snake.expandSnake(this.EXPANSION_RATE);
      this.snake.changeMovement(this.clumsyInput);
      //setTimeout(() => { console.log('hello'); }, 10000)
      //this.snake.changeMovement(new CorrectInput);
      this.ClumsyFood = this.getRandomFoodPosition();

      blob1.blobRage(10000);
      blob2.blobRage(10000);
      blob3.blobRage(10000);
      blob4.blobRage(10000);

    }
    if (this.walls.onObject(this.ClumsyFood)) {
      this.ClumsyFood = this.getRandomFoodPosition();
    }
  }

  draw(gameBoard: any) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = this.ClumsyFood.y;
    foodElement.style.gridColumnStart = this.ClumsyFood.x;
    foodElement.style.backgroundImage =
      "url('https://icons.iconarchive.com/icons/mozco/symbolic-objects/32/Poison-icon.png')";
    foodElement.style.backgroundSize = 'cover';
    foodElement.classList.add('clumsyfoodas');
    gameBoard.appendChild(foodElement);
  }

  getRandomFoodPosition() {
    let newFoodPosition;
    while (
      newFoodPosition == null ||
      this.snake.onSnake(newFoodPosition) ||
      this.walls.onObject(newFoodPosition)
    ) {
      newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
  }
}

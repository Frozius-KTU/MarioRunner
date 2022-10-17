import { randomGridPosition } from "../gameboard-grid.util";
import { ClumsyInput } from "../MoveAlgorithm/ClumsyInput";
import { CorrectInput } from "../MoveAlgorithm/CorrectInput";
import { Wall } from "../wall";


export class ClumsyFood {


  EXPANSION_RATE = 1;
  ClumsyFood: any;
  snake;
  constructor(snake: any, public walls: Wall) {
    this.snake = snake;
    this.ClumsyFood = this.getRandomFoodPosition();
  }
  clumsyInput: any = new ClumsyInput();


  update() {
    if (this.snake.onSnake(this.ClumsyFood)) {
      this.snake.expandSnake(this.EXPANSION_RATE);
      this.snake.changeMovement(this.clumsyInput);
      //setTimeout(() => { console.log('hello'); }, 10000)
      //this.snake.changeMovement(new CorrectInput);
      this.ClumsyFood = this.getRandomFoodPosition();
    }
  }

  draw(gameBoard: any) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = this.ClumsyFood.y;
    foodElement.style.gridColumnStart = this.ClumsyFood.x;
    foodElement.classList.add('clumsyfood');
    gameBoard.appendChild(foodElement);
  }


  getRandomFoodPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || this.snake.onSnake(newFoodPosition)  || this.walls.onWall(newFoodPosition)) {
      newFoodPosition = randomGridPosition()
    }
    return newFoodPosition;
  }
}

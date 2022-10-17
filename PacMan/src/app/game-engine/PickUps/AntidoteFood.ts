import { randomGridPosition } from "../gameboard-grid.util";
import { ClumsyInput } from "../MoveAlgorithm/ClumsyInput";
import { CorrectInput } from "../MoveAlgorithm/CorrectInput";
import { Wall } from "../wall";


export class AntidoteFood {


  EXPANSION_RATE = 1;
  ClumsyFood: any;
  snake;
  constructor(snake: any, public walls: Wall) {
    this.snake = snake;
    this.ClumsyFood = this.getRandomFoodPosition();
  }
  correctInput: any = new CorrectInput();


  update() {
    if (this.snake.onSnake(this.ClumsyFood)) {
      this.snake.expandSnake(this.EXPANSION_RATE);
      this.snake.changeMovement(this.correctInput);
      //setTimeout(() => { console.log('hello'); }, 10000)
      //this.snake.changeMovement(new CorrectInput);
      this.ClumsyFood = this.getRandomFoodPosition();
    }
  }

  draw(gameBoard: any) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = this.ClumsyFood.y;
    foodElement.style.gridColumnStart = this.ClumsyFood.x;
    foodElement.classList.add('antidotefood');
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

import { randomGridPosition } from "../gameboard-grid.util";
import { ClumsyInput } from "../MoveAlgorithm/ClumsyInput";
import { CorrectInput } from "../MoveAlgorithm/CorrectInput";
import { Wall } from "../Decorator/wall";

export class ClumsyFood{


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
    if(this.walls.onObject(this.ClumsyFood)){
      this.ClumsyFood = this.getRandomFoodPosition();
    }
  }

  draw(gameBoard: any) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = this.ClumsyFood.y;
    foodElement.style.gridColumnStart = this.ClumsyFood.x;
    foodElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/mozco/symbolic-objects/32/Poison-icon.png')"
    foodElement.style.backgroundSize = "cover";
    foodElement.classList.add('clumsyfoodas');
    gameBoard.appendChild(foodElement);
  }


  getRandomFoodPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || this.snake.onSnake(newFoodPosition)  || this.walls.onObject(newFoodPosition)) {
      newFoodPosition = randomGridPosition()
    }
    return newFoodPosition;
  }
}

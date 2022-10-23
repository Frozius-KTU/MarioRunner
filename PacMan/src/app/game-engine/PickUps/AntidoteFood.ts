import { randomGridPosition } from "../gameboard-grid.util";
import { ClumsyInput } from "../MoveAlgorithm/ClumsyInput";
import { CorrectInput } from "../MoveAlgorithm/CorrectInput";
import { Wall } from "../Decorator/wall";


export class AntidoteFood {


  EXPANSION_RATE = 1;
  AntidoteFood: any;
  snake;
  constructor(snake: any, public walls: Wall) {
    this.snake = snake;
    this.AntidoteFood = this.getRandomFoodPosition();
  }
  correctInput: any = new CorrectInput();


  update() {
    if (this.snake.onSnake(this.AntidoteFood)) {
      this.snake.expandSnake(this.EXPANSION_RATE);
      this.snake.changeMovement(this.correctInput);
      //setTimeout(() => { console.log('hello'); }, 10000)
      //this.snake.changeMovement(new CorrectInput);
      this.AntidoteFood = this.getRandomFoodPosition();
    }
    if(this.walls.onObject(this.AntidoteFood)){
      this.AntidoteFood = this.getRandomFoodPosition();
    }


  }

  draw(gameBoard: any) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = this.AntidoteFood.y;
    foodElement.style.gridColumnStart = this.AntidoteFood.x;
    foodElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/iconfactory/kidcons/32/Medicine-icon.png')"
    //foodElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/yusuke-kamiyamane/fugue/16/poison-green-icon.png')"
    foodElement.style.backgroundSize = "cover";

    foodElement.classList.add('antidotefoodas');
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

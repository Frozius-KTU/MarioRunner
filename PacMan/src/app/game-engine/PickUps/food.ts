import { randomGridPosition } from '../gameboard-grid.util';
import { Wall } from '../Decorator/wall';


export class Food{


  EXPANSION_RATE = 1;
  score = 0;
  food: any;
  snake;
  constructor(snake: any, public walls: Wall) {
    this.snake = snake;
    this.food = this.getRandomFoodPosition();
  }



  update() {
    if (this.snake.onSnake(this.food) || this.walls.onObject(this.food)) {
      this.snake.expandSnake(this.EXPANSION_RATE);
      this.food = this.getRandomFoodPosition();
      this.addScore = 1;
    }
  }

  draw(gameBoard: any) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = this.food.y;
    foodElement.style.gridColumnStart = this.food.x;
    //foodElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/rokey/fantastic-dream/32/disc-red-cane-icon.png')"
    //foodElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/mozco/kitchen/32/Beer-2-icon.png')"
    //foodElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/mozco/kitchen/32/Beer-1-icon.png')"
    foodElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/jeanette-foshee/simpsons-09/32/Food-Duff-beer-icon.png')"
    foodElement.style.backgroundSize = "cover";
    foodElement.classList.add('foodas');
    gameBoard.appendChild(foodElement);
  }


  getRandomFoodPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || this.snake.onSnake(newFoodPosition)  || this.walls.onObject(newFoodPosition)) {
      newFoodPosition = randomGridPosition()
    }
    return newFoodPosition;
  }

  set addScore(val: number) {
    this.score+=val;
  }

  get currentScore() {
    return this.score;
  }
}

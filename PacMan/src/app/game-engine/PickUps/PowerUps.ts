import { randomGridPosition } from '../gameboard-grid.util';
import { BlackBorderWallDecorator, Wall } from '../Decorator/wall';
import { GameBoardComponent } from 'src/app/game-board/game-board.component';

export interface IPowerUp {
  update(): void;
  draw(gameBoard:any): void;
  getRanomPowerUpPosition(): void;
  effect():void;
}

export class PowerUp1 implements IPowerUp{
  public powerup: any;
  public snake;
  constructor(snake:any,public walls: Wall){
    this.snake = snake;
    this.powerup = this.getRanomPowerUpPosition();
  }
  update() {
    if (this.snake.onSnake(this.powerup) || this.walls.onObject(this.powerup)) {
      this.powerup = this.getRanomPowerUpPosition();
    }
  }

  getRanomPowerUpPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || this.snake.onSnake(newFoodPosition)  || this.walls.onObject(newFoodPosition)) {
      newFoodPosition = randomGridPosition()
    }
    return newFoodPosition;
  }

  draw(gameBoard: any) {
    const powerupelement = document.createElement('div');
    powerupelement.style.gridRowStart = this.powerup.y;
    powerupelement.style.gridColumnStart = this.powerup.x;
    powerupelement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/ahmadhania/spherical/32/scroll-up-icon.png')"
    powerupelement.style.backgroundSize = "cover";
    powerupelement.classList.add('powerups');
    gameBoard.appendChild(powerupelement);
  }

  effect(){
    console.log("efektas1");

  }
}

export class PowerUp2 implements IPowerUp{
  public powerup: any;
  public snake;

  constructor(snake:any,public walls: Wall){
    this.snake = snake;
    this.powerup = this.getRanomPowerUpPosition();
  }
  update() {
    if (this.snake.onSnake(this.powerup) || this.walls.onObject(this.powerup)) {
      this.powerup = this.getRanomPowerUpPosition();
    }
  }

  getRanomPowerUpPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || this.snake.onSnake(newFoodPosition)  || this.walls.onObject(newFoodPosition)) {
      newFoodPosition = randomGridPosition()
    }
    return newFoodPosition;
  }

  draw(gameBoard: any) {
    const powerupelement = document.createElement('div');
    powerupelement.style.gridRowStart = this.powerup.y;
    powerupelement.style.gridColumnStart = this.powerup.x;
    powerupelement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/ahmadhania/spherical/32/scroll-up-icon.png')"
    powerupelement.style.backgroundSize = "cover";
    powerupelement.classList.add('powerups');
    gameBoard.appendChild(powerupelement);
  }

  effect(){
    console.log("efektas2");
  }
}

export class PowerUp3 implements IPowerUp{
  public powerup: any;
  public snake;

  constructor(snake:any,public walls: Wall){
    this.snake = snake;
    this.powerup = this.getRanomPowerUpPosition();
  }
  update() {
    if (this.snake.onSnake(this.powerup) || this.walls.onObject(this.powerup)) {
      this.powerup = this.getRanomPowerUpPosition();
    }
  }

  getRanomPowerUpPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || this.snake.onSnake(newFoodPosition)  || this.walls.onObject(newFoodPosition)) {
      newFoodPosition = randomGridPosition()
    }
    return newFoodPosition;
  }

  draw(gameBoard: any) {
    const powerupelement = document.createElement('div');
    powerupelement.style.gridRowStart = this.powerup.y;
    powerupelement.style.gridColumnStart = this.powerup.x;
    powerupelement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/ahmadhania/spherical/32/scroll-up-icon.png')"
    powerupelement.style.backgroundSize = "cover";
    powerupelement.classList.add('powerups');
    gameBoard.appendChild(powerupelement);
  }

  effect(){
    console.log("efektas3");
  }
}

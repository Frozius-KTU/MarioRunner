import { randomGridPosition } from '../../gameboard-grid.util';
import { BlackBorderWallDecorator, Wall } from '../../Decorator/wall';
import { GameBoardComponent } from 'src/app/game-board/game-board.component';

export interface IHeal {
  update(): void;
  draw(gameBoard:any): void;
  getRanomHealPosition(): void;
  clone(): void;
}

export class HealMapOne implements IHeal{
  public heal: any;
  public snake;

  constructor(snake: any, public walls:Wall) {
    this.snake = snake;
    this.heal = this.getRanomHealPosition();
  }

  update() {
    if (this.snake.onSnake(this.heal) || this.walls.onObject(this.heal)) {
      this.heal = this.getRanomHealPosition();
    }
  }

  clone(): this {
    return Object.assign(HealMapOne,this.heal)
  }

  draw(gameBoard: any) {
    const healElement = document.createElement('div');
    healElement.style.gridRowStart = this.heal.y;
    healElement.style.gridColumnStart = this.heal.x;
    healElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/apathae/chakram-2/32/Heart-icon.png')"
    healElement.style.backgroundSize = "cover";
    healElement.classList.add('heal');
    gameBoard.appendChild(healElement);
  }

  getRanomHealPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || this.snake.onSnake(newFoodPosition)  || this.walls.onObject(newFoodPosition)) {
      newFoodPosition = randomGridPosition()
    }
    return newFoodPosition;
  }

}

export class HealMapTwo implements IHeal{
  public heal: any;
  public snake;

  constructor(snake: any, public walls:Wall) {
    this.snake = snake;
    this.heal = this.getRanomHealPosition();
  }

  update() {
    if (this.snake.onSnake(this.heal) || this.walls.onObject(this.heal)) {
      this.heal = this.getRanomHealPosition();
    }
  }


  clone(): this {
    return Object.assign(HealMapTwo,this.heal)
  }

  draw(gameBoard: any) {
    const healElement = document.createElement('div');
    healElement.style.gridRowStart = this.heal.y;
    healElement.style.gridColumnStart = this.heal.x;
    healElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/apathae/chakram-2/32/Heart-icon.png')"
    healElement.style.backgroundSize = "cover";
    healElement.classList.add('heal');
    gameBoard.appendChild(healElement);
  }

  getRanomHealPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || this.snake.onSnake(newFoodPosition)  || this.walls.onObject(newFoodPosition)) {
      newFoodPosition = randomGridPosition()
    }
    return newFoodPosition;
  }

}

export class HealMapThree implements IHeal{
  public heal: any;
  public snake;

  constructor(snake: any, public walls:Wall) {
    this.snake = snake;
    this.heal = this.getRanomHealPosition();
  }

  update() {
    if (this.snake.onSnake(this.heal) || this.walls.onObject(this.heal)) {
      this.heal = this.getRanomHealPosition();
    }
  }

  clone(): this {
    return Object.assign(HealMapThree,this.heal)
  }

  draw(gameBoard: any) {
    const healElement = document.createElement('div');
    healElement.style.gridRowStart = this.heal.y;
    healElement.style.gridColumnStart = this.heal.x;
    healElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/apathae/chakram-2/32/Heart-icon.png')"
    healElement.style.backgroundSize = "cover";
    healElement.classList.add('heal');
    gameBoard.appendChild(healElement);
  }

  getRanomHealPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || this.snake.onSnake(newFoodPosition)  || this.walls.onObject(newFoodPosition)) {
      newFoodPosition = randomGridPosition()
    }
    return newFoodPosition;
  }

}



import { randomGridPosition } from '../../gameboard-grid.util';
import { BlackBorderWallDecorator, Wall } from '../../Decorator/wall';
import { GameBoardComponent } from 'src/app/game-board/game-board.component';

export interface IHeal {
  update(): void;
  draw(gameBoard: any): void;
  getRanomHealPosition(): void;
  clone(): void;
  set addHealth(val:number);
  get currentHealth(): number;
  set minusHealth(val:number);
}

export class HealMapOne implements IHeal {
  public heal: any;
  public snake;
  health = 5;

  constructor(snake: any, public walls: Wall) {
    this.snake = snake;
    this.heal = this.getRanomHealPosition();
  }

  update() {
    if (this.snake.onSnake(this.heal) || this.walls.onObject(this.heal)) {
      this.heal = this.getRanomHealPosition();
      this.addHealth = 1;
    }
  }

  clone(): this {
    return this;
  }

  draw(gameBoard: any) {
    const healElement = document.createElement('div');
    healElement.style.gridRowStart = this.heal.y;
    healElement.style.gridColumnStart = this.heal.x;
    healElement.style.backgroundImage =
      "url('https://cdn.pixabay.com/photo/2017/09/23/16/33/pixel-heart-2779422_1280.png')";
    healElement.style.backgroundSize = 'cover';
    healElement.classList.add('heal');
    gameBoard.appendChild(healElement);
  }

  getRanomHealPosition() {
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
  set addHealth(val: number) {
    if(this.health<5){
      this.health+=val;
    }
  }
  get currentHealth() {
    return this.health;
  }

  set minusHealth(val: number){
    if(this.health>0){
      this.health-=val;
    }
  }
}

export class HealMapTwo implements IHeal {
  public heal: any;
  public snake;
  health = 4;

  constructor(snake: any, public walls: Wall) {
    this.snake = snake;
    this.heal = this.getRanomHealPosition();
  }

  update() {
    if (this.snake.onSnake(this.heal) || this.walls.onObject(this.heal)) {
      this.heal = this.getRanomHealPosition();
      this.addHealth = 1;
    }
  }

  clone(): this {
    return this;
  }

  draw(gameBoard: any) {
    const healElement = document.createElement('div');
    healElement.style.gridRowStart = this.heal.y;
    healElement.style.gridColumnStart = this.heal.x;
    healElement.style.backgroundImage =
      "url('https://cdn.pixabay.com/photo/2017/09/23/16/33/pixel-heart-2779422_1280.png')";
    healElement.style.backgroundSize = 'cover';
    healElement.classList.add('heal');
    gameBoard.appendChild(healElement);
  }

  getRanomHealPosition() {
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
  set addHealth(val: number) {
    if(this.health<4){
      this.health+=val;
    }
  }
  get currentHealth() {
    return this.health;
  }

  set minusHealth(val: number){
    if(this.health>0){
      this.health-=val;
    }
  }
}

export class HealMapThree implements IHeal {
  public heal: any;
  public snake;
  health = 3;

  constructor(snake: any, public walls: Wall) {
    this.snake = snake;
    this.heal = this.getRanomHealPosition();
  }

  update() {
    if (this.snake.onSnake(this.heal) || this.walls.onObject(this.heal)) {
      this.heal = this.getRanomHealPosition();
      this.addHealth = 1;
    }
  }

  clone(): this {
    return this;
  }

  draw(gameBoard: any) {
    const healElement = document.createElement('div');
    healElement.style.gridRowStart = this.heal.y;
    healElement.style.gridColumnStart = this.heal.x;
    healElement.style.backgroundImage =
      "url('https://cdn.pixabay.com/photo/2017/09/23/16/33/pixel-heart-2779422_1280.png')";
    healElement.style.backgroundSize = 'cover';
    healElement.classList.add('heal');
    gameBoard.appendChild(healElement);
  }

  getRanomHealPosition() {
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
  set addHealth(val: number) {
    if(this.health<3){
      this.health+=val;
    }
  }
  get currentHealth() {
    return this.health;
  }

  set minusHealth(val: number){
    if(this.health>0){
      this.health-=val;
      console.log('numinusavo');
    }
  }
}


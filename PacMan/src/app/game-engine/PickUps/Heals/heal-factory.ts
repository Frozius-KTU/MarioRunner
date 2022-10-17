import { randomGridPosition } from '../../gameboard-grid.util';
import { Wall } from '../../wall';
import Heal_Fruit from "./heal-fruit";
import Heal_Point from "./heal-point";
import IHeal from "./heals"

export class HealsFactory {
  heal: any;
  snake;
  static getHeal(heal: string): IHeal {
      if (heal == 'Heal Fruit') {
          return new Heal_Fruit()
      } else {
          return new Heal_Point()
      }
  }
  constructor(snake: any, public walls: Wall) {
    this.snake = snake;
    this.heal = this.getRanomHealPosition();
  }

  update() {
    if (this.snake.onSnake(this.heal)) {
      this.heal = this.getRanomHealPosition();
    }
  }


  draw(gameBoard: any) {
    const healElement = document.createElement('div');
    healElement.style.gridRowStart = this.heal.y;
    healElement.style.gridColumnStart = this.heal.x;
    healElement.classList.add('heal');
    gameBoard.appendChild(healElement);
  }

  getRanomHealPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || this.snake.onSnake(newFoodPosition)  || this.walls.onWall(newFoodPosition)) {
      newFoodPosition = randomGridPosition()
    }
    return newFoodPosition;
  }


}

import { randomGridPosition } from '../../gameboard-grid.util';
import { Wall } from '../../Environment/Decorator';
import { IMoveAlgorithm } from '../../MoveAlgorithm/IMoveAlgorithm';
import { Implementation } from './Bridge';

export class ClumsyFood implements Implementation {
  EXPANSION_RATE = 1;
  ClumsyFood: any;
  player;
  clumsyInput?: IMoveAlgorithm;
  constructor(player: any, public walls: Wall, clumsyInput: IMoveAlgorithm) {
    this.player = player;
    this.ClumsyFood = this.getRandomFoodPosition();
    this.clumsyInput = clumsyInput;
  }

  update(blob1?: any, ghostBlob?: any, blob3?: any, blob4?: any) {
    if (this.player.onPlayer(this.ClumsyFood)) {
      this.player.expandPlayer(this.EXPANSION_RATE);
      this.player.changeMovement(this.clumsyInput);
      //setTimeout(() => { console.log('hello'); }, 10000)
      //this.player.changeMovement(new CorrectInput);
      this.ClumsyFood = this.getRandomFoodPosition();

      blob1.blobRage(10000);
      ghostBlob.ghostRage(10000);
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
      this.player.onPlayer(newFoodPosition) ||
      this.walls.onObject(newFoodPosition)
    ) {
      newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
  }

  getPosition() {
    return this.ClumsyFood;
  }
}

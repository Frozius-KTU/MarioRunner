import { randomGridPosition } from 'src/app/game-engine/gameboard-grid.util';
import { Wall } from 'src/app/game-engine/Environment/Decorator';
import { IMoveAlgorithm } from 'src/app/game-engine/MoveAlgorithm/IMoveAlgorithm';
import { Implementation } from './Bridge';

export class AntidoteFood implements Implementation {
  EXPANSION_RATE = 1;
  AntidoteFood: any;
  player;
  correctInput?: IMoveAlgorithm;
  constructor(player: any, public walls: Wall, correctInput: IMoveAlgorithm) {
    this.player = player;
    this.AntidoteFood = this.getRandomFoodPosition();
    this.correctInput = correctInput;
  }

  update(blob1?: any, ghostBlob?: any, blob3?: any, blob4?: any) {
    if (this.player.onPlayer(this.AntidoteFood)) {
      this.player.changeMovement(this.correctInput);
      //setTimeout(() => { console.log('hello'); }, 10000)
      //this.player.changeMovement(new CorrectInput);
      this.AntidoteFood = this.getRandomFoodPosition();
    }
    if (this.walls.onObject(this.AntidoteFood)) {
      this.AntidoteFood = this.getRandomFoodPosition();
    }
  }

  draw(gameBoard: any) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = this.AntidoteFood.y;
    foodElement.style.gridColumnStart = this.AntidoteFood.x;
    foodElement.style.backgroundImage =
      "url('https://icons.iconarchive.com/icons/iconfactory/kidcons/32/Medicine-icon.png')";
    //foodElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/yusuke-kamiyamane/fugue/16/poison-green-icon.png')"
    foodElement.style.backgroundSize = 'cover';

    foodElement.classList.add('antidotefoodas');
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
    return this.AntidoteFood;
  }
}

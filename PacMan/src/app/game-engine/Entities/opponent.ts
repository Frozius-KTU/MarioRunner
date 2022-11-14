import { FacadeService } from 'src/app/core/services/facade.service';

export class Opponent {
  constructor(private facadeService: FacadeService) {}

  snakeBody = [{ x: -1, y: -1 }];

  update() {
    this.getPosition();
  }

  draw(gameBoard: any) {
    this.snakeBody.forEach((segment) => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = segment.y.toString();
      snakeElement.style.gridColumnStart = segment.x.toString();
      //snakeElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/ph03nyx/super-mario/32/Retro-Mushroom-Super-3-icon.png')"
      //snakeElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/ph03nyx/super-mario/32/Retro-Mushroom-1UP-3-icon.png')";
      //snakeElement.style.backgroundImage = "url('../../assets/icons/luigi.png')";
      snakeElement.style.backgroundImage =
        "url('https://i.pinimg.com/originals/f5/75/2c/f5752c7c9f03832209f0bb8b57214281.gif')";
      snakeElement.style.backgroundSize = 'cover';
      snakeElement.classList.add('opponentas');
      gameBoard.appendChild(snakeElement);
    });
  }

  expandSnake(amount: number) {
    //this.newSegments += amount;
  }

  getSnakeHead() {
    return this.snakeBody[0];
  }

  snakeIntersection() {
    return this.onSnake(this.snakeBody[0], { ignoreHead: true });
  }

  onSnake(position: any, { ignoreHead = false } = {}) {
    return this.snakeBody.some((segment, index) => {
      if (ignoreHead && index === 0) return false;
      return this.equalPositions(segment, position);
    });
  }

  equalPositions(pos1: any, pos2: any) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

  getPosition() {
    this.facadeService.signalRService.messageReceived.subscribe((message) => {
      var data = message.message.split(' ');
      if (
        data[0] == sessionStorage.getItem('lobbyId') &&
        data[1] != sessionStorage.getItem('playerName')
      ) {
        this.snakeBody[0].x = Number(data[2]);
        this.snakeBody[0].y = Number(data[3]);
      }
    });
  }
}

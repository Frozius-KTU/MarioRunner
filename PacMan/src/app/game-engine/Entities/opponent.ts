import { FacadeService } from 'src/app/core/services/facade.service';

export class Opponent {
  constructor(private facadeService: FacadeService) {}

  opponentBody = { x: -1, y: -1 };

  update() {
    this.getPosition();
  }

  draw(gameBoard: any) {
    const playerElement = document.createElement('div');
    playerElement.style.gridRowStart = this.opponentBody.y.toString();
    playerElement.style.gridColumnStart = this.opponentBody.x.toString();
    //playerElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/ph03nyx/super-mario/32/Retro-Mushroom-Super-3-icon.png')"
    //playerElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/ph03nyx/super-mario/32/Retro-Mushroom-1UP-3-icon.png')";
    //playerElement.style.backgroundImage = "url('../../assets/icons/luigi.png')";
    playerElement.style.backgroundImage =
      "url('https://i.pinimg.com/originals/f5/75/2c/f5752c7c9f03832209f0bb8b57214281.gif')";
    playerElement.style.backgroundSize = 'cover';
    playerElement.classList.add('opponentas');
    gameBoard.appendChild(playerElement);
  }

  getOpponentBody() {
    return this.opponentBody;
  }

  onPlayer(position: any) {
    return this.equalPositions(this.opponentBody, position);
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
        this.opponentBody.x = Number(data[2]);
        this.opponentBody.y = Number(data[3]);
      }
    });
  }
}

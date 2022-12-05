import { FacadeService } from 'src/app/core/services/facade.service';
import { ChatMessage } from 'src/app/models/chatMessage.model';
import { Wall } from '../Environment/Decorator';
import { fixOutsidePosition, outsideGrid } from '../gameboard-grid.util';
import { IMoveAlgorithm } from '../MoveAlgorithm/IMoveAlgorithm';
import { IHeal } from '../PickUps/Heals-Factory/Heal';
import { MortalState } from './State/mortalState';
import { PlayerState } from './State/playerState';

export class Player {
  moveAlgorithm: IMoveAlgorithm;
  state? : PlayerState;
  constructor(
    private facadeService: FacadeService,
    public walls: Wall,
    movealgorithm: IMoveAlgorithm
  ) {
    this.moveAlgorithm = movealgorithm;
    this.state = new MortalState();
  }

  playerBody = { x: 13, y: 16 };
  score = 0;

  update() {
    const inputDirection = this.moveAlgorithm.getInputDirection();
    this.moveAlgorithm.resetDirection();

    //Collision
    if (
      !this.walls.onObject({
        x: this.playerBody.x + inputDirection.x,
        y: this.playerBody.y + inputDirection.y,
      })
    ) {
      this.playerBody.x += inputDirection.x;
      this.playerBody.y += inputDirection.y;
    }

    if (outsideGrid(this.playerBody)) {
      this.playerBody = fixOutsidePosition(this.playerBody);
    }

    this.sendPosition(
      this.playerBody.x.toString() + ' ' + this.playerBody.y.toString()
    );
    //console.log(inputDirection);
  }

  draw(gameBoard: any) {
    const playerElement = document.createElement('div');
    playerElement.style.gridRowStart = this.playerBody.y.toString();
    playerElement.style.gridColumnStart = this.playerBody.x.toString();
    //playerElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/bokehlicia/captiva/32/games-icon.png')"
    //playerElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/ph03nyx/super-mario/32/Retro-Mario-2-icon.png')";
    playerElement.style.backgroundImage =
      "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dee38e10-db68-462d-9df7-46b87d4c7876/ddxh2po-85a87439-ac1f-49d7-a828-6b78d768b403.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RlZTM4ZTEwLWRiNjgtNDYyZC05ZGY3LTQ2Yjg3ZDRjNzg3NlwvZGR4aDJwby04NWE4NzQzOS1hYzFmLTQ5ZDctYTgyOC02Yjc4ZDc2OGI0MDMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.TGsrcvN8-1L5EmrOSnRRtcffJfUkkdFtLzztr_mjy5Q')";
    //playerElement.style.backgroundImage = "url('https://uploads.scratch.mit.edu/users/avatars/62496627.png')";
    //playerElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/ph03nyx/super-mario/32/Retro-Mushroom-Super-3-icon.png')"
    playerElement.style.backgroundSize = 'cover';

    playerElement.classList.add('playeras');
    gameBoard.appendChild(playerElement);
  }

  get currentScore() {
    return this.score;
  }

  changePlayerState(){
    this.state = this.state?.changeState();
  }

  changeMovement(moveAlgorithm: IMoveAlgorithm) {
    this.moveAlgorithm = moveAlgorithm;
    this.moveAlgorithm.resetDirection();
    //this.update();
  }
  getPlayer() {
    return this.playerBody;
  }

  onPlayer(position: any) {
    return this.equalPositions(this.playerBody, position);
  }

  equalPositions(pos1: any, pos2: any) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

  sendPosition(direction: string) {
    this.facadeService.signalRService.sendChatMessage(
      new ChatMessage(
        sessionStorage.getItem('lobbyId') +
          ' ' +
          sessionStorage.getItem('playerName') +
          ' ' +
          direction
      )
    );
  }

  checkblob(
    blob1?: any,
    blob2?: any,
    blob3?: any,
    blob4?: any,
    heal?: IHeal,
    healClone?: IHeal
  ) {
    console.log(this.state?.getState())
    if (this.state?.getState()) {
      if (
        (this.playerBody.x == blob1[0].x && this.playerBody.y == blob1[0].y) ||
        (this.playerBody.x == blob2[0].x && this.playerBody.y == blob2[0].y) ||
        (this.playerBody.x == blob3[0].x && this.playerBody.y == blob3[0].y) ||
        (this.playerBody.x == blob4[0].x && this.playerBody.y == blob4[0].y)
      ) {
        if (heal != null && healClone != null) {
          heal.minusHealth = 1;
          console.log('numinusavo');
          this.changePlayerState();
          setTimeout(() => {
            this.changePlayerState();
            console.log('Immortal efektas beigesi po 2 sekundziu');
          }, 2000);
        }
      }
    }
  }
}

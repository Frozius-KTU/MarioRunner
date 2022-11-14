import { FacadeService } from 'src/app/core/services/facade.service';
import { ChatMessage } from 'src/app/models/chatMessage.model';
import { Wall } from '../Decorator/wall';
import { fixOutsidePosition, outsideGrid } from '../gameboard-grid.util';
import { IMoveAlgorithm } from '../MoveAlgorithm/IMoveAlgorithm';
import { IHeal } from '../PickUps/Heals-Factory/Heal';

export class Snake {
  moveAlgorithm: IMoveAlgorithm;

  constructor(
    private facadeService: FacadeService,
    public walls: Wall,
    movealgorithm: IMoveAlgorithm
  ) {
    this.moveAlgorithm = movealgorithm;
  }

  snakeBody = [{ x: 8, y: 11 }];
  canGetDamaged? = true;
  getState() {
    return this.canGetDamaged;
  }
  setStateToImortal() {
    this.canGetDamaged = false;
  }
  setNormalState() {
    this.canGetDamaged = true;
  }
  newSegments = 0;

  update() {
    this.addSegments();
    const inputDirection = this.moveAlgorithm.getInputDirection();
    this.moveAlgorithm.resetDirection();
    for (let i = this.snakeBody.length - 2; i >= 0; i--) {
      this.snakeBody[i + 1] = { ...this.snakeBody[i] };
    }

    //Collision
    if (
      !this.walls.onObject({
        x: this.snakeBody[0].x + inputDirection.x,
        y: this.snakeBody[0].y + inputDirection.y,
      })
    ) {
      this.snakeBody[0].x += inputDirection.x;
      this.snakeBody[0].y += inputDirection.y;
    }

    if (outsideGrid(this.snakeBody[0])) {
      this.snakeBody[0] = fixOutsidePosition(this.snakeBody[0]);
    }

    this.sendPosition(
      this.snakeBody[0].x.toString() + ' ' + this.snakeBody[0].y.toString()
    );
    //console.log(inputDirection);
  }

  draw(gameBoard: any) {
    this.snakeBody.forEach((segment) => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = segment.y.toString();
      snakeElement.style.gridColumnStart = segment.x.toString();
      //snakeElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/bokehlicia/captiva/32/games-icon.png')"
      //snakeElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/ph03nyx/super-mario/32/Retro-Mario-2-icon.png')";
      snakeElement.style.backgroundImage =
        "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dee38e10-db68-462d-9df7-46b87d4c7876/ddxh2po-85a87439-ac1f-49d7-a828-6b78d768b403.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RlZTM4ZTEwLWRiNjgtNDYyZC05ZGY3LTQ2Yjg3ZDRjNzg3NlwvZGR4aDJwby04NWE4NzQzOS1hYzFmLTQ5ZDctYTgyOC02Yjc4ZDc2OGI0MDMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.TGsrcvN8-1L5EmrOSnRRtcffJfUkkdFtLzztr_mjy5Q')";
      //snakeElement.style.backgroundImage = "url('https://uploads.scratch.mit.edu/users/avatars/62496627.png')";
      //snakeElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/ph03nyx/super-mario/32/Retro-Mushroom-Super-3-icon.png')"
      snakeElement.style.backgroundSize = 'cover';

      snakeElement.classList.add('snakeas');
      gameBoard.appendChild(snakeElement);
    });
  }

  expandSnake(amount: number) {
    //this.newSegments += amount;
  }
  changeMovement(moveAlgorithm: IMoveAlgorithm) {
    this.moveAlgorithm = moveAlgorithm;
    this.moveAlgorithm.resetDirection();
    //this.update();
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

  addSegments() {
    for (let i = 0; i < this.newSegments; i++) {
      this.snakeBody.push({ ...this.snakeBody[this.snakeBody.length - 1] });
    }

    this.newSegments = 0;
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
  checkblob(blob1?: any, blob2?: any, blob3?: any, blob4?: any, heal?: IHeal) {
    if (this.canGetDamaged) {
      //console.log(this.snakeBody)
      if (
        (this.snakeBody[0].x == blob1[0].x &&
          this.snakeBody[0].y == blob1[0].y) ||
        (this.snakeBody[0].x == blob2[0].x &&
          this.snakeBody[0].y == blob2[0].y) ||
        (this.snakeBody[0].x == blob3[0].x &&
          this.snakeBody[0].y == blob3[0].y) ||
        (this.snakeBody[0].x == blob4[0].x && this.snakeBody[0].y == blob4[0].y)
      ) {
        if (heal != null) {
          heal.minusHealth = 1;
          console.log('numinusavo');
          this.setStateToImortal();
          setTimeout(() => {
            this.setNormalState();
            console.log('Immortal efektas beigesi po 2 sekundziu');
          }, 2000);
        }
      }
    }
  }
}

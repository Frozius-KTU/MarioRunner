import { SignalRService } from "../core/services/signalR.service";
import { Wall } from "../game-engine/Decorator/wall";
import { randomGridPosition } from "../game-engine/gameboard-grid.util";
import { Snake } from "../game-engine/snake";
import { ChatMessage } from "./chatMessage.model";

export class Blob {
  public color = '';
  public type = '';
  public blobBody = [
    { x: 0, y: 0 }
  ];
  newSegments = 0;
constructor(public walls: Wall, private readonly signalRService: SignalRService,){
}

draw(gameBoard: any) {
  this.blobBody.forEach(segment => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y.toString();
    snakeElement.style.gridColumnStart = segment.x.toString();
    //snakeElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/bokehlicia/captiva/32/games-icon.png')"
    if (this.color == "red")
      snakeElement.style.backgroundImage = "url('https://i.imgur.com/aAOhJxn.png')";
    if (this.color == "blue")
      snakeElement.style.backgroundImage = "url('https://imgur.com/j2rczNm.png')";
    //snakeElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/ph03nyx/super-mario/32/Retro-Mushroom-Super-3-icon.png')"
    snakeElement.style.backgroundSize = "cover";

    snakeElement.classList.add('snakeas');
    gameBoard.appendChild(snakeElement);
  });
}
update() {
  this.addSegments();
  /*const inputDirection =  this.moveAlgorithm.getInputDirection();
  this.moveAlgorithm.resetDirection();
  for (let i = this.blobBody.length - 2; i >= 0; i--) {
    this.blobBody[i + 1] = { ...this.blobBody[i] }
  }

  //Collision
  if(!this.walls.onObject({x: this.blobBody[0].x + inputDirection.x, y: this.blobBody[0].y + inputDirection.y})){
    this.blobBody[0].x += inputDirection.x;
    this.blobBody[0].y += inputDirection.y;
  }

  if(outsideGrid(this.blobBody[0])){
    this.blobBody[0] = fixOutsidePosition(this.blobBody[0])
  }*/

  this.sendPosition(this.blobBody[0].x.toString() + " " + this.blobBody[0].y.toString())
  //console.log(inputDirection);
}
addSegments() {
  for (let i = 0; i < this.newSegments; i++) {
    this.blobBody.push({ ...this.blobBody[this.blobBody.length - 1] });
  }

  this.newSegments = 0;
}
sendPosition(direction: string) {
  this.signalRService.sendChatMessage(new ChatMessage(sessionStorage.getItem('lobbyId') + " " + sessionStorage.getItem('playerName') + " " + direction));
}
setRandomPosition(snake: Snake, walls: Wall) {
  let newFoodPosition;
  while (newFoodPosition == null || snake.onSnake(newFoodPosition)  || walls.onObject(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  this.blobBody[0] = newFoodPosition;
}
}

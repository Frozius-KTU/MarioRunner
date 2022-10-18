import { SignalRService } from "../core/services/signalR.service";
import { ChatMessage } from "../models/chatMessage.model";
import { fixOutsidePosition, outsideGrid } from "./gameboard-grid.util";
import { MoveAlgorithm } from "./MoveAlgorithm";
import { CorrectInput } from "./MoveAlgorithm/CorrectInput";
import { Wall } from "./wall";


export class Snake {

  moveAlgorithm: MoveAlgorithm;

  constructor(
    private readonly signalRService: SignalRService,
    public walls: Wall,
    movealgorithm: MoveAlgorithm
  ) {
    this.moveAlgorithm = movealgorithm;
  }

  snakeBody = [
    { x: 1, y: 20 }
  ];

  newSegments = 0
  //input = new CorrectInput();

  listenToInputs() {
    this.moveAlgorithm.getInputs();
  }

  update() {
    this.addSegments();
    const inputDirection =  this.moveAlgorithm.getInputDirection();
    this.moveAlgorithm.resetDirection();
    for (let i = this.snakeBody.length - 2; i >= 0; i--) {
      this.snakeBody[i + 1] = { ...this.snakeBody[i] }
    }

    //Collision
    if(!this.walls.onWall({x: this.snakeBody[0].x + inputDirection.x, y: this.snakeBody[0].y + inputDirection.y})){
      this.snakeBody[0].x += inputDirection.x;
      this.snakeBody[0].y += inputDirection.y;
    }

    if(outsideGrid(this.snakeBody[0])){
      this.snakeBody[0] = fixOutsidePosition(this.snakeBody[0])
    }

    this.sendPosition(this.snakeBody[0].x.toString() + " " + this.snakeBody[0].y.toString())
    //console.log(inputDirection);
  }

  draw(gameBoard: any) {
    this.snakeBody.forEach(segment => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = segment.y.toString();
      snakeElement.style.gridColumnStart = segment.x.toString();
      snakeElement.classList.add('snake');
      gameBoard.appendChild(snakeElement);
    });
  }

  expandSnake(amount: number) {
    //this.newSegments += amount;
  }
  changeMovement(moveAlgorithm: MoveAlgorithm)
  {
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
    })
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
    this.signalRService.sendChatMessage(new ChatMessage(sessionStorage.getItem('name') + " " + direction));
  }

}

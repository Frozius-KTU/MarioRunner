import { ConsoleLogger } from "@microsoft/signalr/dist/esm/Utils";
import { SignalRService } from "../core/services/signalR.service";
import { ChatMessage } from "../models/chatMessage.model";
import { UserKeyInput } from "./input";


export class Oponent {

  constructor(
    private readonly signalRService: SignalRService
  ) {}

  snakeBody = [
    { x: 1, y: 20 }
  ];




  update() {

    this.getPosition();
  }

  draw(gameBoard: any) {
    this.snakeBody.forEach(segment => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = segment.y.toString();
      snakeElement.style.gridColumnStart = segment.x.toString();
      snakeElement.classList.add('oponent');
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
    })
  }

  equalPositions(pos1: any, pos2: any) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }


  getPosition() {
    this.signalRService.messageReceived$.subscribe((message) => {
      var data = message.message.split(" ");
      console.log(data[0]);
      if(data[0] != sessionStorage.getItem('name')){
        this.snakeBody[0].x = Number(data[1]);
        this.snakeBody[0].y = Number(data[2]);
      }
    });
  }

}

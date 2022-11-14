import { Wall } from '../Decorator/wall';
import { randomGridPosition } from '../gameboard-grid.util';
import { ChatMessage } from '../../models/chatMessage.model';
import { Snake } from './snake';

export class Blob {
  public color = '';
  public type = '';
  public blobBody = [{ x: 0, y: 0 }];
  lastRenderTime = 0;
  newSegments = 0;
  movetime = 5;
  constructor(public walls: Wall) {}

  draw(gameBoard: any) {
    this.blobBody.forEach((segment) => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = segment.y.toString();
      snakeElement.style.gridColumnStart = segment.x.toString();
      //snakeElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/bokehlicia/captiva/32/games-icon.png')"
      if (this.color == 'red')
        snakeElement.style.backgroundImage =
          "url('https://i.imgur.com/aAOhJxn.png')";
      if (this.color == 'blue')
        //snakeElement.style.backgroundImage = "url('https://imgur.com/j2rczNm.png')";
        snakeElement.style.backgroundImage =
          "url('https://icons.iconarchive.com/icons/mad-science/arcade-saturdays/32/Edible-Ghost-icon.png')";

      if (this.color == 'pink')
        snakeElement.style.backgroundImage =
          "url('https://icons.iconarchive.com/icons/mad-science/arcade-saturdays/32/Speedy-Pinky-icon.png')";
      if (this.color == 'yellow')
        snakeElement.style.backgroundImage =
          "url('https://icons.iconarchive.com/icons/mad-science/arcade-saturdays/32/Pokey-Clyde-icon.png')";
      //snakeElement.style.backgroundImage = "url('https://icons.iconarchive.com/icons/ph03nyx/super-mario/32/Retro-Mushroom-Super-3-icon.png')"
      snakeElement.style.backgroundSize = 'cover';

      snakeElement.classList.add('snakeas');
      gameBoard.appendChild(snakeElement);
    });
  }

  //kesto snargliu movementas
  updatemove() {
    this.addSegments();
    //const inputDirection =  this.moveAlgorithm.getInputDirection();
    //this.moveAlgorithm.resetDirection();
    for (let i = this.blobBody.length - 2; i >= 0; i--) {
      this.blobBody[i + 1] = { ...this.blobBody[i] };
    }

    let moved = false;
    while (!moved) {
      if (
        this.randomIntBinary(4) == 0 &&
        !this.walls.onObject({
          x: this.blobBody[0].x + 1,
          y: this.blobBody[0].y,
        }) &&
        this.blobBody[0].x < 20
      ) {
        this.blobBody[0].x += 1;
        moved = true;
      } else if (
        this.randomIntBinary(4) == 1 &&
        !this.walls.onObject({
          x: this.blobBody[0].x - 1,
          y: this.blobBody[0].y,
        }) &&
        this.blobBody[0].x > 0
      ) {
        this.blobBody[0].x -= 1;
        moved = true;
      } else if (
        this.randomIntBinary(4) == 2 &&
        !this.walls.onObject({
          x: this.blobBody[0].x,
          y: this.blobBody[0].y + 1,
        }) &&
        this.blobBody[0].y < 20
      ) {
        this.blobBody[0].y += 1;
        moved = true;
      } else if (
        this.randomIntBinary(4) == 3 &&
        !this.walls.onObject({
          x: this.blobBody[0].x,
          y: this.blobBody[0].y - 1,
        }) &&
        this.blobBody[0].y > 0
      ) {
        this.blobBody[0].y -= 1;
        moved = true;
      }
      moved = true;
    }

    //Dimos snargliu movementas
    /* var moveDirection = false;
    if (this.randomIntBinary(2) == 0) {
      //if first random number is 0, move on the x axis.
      moveDirection = false;
      if ( this.randomIntBinary(2) == 0 &&!this.walls.onObject({x: this.blobBody[0].x + 1, y: this.blobBody[0].y}) && this.blobBody[0].x < 20) {
        // x + 1
        this.blobBody[0].x += 1;
      } else if (!this.walls.onObject({x: this.blobBody[0].x - 1, y: this.blobBody[0].y}) && this.blobBody[0].x > 0) {
        // x - 1
        this.blobBody[0].x -= 1;
      }
    } else {
      if (this.randomIntBinary(2) == 0 && !this.walls.onObject({x: this.blobBody[0].x, y: this.blobBody[0].y + 1}) && this.blobBody[0].y < 20) {
        // y + 1
        this.blobBody[0].y += 1;
      } else if (this.walls.onObject({x: !this.blobBody[0].x, y: this.blobBody[0].y - 1}) && this.blobBody[0].y > 0) {
        // y - 1
        this.blobBody[0].y -= 1;
      }
    } */

    /* //else moveDirection = true; //else move on y axis
  if(this.randomIntBinary(2) == 0)
  //Collision
  if(!this.walls.onObject({x: this.blobBody[0].x + inputDirection.x, y: this.blobBody[0].y + inputDirection.y})){
    this.blobBody[0].x += inputDirection.x;
    this.blobBody[0].y += inputDirection.y;
  }

  if(outsideGrid(this.blobBody[0])){
    this.blobBody[0] = fixOutsidePosition(this.blobBody[0])
  }*/

    //console.log(inputDirection);
  }
  addSegments() {
    for (let i = 0; i < this.newSegments; i++) {
      this.blobBody.push({ ...this.blobBody[this.blobBody.length - 1] });
    }

    this.newSegments = 0;
  }

  setRandomPosition(snake: Snake, walls: Wall) {
    let newFoodPosition;
    while (
      newFoodPosition == null ||
      snake.onSnake(newFoodPosition) ||
      walls.onObject(newFoodPosition)
    ) {
      newFoodPosition = randomGridPosition();
    }
    this.blobBody[0] = newFoodPosition;
  }
  start(currentTime: any) {
    window.requestAnimationFrame(this.start.bind(this));
    const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / this.movetime) return;
    this.lastRenderTime = currentTime;
    this.updatemove();
    // console.log("rendering");
    //this.update();
    //this.draw();
  }
  randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  randomIntBinary(max: number) {
    return Math.floor(Math.random() * max);
  }
}
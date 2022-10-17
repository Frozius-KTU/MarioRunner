import { CorrectInput } from "./MoveAlgorithm/CorrectInput";

export class Wall {


  wall = [
    { x: 2, y: 2 },
    { x: 2, y: 3 },
    { x: 2, y: 4 },
    { x: 2, y: 5 },
    { x: 2, y: 6 },
    { x: 3, y: 6 },
    { x: 4, y: 6 },
    { x: 5, y: 6 },
    { x: 3, y: 7 },
    { x: 3, y: 8 },
    { x: 5, y: 8 },
    { x: 5, y: 9 },
    { x: 6, y: 8 },
    { x: 7, y: 8 },
    { x: 8, y: 8 },
    { x: 9, y: 8 },
    { x: 9, y: 7 },
    { x: 9, y: 6 },
    { x: 9, y: 5 },

    { x: 10, y: 2 },
    { x: 10, y: 3 },
    { x: 10, y: 4 },
    { x: 12, y: 5 },
    { x: 12, y: 6 },
    { x: 13, y: 6 },
    { x: 14, y: 6 },
    { x: 15, y: 6 },
    { x: 15, y: 7 },
    { x: 16, y: 8 },
    { x: 20, y: 8 },
    { x: 16, y: 9 },
    { x: 16, y: 8 },
    { x: 17, y: 8 },
    { x: 16, y: 10 },
    { x: 19, y: 8 },
    { x: 19, y: 7 },
    { x: 19, y: 6 },
    { x: 19, y: 5 },

    { x: 15, y: 16 },
    { x: 15, y: 15 },
    { x: 19, y: 16 },
    { x: 18, y: 12 },
    { x: 15, y: 11 },
    { x: 13, y: 16 },
    { x: 14, y: 16 },
    { x: 15, y: 14 },
    { x: 15, y: 12 },
    { x: 12, y: 13 },
    { x: 20, y: 12 },
    { x: 16, y: 16 },
    { x: 16, y: 16 },
    { x: 18, y: 18 },
    { x: 16, y: 12 },
    { x: 19, y: 13 },
    { x: 18, y: 17 },
    { x: 19, y: 15 },
    { x: 19, y: 11 },

    { x: 2, y: 13 },
    { x: 2, y: 12 },
    { x: 2, y: 14 },
    { x: 2, y: 15 },
    { x: 2, y: 16 },
    { x: 3, y: 12 },
    { x: 4, y: 18 },
    { x: 5, y: 16 },
    { x: 3, y: 14 },
    { x: 3, y: 12 },
    { x: 5, y: 13 },
    { x: 5, y: 12 },
    { x: 6, y: 11 },
    { x: 7, y: 10 },
    { x: 8, y: 19 },
    { x: 9, y: 17 },
    { x: 9, y: 17 },
    { x: 9, y: 16 },
    { x: 9, y: 15 },

    { x: 9, y: 18 },
    { x: 9, y: 19 },
    { x: 5, y: 18 },
    { x: 5, y: 17 },

    { x: 9, y: 14 },
    { x: 9, y: 13 },
    { x: 10, y: 13 },
    { x: 11, y: 13 },
  ];

  newSegments = 0
  input = new CorrectInput();



  update() {

  }

  draw(gameBoard: any) {
    this.wall.forEach(segment => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = segment.y.toString();
      snakeElement.style.gridColumnStart = segment.x.toString();
      snakeElement.classList.add('wall');
      gameBoard.appendChild(snakeElement);
    });
  }

  expandSnake(amount: number) {
    //this.newSegments += amount;
  }

  getSnakeHead() {
    return this.wall[0];
  }

  snakeIntersection() {
    return this.onWall(this.wall[0], { ignoreHead: true });
  }


  onWall(position: any, { ignoreHead = false } = {}) {
    return this.wall.some((segment, index) => {
      if (ignoreHead && index === 0) return false;
      return this.equalPositions(segment, position);
    })
  }

  equalPositions(pos1: any, pos2: any) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

  addSegments() {
    for (let i = 0; i < this.newSegments; i++) {
      this.wall.push({ ...this.wall[this.wall.length - 1] });
    }

    this.newSegments = 0;
  }

  generateRandomWall(){
    for (let i = 0; i < 40; i++) {

      this.wall.push({x: this.getRandomInt(1, 21), y: this.getRandomInt(1, 21)})
    }
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
    // The maximum is exclusive and the minimum is inclusive
  }


}

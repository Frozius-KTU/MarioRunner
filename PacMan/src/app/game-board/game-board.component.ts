import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SignalRService } from '../core/services/signalR.service';
import { Food } from '../game-engine/food';
import { outsideGrid } from '../game-engine/gameboard-grid.util';
import { Oponent } from '../game-engine/oponent';
import { Snake } from '../game-engine/snake';
import { Wall } from '../game-engine/wall';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, AfterViewInit {

  lastRenderTime = 0
  gameOver = false
  gameBoard: any;
  wall = new Wall();
  snake = new Snake(new SignalRService, this.wall);
  oponent = new Oponent(new SignalRService);

  food = new Food(this.snake, this.wall);
  constructor() { }

  ngOnInit(): void {
    this.snake.listenToInputs();
  }

  ngAfterViewInit(){
    this.gameBoard = document.querySelector('.game-board');
    window.requestAnimationFrame(this.start.bind(this));
  }


  start(currentTime: any) {
    if(this.gameOver) return console.log('Game Over');

    window.requestAnimationFrame(this.start.bind(this));
    const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / this.snakeSpeed) return;
    this.lastRenderTime = currentTime;
    // console.log("rendering");
    this.update();
    this.draw();
  }


  get snakeSpeed() {
    const score = this.food.currentScore;
    if(score < 10) return 10;
    if(score > 10 &&  score < 15 ) return 10;
    if(score > 15 && score < 20 ) return 10;
    return 10;
  }

  dpadMovement(direction: string) {
    this.snake.input.setDirection(direction);
  }

  update() {
    this.snake.update();
    this.oponent.update();
    this.food.update();
    this.checkDeath();
  }

  draw() {
    this.gameBoard.innerHTML = '';
    this.snake.draw(this.gameBoard);
    this.oponent.draw(this.gameBoard);
    this.wall.draw(this.gameBoard);
    this.food.draw(this.gameBoard);
  }

  checkDeath() {
    this.gameOver = outsideGrid(this.snake.getSnakeHead()) || this.snake.snakeIntersection();
    if(!this.gameOver) return;
    this.gameBoard.classList.add("blur");
  }

  restart() {
    window.location.reload();
  }

}

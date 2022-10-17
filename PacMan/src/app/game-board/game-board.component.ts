import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SignalRService } from '../core/services/signalR.service';
import { Food } from '../game-engine/PickUps/food';
import { outsideGrid } from '../game-engine/gameboard-grid.util';
import { Oponent } from '../game-engine/oponent';
import { ClumsyFood } from '../game-engine/PickUps/ClumsyFood';
import { Snake } from '../game-engine/snake';
import { Wall } from '../game-engine/wall';
import { CorrectInput } from '../game-engine/MoveAlgorithm/CorrectInput';
import { AntidoteFood } from '../game-engine/PickUps/AntidoteFood';
import { ClumsyInput } from '../game-engine/MoveAlgorithm/ClumsyInput';

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
  snake = new Snake(new SignalRService, this.wall, new CorrectInput);
  oponent = new Oponent(new SignalRService);
  clumsyFood = new ClumsyFood(this.snake, this.wall);
  food = new Food(this.snake, this.wall);
  antidotefood = new AntidoteFood(this.snake, this.wall);
  constructor() { }
  clumsyInput = new ClumsyInput();
  correctInput = new CorrectInput();
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
    this.snake.moveAlgorithm.moveAlgorithm(direction);
  }

  update() {
    this.snake.update();
    this.oponent.update();
    this.food.update();
    this.antidotefood.update();
    this.clumsyFood.update();
    //this.checkDeath();
    this.snake.listenToInputs();
  }

  draw() {
    this.gameBoard.innerHTML = '';
    this.snake.draw(this.gameBoard);
    this.oponent.draw(this.gameBoard);
    this.wall.draw(this.gameBoard);
    this.food.draw(this.gameBoard);
    this.clumsyFood.draw(this.gameBoard);
    this.antidotefood.draw(this.gameBoard);
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

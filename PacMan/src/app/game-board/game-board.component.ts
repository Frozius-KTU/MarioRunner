import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SignalRService } from '../core/services/signalR.service';
import { Food } from '../game-engine/PickUps/food';
import { outsideGrid } from '../game-engine/gameboard-grid.util';
import { Opponent } from '../game-engine/Entities/opponent';
import { ClumsyFood } from '../game-engine/PickUps/ClumsyFood';
import {
  Wall,
  BlackBorderWallDecorator,
  PurpleBorderWallDecorator,
  YellowBorderWallDecorator,
  Door,
  GrayBorderDoorDecorator,
  PurpleBorderDoorDecorator,
  YellowBorderDoorDecorator,
} from '../game-engine/Decorator/wall';
import { CorrectInput } from '../game-engine/MoveAlgorithm/CorrectInput';
import { AntidoteFood } from '../game-engine/PickUps/AntidoteFood';
import { ClumsyInput } from '../game-engine/MoveAlgorithm/ClumsyInput';
import { PickUpsFactory } from '../game-engine/PickUps/pickup-abstract-factory';
import { ActivatedRoute, Router } from '@angular/router';
import { LobbyService } from '../core/services/lobby.service';
import { MapService } from '../core/services/map.service';
import { Lobby, Map } from 'src/app/models/game.types';
import BlobBuilder from '../game-engine/Mobs/Blob/BlobBuilder';
import { Blob } from '../game-engine/Entities/blobEntity.model';
import { Snake } from '../game-engine/Entities/snake';
import { IPowerUp } from '../game-engine/PickUps/PowerUps';
import { IHeal } from '../game-engine/PickUps/Heals-Factory/Heal';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import { PlatformLocation } from '@angular/common';

interface IObject {}
@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly signalRService: SignalRService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private lobbyService: LobbyService,
    private mapService: MapService,
    private location: PlatformLocation
  ) {
    location.onPopState(() => {
      this.quit();
    });
  }

  lastRenderTime = 0;
  gameOver = false;
  gameBoard: any;
  opponent = new Opponent(this.signalRService);
  clumsyInput = new ClumsyInput();
  correctInput = new CorrectInput();

  wall?: BlackBorderWallDecorator;
  door?: GrayBorderDoorDecorator;

  snake?: Snake;
  food?: Food;
  blob1?: Blob;
  blob2?: Blob;
  blob3?: Blob;
  blob4?: Blob;

  clumsyFood?: ClumsyFood;
  antidotefood?: AntidoteFood;
  pickupsfactory?: PickUpsFactory;
  pickupPowerUp?: IPowerUp;
  pickupHeals?: IHeal;
  current_map?: number;

  map: Map | undefined;
  lobby: Lobby | undefined;

  loading = true;

  ngOnInit(): void {
    let route = this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (!id) {
        return;
      }

      this.lobbyService.getLobbyById(id).subscribe({
        next: (data) => {
          this.lobby = data;
          //console.log(this.lobby)
          this.current_map = this.lobby?.level;
          switch (this.lobby.level) {
            case 1:
              this.wall = new BlackBorderWallDecorator(new Wall());
              this.door = new GrayBorderDoorDecorator(new Door());
              break;
            case 2:
              this.wall = new PurpleBorderWallDecorator(new Wall());
              this.door = new PurpleBorderDoorDecorator(new Door());
              break;
            case 3:
              this.wall = new YellowBorderWallDecorator(new Wall());
              this.door = new YellowBorderDoorDecorator(new Door());
              break;

            default:
              this.wall = new BlackBorderWallDecorator(new Wall());
              this.door = new GrayBorderDoorDecorator(new Door());
              break;
          }

          this.mapService.getMapById(this.lobby.mapId).subscribe({
            next: (data) => {
              this.map = data;
              //console.log(this.map)
              this.wall!.generateElements(this.map);
              this.wall!.addBorder();
              this.door!.generateElements(this.map);
              this.door!.addBorder();

              this.prepareParams(this.wall!.wall);
            },
            error: (error) => {
              console.log(error);
            },
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
    });

    this.snake?.listenToInputs();
  }

  prepareParams(wall: Wall) {
    this.snake = new Snake(this.signalRService, wall, new CorrectInput());
    this.food = new Food(this.snake, wall);
    this.clumsyFood = new ClumsyFood(this.snake, wall);
    this.antidotefood = new AntidoteFood(this.snake, wall);
    this.blob1 = new BlobBuilder(wall)
      .setColor('red')
      .setCoordinates(this.snake, wall)
      .setType('default')
      .getResult();
    this.blob2 = new BlobBuilder(wall)
      .setColor('blue')
      .setCoordinates(this.snake, wall)
      .setType('default')
      .getResult();
    this.blob3 = new BlobBuilder(wall)
      .setColor('pink')
      .setCoordinates(this.snake, wall)
      .setType('default')
      .getResult();
    this.blob4 = new BlobBuilder(wall)
      .setColor('yellow')
      .setCoordinates(this.snake, wall)
      .setType('default')
      .getResult();
    this.pickupsfactory = new PickUpsFactory(this.snake, wall);
    if (this.current_map == null) {
      return;
    }
    this.pickupPowerUp = this.pickupsfactory.getPowerUps(
      this.current_map,
      this.gameBoard
    );
    this.pickupHeals = this.pickupsfactory.getHeals(
      this.current_map,
      this.gameBoard
    );
    //var clone = this.pickupHeals.clone();
    //console.log("kolnas   -- ", clone);
    this.loading = false;
  }

  ngAfterViewInit() {
    this.gameBoard = document.querySelector('.game-board');
    window.requestAnimationFrame(this.start.bind(this));
  }

  start(currentTime: any) {
    if (this.gameOver) return console.log('Game Over');

    window.requestAnimationFrame(this.start.bind(this));
    const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / this.snakeSpeed) return;
    this.lastRenderTime = currentTime;
    // console.log("rendering");
    this.update();
    this.draw();
    this.blob1?.start(currentTime);
    this.blob2?.start(currentTime);
    this.blob3?.start(currentTime);
    this.blob4?.start(currentTime);
  }

  get snakeSpeed() {
    const score = this.food?.currentScore || 0;
    if (score < 10) return 10;
    if (score > 10 && score < 15) return 10;
    if (score > 15 && score < 20) return 10;
    return 10;
  }

  dpadMovement(direction: string) {
    this.snake!.moveAlgorithm.moveAlgorithm(direction);
  }

  update() {
    if (this.loading) return console.log('Loading');
    this.snake!.checkblob(this.blob1?.blobBody,this.blob2?.blobBody,this.blob3?.blobBody,this.blob4?.blobBody,this.pickupHeals);
    this.snake!.update();
    this.opponent.update();
    this.food!.update();
    this.antidotefood!.update();
    this.clumsyFood!.update();
    this.checkDeath();
    this.pickupPowerUp?.update();
    this.pickupHeals?.update();
    this.snake?.listenToInputs();
  }

  draw() {
    if (this.loading) return console.log('Loading');

    this.gameBoard.innerHTML = '';
    this.wall!.draw(this.gameBoard);
    this.door!.draw(this.gameBoard);
    this.snake!.draw(this.gameBoard);
    this.opponent.draw(this.gameBoard);
    this.pickupPowerUp!.draw(this.gameBoard);
    this.pickupHeals!.draw(this.gameBoard);
    this.food!.draw(this.gameBoard);
    this.clumsyFood!.draw(this.gameBoard);
    this.antidotefood!.draw(this.gameBoard);
    this.blob1!.draw(this.gameBoard);
    this.blob2!.draw(this.gameBoard);
    this.blob3!.draw(this.gameBoard);
    this.blob4!.draw(this.gameBoard);
  }
  checkDeath() {
    this.gameOver =
      outsideGrid(this.snake!.getSnakeHead()) ||
      this.snake!.snakeIntersection() ||
      this.pickupHeals?.currentHealth == 0;
    if (!this.gameOver) return;
    this.gameBoard.classList.add('blur');
  }

  restart() {
    window.location.reload();
  }

  quit() {
    this.signalRService.disconnectClientFromLobby(
      sessionStorage.getItem('playerId')!,
      sessionStorage.getItem('lobbyId')!
    );
    this.router.navigate(['/lobbies']).then(() => {
      window.location.reload();
    });
    sessionStorage.removeItem('lobbyId')!;
  }
}

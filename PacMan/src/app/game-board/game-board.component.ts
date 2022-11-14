import { AfterViewInit, Component, OnInit } from '@angular/core';
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
import { Lobby, Map } from 'src/app/models/game.types';
import BlobBuilder from '../game-engine/Mobs/Blob/BlobBuilder';
import { Blob } from '../game-engine/Entities/blobEntity.model';
import { Snake } from '../game-engine/Entities/snake';
import { IPowerUp } from '../game-engine/PickUps/PowerUpsFactory/PowerUps';
import { IHeal } from '../game-engine/PickUps/Heals-Factory/Heal';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import { PlatformLocation } from '@angular/common';
import { FacadeService } from '../core/services/facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StandartBob } from '../game-engine/Mobs/BlobTypes/StandartBlob';
import { Ghost } from '../game-engine/Entities/ghostMegaEntity.model';

interface IObject {}
@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: PlatformLocation,
    private facadeService: FacadeService
  ) {
    location.onPopState(() => {
      this.quit();
    });
  }

  lastRenderTime = 0;
  gameOver = false;
  gameBoard: any;
  opponent = new Opponent(this.facadeService);

  wall?: BlackBorderWallDecorator;
  door?: GrayBorderDoorDecorator;

  snake?: Snake;
  food?: Food;
  blob1?: Blob;
  blob2?: Blob;
  blob3?: Blob;
  blob4?: Blob;
  ghostEntity?: Ghost;

  standartBobGenerator?: StandartBob;

  clumsyFood?: ClumsyFood;
  antidotefood?: AntidoteFood;
  correctInput = new CorrectInput();
  clumsyInput = new ClumsyInput();

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

      this.facadeService
        .getClientById(sessionStorage.getItem('playerId')!)
        .subscribe({
          error: () => {
            sessionStorage.clear();
            this.router.navigate(['/home']);
          },
        });

      this.facadeService.getLobbyById(id).subscribe({
        next: (data) => {
          this.lobby = data;
          //console.log(this.lobby)
          this.current_map = this.lobby.level;
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

          this.facadeService.getMapById(this.lobby.mapId).subscribe({
            next: (data) => {
              this.map = data;
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
  }

  prepareParams(wall: Wall) {
    this.snake = new Snake(this.facadeService, wall, this.correctInput);
    this.food = new Food(this.snake, wall);
    this.clumsyFood = new ClumsyFood(this.snake, wall, this.clumsyInput);
    this.antidotefood = new AntidoteFood(this.snake, wall, this.correctInput);

    this.standartBobGenerator = new StandartBob(wall, this.snake);
    this.blob1 = this.standartBobGenerator.generateRedBlob();
    this.blob2 = this.standartBobGenerator.generateBlueBlob();
    this.blob3 = this.standartBobGenerator.generatePinkBlob();
    this.blob4 = this.standartBobGenerator.generateYellowBlob();
    this.ghostEntity = new Ghost(wall);
    this.pickupsfactory = new PickUpsFactory(this.snake, wall);

    this.pickupPowerUp = this.pickupsfactory.getPowerUps(
      this.current_map!,
      this.gameBoard
    );
    this.pickupHeals = this.pickupsfactory.getHeals(
      this.current_map!,
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

    this.update();
    this.draw();
    this.blob1?.start(currentTime);
    this.blob2?.start(currentTime);
    this.blob3?.start(currentTime);
    this.blob4?.start(currentTime);
    this.ghostEntity?.start(currentTime);
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
    this.snake!.checkblob(
      this.blob1?.blobBody,
      this.blob2?.blobBody,
      this.blob3?.blobBody,
      this.blob4?.blobBody,
      this.pickupHeals
    );
    this.snake!.update();
    this.opponent.update();
    this.food!.update();
    this.antidotefood!.update();
    this.clumsyFood!.update(this.blob1, this.blob2, this.blob3, this.blob4);
    this.checkDeath();
    this.pickupPowerUp?.update();
    this.pickupHeals?.update();
    //this.pickupPowerUp?.effect();
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
    this.ghostEntity?.draw(this.gameBoard);
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
    this.facadeService.disconnectClientFromLobby(
      sessionStorage.getItem('playerId')!,
      sessionStorage.getItem('lobbyId')!
    );
    this.router.navigate(['/lobbies']).then(() => {
      window.location.reload();
    });
    sessionStorage.removeItem('lobbyId')!;
  }
}

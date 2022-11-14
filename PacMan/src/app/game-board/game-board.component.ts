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
  BrownBorderDoorDecorator,
  PurpleBorderDoorDecorator,
  YellowBorderDoorDecorator,
} from '../game-engine/Decorator/wall';
import { CorrectInput } from '../game-engine/MoveAlgorithm/CorrectInput';
import { AntidoteFood } from '../game-engine/PickUps/AntidoteFood';
import { ClumsyInput } from '../game-engine/MoveAlgorithm/ClumsyInput';
import { Lobby, Map } from 'src/app/models/game.types';
import { Blob } from '../game-engine/Entities/blobEntity.model';
import { Snake } from '../game-engine/Entities/snake';
import { IPowerUp } from '../game-engine/PickUps/PowerUpsFactory/PowerUps';
import { IHeal } from '../game-engine/PickUps/Heals-Factory/Heal';
import { PlatformLocation } from '@angular/common';
import { FacadeService } from '../core/services/facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StandartBob } from '../game-engine/Mobs/BlobTypes/StandartBlob';
import { Ghost } from '../game-engine/Entities/ghostMegaEntity.model';
import { PickUpsFactoryMap1, PickUpsFactoryMap2, PickUpsFactoryMap3 } from '../game-engine/PickUps/PowerUpsFactory/PowerUpsFactoryCreator';

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
  door?: BrownBorderDoorDecorator;

  snake?: Snake;
  food?: Food;

  blob1?: Blob;
  ghostEntity?: Ghost;
  blob3?: Blob;
  blob4?: Blob;

  standartBobGenerator?: StandartBob;

  clumsyFood?: ClumsyFood;
  antidotefood?: AntidoteFood;
  correctInput = new CorrectInput();
  clumsyInput = new ClumsyInput();

  pickupPowerUp?: IPowerUp;
  pickupHeals?: IHeal;
  current_map?: number;
  clone? : any;
  pickup?: any;

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
              this.door = new BrownBorderDoorDecorator(new Door());
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
              this.door = new BrownBorderDoorDecorator(new Door());
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
    this.blob3 = this.standartBobGenerator.generatePinkBlob();
    this.blob4 = this.standartBobGenerator.generateYellowBlob();

    this.ghostEntity = new Ghost(wall);
    this.ghostEntity.setRandomPosition(this.snake, wall);

    this.pickupPowerUp = this.getPowerUps(
      this.current_map!,
      wall
    );
    this.pickupHeals = this.getHeals(
      this.current_map!,
      wall
    );

    console.log(this.pickupPowerUp);
    console.log(this.pickupHeals);
    // this.pickupHeals = this.pickupsfactory.getHeals(
    //   this.current_map!,
    //   this.gameBoard
    // );
    this.clone = this.pickupHeals?.clone();
    // console.log(this.pickupHeals);
    // console.log("klonas");
    // console.log(this.clone);
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
    this.ghostEntity?.start(currentTime);
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
    this.snake!.checkblob(
      this.blob1?.blobBody,
      this.ghostEntity?.ghostBody,
      this.blob3?.blobBody,
      this.blob4?.blobBody,
      this.pickupHeals,
      this.clone
    );
    this.snake!.update();
    this.opponent.update();
    this.food!.update();
    this.antidotefood!.update();
    this.clumsyFood!.update(this.blob1, this.ghostEntity, this.blob3, this.blob4);
    this.checkDeath();
    this.pickupPowerUp?.update();
    this.pickupHeals?.update();
    this.clone?.update();
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
    this.ghostEntity!.draw(this.gameBoard);
    this.blob3!.draw(this.gameBoard);
    this.blob4!.draw(this.gameBoard);
    this.ghostEntity?.draw(this.gameBoard);
    this.clone?.draw(this.gameBoard);
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

  getPowerUps(level: number, wall : Wall) {
    if (level == 1) {
      //console.log(1);
      this.pickup = new PickUpsFactoryMap1(this.snake,wall);
      return this.pickup.createPowerUp(this.snake, this.wall);
    }
    if (level == 2) {
      //console.log(2);
      this.pickup = new PickUpsFactoryMap2(this.snake, wall);
      return this.pickup.createPowerUp(this.snake, this.wall);
    }
    if (level == 3) {
      //console.log(3);
      this.pickup = new PickUpsFactoryMap3(this.snake, wall);
      return this.pickup.createPowerUp(this.snake, this.wall);
    } else {
      this.pickup = new PickUpsFactoryMap1(this.snake, wall);
      return this.pickup.createPowerUp(this.snake, this.wall);
    }
  }
  getHeals(level: number, wall : Wall) {
    if (level == 1) {
      //console.log(1);
      this.pickup = new PickUpsFactoryMap1(this.snake,wall);
      console.log(this.pickup.createPowerUp(this.snake, this.wall));
      return this.pickup.createHeal(this.snake, this.wall);
    }
    if (level == 2) {
      //console.log(2);
      this.pickup = new PickUpsFactoryMap2(this.snake, wall);
      return this.pickup.createHeal(this.snake, this.wall);
    }
    if (level == 3) {
      //console.log(3);
      this.pickup = new PickUpsFactoryMap3(this.snake, wall);
      return this.pickup.createHeal(this.snake, this.wall);
    } else {
      this.pickup = new PickUpsFactoryMap1(this.snake, wall);
      return this.pickup.createHeal(this.snake, this.wall);
    }
  }
}

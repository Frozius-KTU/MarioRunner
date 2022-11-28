import { AfterViewInit, Component, OnInit } from '@angular/core';
import { outsideGrid } from '../game-engine/gameboard-grid.util';
import { Opponent } from '../game-engine/Entities/opponent';
import { ClumsyFood } from '../game-engine/PickUps/Chemicals/ClumsyFood';
import {
  Wall,
  BlackBorderWallDecorator,
  PurpleBorderWallDecorator,
  YellowBorderWallDecorator,
  Door,
  BrownBorderDoorDecorator,
  PurpleBorderDoorDecorator,
  YellowBorderDoorDecorator,
} from '../game-engine/Environment/Decorator';
import { CorrectInput } from '../game-engine/MoveAlgorithm/CorrectInput';
import { AntidoteFood } from '../game-engine/PickUps/Chemicals/AntidoteFood';
import { ClumsyInput } from '../game-engine/MoveAlgorithm/ClumsyInput';
import { Lobby, Map } from 'src/app/models/game.types';
import { Blob } from '../game-engine/Entities/blobEntity.model';
import { Player } from '../game-engine/Entities/player';
import { IPowerUp } from '../game-engine/PickUps/PowerUpsFactory/PowerUps';
import { IHeal } from '../game-engine/PickUps/Heals-Factory/Heal';
import { PlatformLocation } from '@angular/common';
import { FacadeService } from '../core/services/facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StandartBob } from '../game-engine/Entities/Mobs/BlobTypes/StandartBlob';
import { Ghost } from '../game-engine/Entities/ghostMegaEntity.model';
import { BlobAdapter } from '../game-engine/Entities/blobAdapter';
import {
  PickUpsFactoryMap1,
  PickUpsFactoryMap2,
  PickUpsFactoryMap3,
} from '../game-engine/PickUps/PowerUpsFactory/PowerUpsFactoryCreator';
import { ChemicalsAbstraction } from '../game-engine/PickUps/Chemicals/Bridge';
import { Food, SuperFood } from '../game-engine/PickUps/TemplateFood';

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
  lastRenderTime2 = 0;

  gameOver = false;
  gameBoard: any;
  opponent = new Opponent(this.facadeService);

  wall?: BlackBorderWallDecorator;
  door?: BrownBorderDoorDecorator;

  player?: Player;
  food1?: Food;
  food2?: SuperFood;

  blob1?: Blob;
  ghostEntity?: Ghost;
  blob3?: Blob;
  blob4?: Blob;

  standartBobGenerator?: StandartBob;

  clumsyFood?: ClumsyFood;
  antidoteFood?: AntidoteFood;
  clumsyFoodAbstraction?: ChemicalsAbstraction;
  antidoteFoodAbstraction?: ChemicalsAbstraction;
  correctInput = new CorrectInput();
  clumsyInput = new ClumsyInput();

  pickupPowerUp?: IPowerUp;
  pickupHeals?: IHeal;
  clone?: any;
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
    this.player = new Player(this.facadeService, wall, this.correctInput);
    this.food1 = new Food(this.player, wall);
    this.food2 = new SuperFood(this.player, wall);
    this.clumsyFood = new ClumsyFood(this.player, wall, this.clumsyInput);
    this.antidoteFood = new AntidoteFood(this.player, wall, this.correctInput);

    this.clumsyFoodAbstraction = new ChemicalsAbstraction(this.clumsyFood);
    this.antidoteFoodAbstraction = new ChemicalsAbstraction(this.antidoteFood);

    this.standartBobGenerator = new StandartBob(wall, this.player);
    this.blob1 = this.standartBobGenerator.generateRedBlob();
    this.blob3 = this.standartBobGenerator.generatePinkBlob();
    this.blob4 = this.standartBobGenerator.generateYellowBlob();
    var ghost = new Ghost(wall);
    this.ghostEntity = new BlobAdapter(this.blob1, wall);
    this.ghostEntity.setRandomPosition(this.player, wall);

    this.pickupPowerUp = this.getPowerUps(this.lobby!.level, wall);
    this.pickupHeals = this.getHeals(this.lobby!.level, wall);

    //console.log(this.pickupPowerUp);
    //console.log(this.pickupHeals);
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
  currentTIME: any;

  start(currentTime: any) {
    if (this.gameOver) return console.log('Game Over');

    window.requestAnimationFrame(this.start.bind(this));
    const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / this.playerSpeed) return;
    this.lastRenderTime = currentTime;

    this.currentTIME = currentTime;
    this.update();
    this.draw();
    this.blob1?.start(currentTime);
    this.ghostEntity?.start(currentTime);
    this.blob3?.start(currentTime);
    this.blob4?.start(currentTime);
  }

  get playerSpeed() {
    const score = this.player?.currentScore || 0;
    if (score < 10) return 7;
    if (score > 10 && score < 15) return 8;
    if (score > 15 && score < 20) return 9;
    return 10;
  }

  dpadMovement(direction: string) {
    this.player!.moveAlgorithm.moveAlgorithm(direction);
  }

  update() {
    if (this.loading) return console.log('Loading');
    this.player!.checkblob(
      this.blob1?.blobBody,
      this.ghostEntity?.ghostBody,
      this.blob3?.blobBody,
      this.blob4?.blobBody,
      this.pickupHeals,
      this.clone
    );
    this.player!.update();
    this.opponent.update();

    //this.antidoteFood!.update();
    this.antidoteFoodAbstraction!.implementation.update();
    // this.clumsyFood!.update(
    //   this.blob1,
    //   this.ghostEntity,
    //   this.blob3,
    //   this.blob4
    // );
    this.clumsyFoodAbstraction!.implementation.update(
      this.blob1,
      this.ghostEntity,
      this.blob3,
      this.blob4
    );
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
    this.player!.draw(this.gameBoard);
    this.opponent.draw(this.gameBoard);
    this.pickupPowerUp!.draw(this.gameBoard);
    this.pickupHeals!.draw(this.gameBoard);
    this.food1!.templateMethod(this.gameBoard);
    this.food2!.templateMethod(this.gameBoard);
    //this.clumsyFood!.draw(this.gameBoard);
    //this.clumsyFoodAbstraction!.implementation.draw(this.gameBoard);
    //this.antidoteFood!.draw(this.gameBoard);
    //this.antidoteFoodAbstraction!.implementation.draw(this.gameBoard);

    const secondsSinceLastRender =
      (this.currentTIME - this.lastRenderTime2) / 1000;
    if (secondsSinceLastRender < 1) {
      this.clumsyFoodAbstraction!.drawDifferently(this.gameBoard);
      this.antidoteFoodAbstraction!.drawDifferentlyGood(this.gameBoard);
    } else if (secondsSinceLastRender < 2) {
      this.clumsyFoodAbstraction!.implementation.draw(this.gameBoard);
      this.antidoteFoodAbstraction!.implementation.draw(this.gameBoard);
    } else {
      this.clumsyFoodAbstraction!.implementation.draw(this.gameBoard);
      this.antidoteFoodAbstraction!.implementation.draw(this.gameBoard);
      this.lastRenderTime2 = this.currentTIME;
    }

    this.blob1!.draw(this.gameBoard);
    this.blob3!.draw(this.gameBoard);
    this.blob4!.draw(this.gameBoard);
    this.ghostEntity!.draw(this.gameBoard);
    this.clone?.draw(this.gameBoard);
  }

  checkDeath() {
    this.gameOver =
      outsideGrid(this.player!.getPlayer()) ||
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

  getPowerUps(level: number, wall: Wall) {
    if (level == 1) {
      //console.log(1);
      this.pickup = new PickUpsFactoryMap1(this.player, wall);
      return this.pickup.createPowerUp(this.player, this.wall);
    }
    if (level == 2) {
      //console.log(2);
      this.pickup = new PickUpsFactoryMap2(this.player, wall);
      return this.pickup.createPowerUp(this.player, this.wall);
    }
    if (level == 3) {
      //console.log(3);
      this.pickup = new PickUpsFactoryMap3(this.player, wall);
      return this.pickup.createPowerUp(this.player, this.wall);
    } else {
      this.pickup = new PickUpsFactoryMap1(this.player, wall);
      return this.pickup.createPowerUp(this.player, this.wall);
    }
  }
  getHeals(level: number, wall: Wall) {
    if (level == 1) {
      //console.log(1);
      this.pickup = new PickUpsFactoryMap1(this.player, wall);
      //console.log(this.pickup.createPowerUp(this.player, this.wall));
      return this.pickup.createHeal(this.player, this.wall);
    }
    if (level == 2) {
      //console.log(2);
      this.pickup = new PickUpsFactoryMap2(this.player, wall);
      return this.pickup.createHeal(this.player, this.wall);
    }
    if (level == 3) {
      //console.log(3);
      this.pickup = new PickUpsFactoryMap3(this.player, wall);
      return this.pickup.createHeal(this.player, this.wall);
    } else {
      this.pickup = new PickUpsFactoryMap1(this.player, wall);
      return this.pickup.createHeal(this.player, this.wall);
    }
  }
}

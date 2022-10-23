import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SignalRService } from '../core/services/signalR.service';
import { Food } from '../game-engine/PickUps/food';
import { outsideGrid } from '../game-engine/gameboard-grid.util';
import { Oponent } from '../game-engine/oponent';
import { ClumsyFood } from '../game-engine/PickUps/ClumsyFood';
import { Snake } from '../game-engine/snake';
import { BlackBorderWallDecorator, Wall, WhiteBorderWallDecorator, YellowBorderWallDecorator } from '../game-engine/Decorator/wall';
import { CorrectInput } from '../game-engine/MoveAlgorithm/CorrectInput';
import { AntidoteFood } from '../game-engine/PickUps/AntidoteFood';
import { ClumsyInput } from '../game-engine/MoveAlgorithm/ClumsyInput';
import { HealsFactory} from '../game-engine/PickUps/Heals/heal-factory';
import { MobsFactory} from '../game-engine/Mobs/mob-factory';
import { ActivatedRoute, Router } from '@angular/router';
import { LobbyService } from '../core/services/lobby.service';
import { MapService } from '../core/services/map.service';
import { Lobby, Map } from 'src/app/models/game.types';

interface IObject {}
@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})

export class GameBoardComponent implements OnInit, AfterViewInit {

  lastRenderTime = 0
  gameOver = false
  gameBoard: any;
  oponent = new Oponent(new SignalRService);
  clumsyInput = new ClumsyInput();
  correctInput = new CorrectInput();

  wall?: BlackBorderWallDecorator;
  snake?:Snake;
  food?: Food;
  clumsyFood?: ClumsyFood;
  antidotefood?: AntidoteFood;
  healfactory?: HealsFactory;
  mobsfactory?: MobsFactory;

  map: Map | undefined
  lobby: Lobby | undefined

  constructor(
    private readonly signalRService: SignalRService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private lobbyService: LobbyService,
    private mapService: MapService
    ) { }

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



        switch (this.lobby.level) {
          case 1:
            this.wall = new BlackBorderWallDecorator(new Wall);
            break;
          case 2:
            this.wall = new WhiteBorderWallDecorator(new Wall);
            break;
          case 3:
            this.wall = new YellowBorderWallDecorator(new Wall);
            break;

          default:
            this.wall = new BlackBorderWallDecorator(new Wall);
            break;
        }



        this.mapService.getMapById(this.lobby.mapId).subscribe({
          next: (data) => {
            this.map = data;
            //console.log(this.map)
            this.wall!.generateElements(this.map);
            this.wall!.addBorder();
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

    this.snake!.listenToInputs();
  }

  prepareParams(wall: Wall){
    this.snake = new Snake(new SignalRService, wall, new CorrectInput);
    this.food = new Food(this.snake, wall);
    this.clumsyFood = new ClumsyFood(this.snake, wall);
    this.antidotefood = new AntidoteFood(this.snake, wall);
    this.healfactory = new HealsFactory(this.snake, wall);
    this.mobsfactory = new MobsFactory(this.snake, wall);
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
    const score = this.food!.currentScore;
    if(score < 10) return 10;
    if(score > 10 &&  score < 15 ) return 10;
    if(score > 15 && score < 20 ) return 10;
    return 10;
  }

  dpadMovement(direction: string) {
    this.snake!.moveAlgorithm.moveAlgorithm(direction);
  }

  update() {
    this.snake!.update();
    this.oponent.update();
    this.food!.update();
    this.antidotefood!.update();
    this.clumsyFood!.update();
    this.healfactory!.update();
    this.checkDeath();
    this.snake!.listenToInputs();
  }

  draw() {
    this.gameBoard.innerHTML = '';
    this.snake!.draw(this.gameBoard);
    this.oponent.draw(this.gameBoard);
    this.wall!.draw(this.gameBoard);
    this.food!.draw(this.gameBoard);
    this.clumsyFood!.draw(this.gameBoard);
    this.healfactory!.draw(this.gameBoard);
    this.antidotefood!.draw(this.gameBoard);
  }

  checkDeath() {
    this.gameOver = outsideGrid(this.snake!.getSnakeHead()) || this.snake!.snakeIntersection();
    if(!this.gameOver) return;
    this.gameBoard.classList.add("blur");
  }

  restart() {
    window.location.reload();
  }

  quit() {

    this.signalRService.disconnectClientFromLobby(sessionStorage.getItem('playerId')!, sessionStorage.getItem('lobbyId')!);
    this.router.navigate(['/lobbies']).then(() => {
      window.location.reload();
    });

    // console.log(sessionStorage.getItem('lobbyId')!, sessionStorage.getItem('playerId')!.toString());
    // this.lobbyService.removePlayerFromLobby(sessionStorage.getItem('lobbyId')!, sessionStorage.getItem('playerId')!).subscribe({
    //   next: (data) => {
    //     this.router.navigate(['/home']).then(() => {
    //       window.location.reload();
    //     });
    //   },
    //   error: (error) => {
    //     console.log(error);

    //   }})
  }

  static createObject(object: string): IObject | undefined {
    try {
        if (['Boss Mob', 'Normal Mob'].indexOf(object) > -1) {
            return MobsFactory.getMob(object[1])
        }
        if (['Heal Point', 'Heal Fruit'].indexOf(object) > -1) {
            return HealsFactory.getHeal(object[1])
        }
        throw new Error('No object Found')
    } catch (e) {
        console.log(e)
        return;
    }


  }
}

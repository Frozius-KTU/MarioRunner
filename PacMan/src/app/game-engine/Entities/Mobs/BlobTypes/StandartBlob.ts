import { Wall } from 'src/app/game-engine/Environment/Decorator';
import { Blob } from 'src/app/game-engine/Entities/blobEntity.model';
import { Player } from 'src/app/game-engine/Entities/player';
import BlobBuilder from '../Blob/BlobBuilder';

// generuos standartinius blobus tik leis pasirinkt ju spalva.
export class StandartBob {
  blob?: Blob;
  wall: Wall;
  player: Player;

  constructor(wall: Wall, player: Player) {
    this.wall = wall;
    this.player = player;
  }
  generateRedBlob() {
    this.blob = new BlobBuilder(this.wall)
      .setColor('red')
      .setCoordinates(this.player, this.wall)
      .setType('default')
      .getResult();
    return this.blob;
  }
  generateBlueBlob() {
    this.blob = new BlobBuilder(this.wall)
      .setColor('blue')
      .setCoordinates(this.player, this.wall)
      .setType('default')
      .getResult();
    return this.blob;
  }

  generatePinkBlob() {
    this.blob = new BlobBuilder(this.wall)
      .setColor('pink')
      .setCoordinates(this.player, this.wall)
      .setType('default')
      .getResult();
    return this.blob;
  }
  generateYellowBlob() {
    this.blob = new BlobBuilder(this.wall)
      .setColor('yellow')
      .setCoordinates(this.player, this.wall)
      .setType('default')
      .getResult();
    return this.blob;
  }
}
/*
  this.blob2 = new BlobBuilder(wall)
      .setColor('blue')
      .setCoordinates(this.player, wall)
      .setType('default')
      .getResult();
    this.blob3 = new BlobBuilder(wall)
      .setColor('pink')
      .setCoordinates(this.player, wall)
      .setType('default')
      .getResult();
    this.blob4 = new BlobBuilder(wall)
      .setColor('yellow')
      .setCoordinates(this.player, wall)
      .setType('default')
      .getResult();
      */

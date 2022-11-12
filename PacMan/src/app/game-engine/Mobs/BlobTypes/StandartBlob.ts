import { Wall } from "../../Decorator/wall";
import { Blob } from "../../Entities/blobEntity.model";
import { Snake } from "../../Entities/snake";
import BlobBuilder from "../Blob/BlobBuilder";

// generuos standartinius blobus tik leis pasirinkt ju spalva.
export class StandartBob
{
  blob?: Blob;
  wall: Wall;
  snake: Snake;

  constructor(wall: Wall, snake: Snake)
  {
    this.wall = wall;
    this.snake = snake;
  }
  generateRedBlob()
  {
    this.blob = new BlobBuilder(this.wall)
      .setColor('red')
      .setCoordinates(this.snake, this.wall)
      .setType('default')
      .getResult();
    return this.blob;
  }
  generateBlueBlob()
  {
    this.blob = new BlobBuilder(this.wall)
    .setColor('blue')
    .setCoordinates(this.snake, this.wall)
    .setType('default')
    .getResult();
    return this.blob;
  }

  generatePinkBlob()
  {
    this.blob = new BlobBuilder(this.wall)
    .setColor('pink')
    .setCoordinates(this.snake, this.wall)
    .setType('default')
    .getResult();
    return this.blob;
  }
  generateYellowBlob()
  {
    this.blob = new BlobBuilder(this.wall)
    .setColor('yellow')
    .setCoordinates(this.snake, this.wall)
    .setType('default')
    .getResult();
    return this.blob;
  }
}
  /*
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
      */

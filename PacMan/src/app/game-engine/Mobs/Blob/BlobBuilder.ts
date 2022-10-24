import { SignalRService } from "src/app/core/services/signalR.service";
import { IBlobBuilder } from "src/app/game-engine/Mobs/Blob/IBlobBuilder";
import { Blob } from "src/app/game-engine/Entities/blobEntity.model";
import { Wall } from "../../Decorator/wall";
import { Snake } from "../../Entities/snake";
export default class BlobBuilder implements IBlobBuilder  {
  blob: Blob
  constructor(wall: Wall){
    this.blob = new Blob(wall, new SignalRService);
  }
  setColor(color: string): this {
    this.blob.color = color
    return this
  }
  setType(type: string): this {
    this.blob.type = type
    return this
  }
  setCoordinates(snake: Snake, walls: Wall): this {
    this.blob.setRandomPosition(snake, walls)
    return this
  }
  getResult(): Blob {
    return this.blob
  }
}

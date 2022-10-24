import { Blob } from "src/app/game-engine/Entities/blobEntity.model";
import { Wall } from "../../Decorator/wall";
import { Snake } from "../../Entities/snake";

export interface IBlobBuilder {
  blob: Blob;
  setColor(color: string): this
  setType(type: string): this
  setCoordinates(snake: Snake, wall: Wall): this
  getResult(): Blob
}

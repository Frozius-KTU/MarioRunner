import { Blob } from "src/app/models/blobEntity.model";
import { Wall } from "../../Decorator/wall";
import { Snake } from "../../snake";

export interface IBlobBuilder {
  blob: Blob;
  setColor(color: string): this
  setType(type: string): this
  setCoordinates(snake: Snake, wall: Wall): this
  getResult(): Blob
}

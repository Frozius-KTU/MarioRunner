import { Blob } from "src/app/models/blobEntity.model";

export interface IBlobBuilder {
  blob: Blob;
  setColor(color: string): this
  setType(type: string): this
  setCoordinates(blobBody: [{ x: number, y: number }]): this
  getResult(): Blob
}

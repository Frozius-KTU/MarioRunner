import { Blob } from "./blobEntity.model";
import { iGhostMegaEntity } from "./iGhostMegaEntity";

export class BlobAdapter implements iGhostMegaEntity
{
  blob?: Blob;

  public BlobAdapter(blob: Blob)
  {
    this.blob = blob;
  }

  public RageBlob(time: number)
  {
    //this.blob?.blobRage(time);
  }
}

import { SignalRService } from "../core/services/signalR.service";

export interface MoveAlgorithm
{
  moveAlgorithm(direction: String): void;
  getInputs(): void;
  getInputDirection(): { x: number; y: number; };
  resetDirection(): void;
}

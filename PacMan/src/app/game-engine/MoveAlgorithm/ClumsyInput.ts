import { MoveAlgorithm } from "../MoveAlgorithm";

export class ClumsyInput implements MoveAlgorithm {

  inputDirection = { x: 0, y: 0 };
  lastInputDirection = { x: 0, y: 0 };
  /*constructor(inputDirection : { x: number; y: number; })
  {
    this.lastInputDirection = inputDirection;
    this.inputDirection = inputDirection;
  }*/
  getInputs() {
    window.addEventListener('keydown', e => {
      this.moveAlgorithm(e.key);
    })
  }

  moveAlgorithm(direction: String) {
    switch (direction) {
      case 'ArrowUp':
        //if (this.lastInputDirection.y !== 0) break;
        this.inputDirection = { x: 0, y: 1 };
        break;
      case 'ArrowDown':
        //if (this.lastInputDirection.y !== 0) break;
        this.inputDirection = { x: 0, y: -1 };
        break;
      case 'ArrowLeft':
        //if (this.lastInputDirection.x !== 0) break;
        this.inputDirection = { x: 1, y: 0 };
        break;
      case 'ArrowRight':
        //if (this.lastInputDirection.x !== 0) break;
        this.inputDirection = { x: -1, y: 0 };
        break;
    }
  }

  getInputDirection() {
    //this.lastInputDirection = this.inputDirection;
    return this.inputDirection;
  }

  resetDirection(){
    this.inputDirection = { x: 0, y: 0 };
  }

}

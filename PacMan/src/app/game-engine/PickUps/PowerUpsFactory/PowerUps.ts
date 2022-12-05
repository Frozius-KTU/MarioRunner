import { randomGridPosition } from '..//../gameboard-grid.util';
import { Wall } from '../../Environment/Decorator';
import { Player } from '../../Entities/player';

export interface IPowerUp {
  update(): void;
  draw(gameBoard: any): void;
  getRanomPowerUpPosition(): void;
  effect(): void;
}

export class PowerUp1 implements IPowerUp {
  public powerup: any;
  public player;
  constructor(player: any, public walls: Wall) {
    this.player = player;
    this.powerup = this.getRanomPowerUpPosition();
  }

  update() {
    if (
      this.player.onPlayer(this.powerup) ||
      this.walls.onObject(this.powerup)
    ) {
      this.powerup = this.getRanomPowerUpPosition();
      this.effect();
    }
  }

  getRanomPowerUpPosition() {
    let newFoodPosition;
    while (
      newFoodPosition == null ||
      this.player.onPlayer(newFoodPosition) ||
      this.walls.onObject(newFoodPosition)
    ) {
      newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
  }

  draw(gameBoard: any) {
    const powerupelement = document.createElement('div');
    powerupelement.style.gridRowStart = this.powerup.y;
    powerupelement.style.gridColumnStart = this.powerup.x;
    powerupelement.style.backgroundImage =
      "url('https://icons.iconarchive.com/icons/ph03nyx/super-mario/128/Retro-P-Wing-icon.png')";
    powerupelement.style.backgroundSize = 'cover';
    powerupelement.classList.add('powerups');
    gameBoard.appendChild(powerupelement);
  }

  effect() {
    this.player.changePlayerState();
    setTimeout(() => {
      this.player.changePlayerState();
      console.log('Immortal efektas beigesi po 15 sekundziu');
    }, 15000);
  }
}

export class PowerUp2 implements IPowerUp {
  public powerup: any;
  public player;
  constructor(player: any, public walls: Wall) {
    this.player = player;
    this.powerup = this.getRanomPowerUpPosition();
  }
  update() {
    if (
      this.player.onPlayer(this.powerup) ||
      this.walls.onObject(this.powerup)
    ) {
      this.powerup = this.getRanomPowerUpPosition();
      this.effect();
    }
  }

  getRanomPowerUpPosition() {
    let newFoodPosition;
    while (
      newFoodPosition == null ||
      this.player.onPlayer(newFoodPosition) ||
      this.walls.onObject(newFoodPosition)
    ) {
      newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
  }

  draw(gameBoard: any) {
    const powerupelement = document.createElement('div');
    powerupelement.style.gridRowStart = this.powerup.y;
    powerupelement.style.gridColumnStart = this.powerup.x;
    powerupelement.style.backgroundImage =
      "url('https://icons.iconarchive.com/icons/ph03nyx/super-mario/128/Retro-P-Wing-icon.png')";
    powerupelement.style.backgroundSize = 'cover';
    powerupelement.classList.add('powerups');
    gameBoard.appendChild(powerupelement);
  }

  effect() {
    this.player.changePlayerState();
    setTimeout(() => {
      this.player.changePlayerState();
      console.log('Immortal efektas beigesi po 10 sekundziu');
    }, 10000);
  }
}

export class PowerUp3 implements IPowerUp {
  public powerup: any;
  public player;
  constructor(player: any, public walls: Wall) {
    this.player = player;
    this.powerup = this.getRanomPowerUpPosition();
  }
  update() {
    if (
      this.player.onPlayer(this.powerup) ||
      this.walls.onObject(this.powerup)
    ) {
      this.powerup = this.getRanomPowerUpPosition();
      this.effect();
    }
  }

  getRanomPowerUpPosition() {
    let newFoodPosition;
    while (
      newFoodPosition == null ||
      this.player.onPlayer(newFoodPosition) ||
      this.walls.onObject(newFoodPosition)
    ) {
      newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
  }

  draw(gameBoard: any) {
    const powerupelement = document.createElement('div');
    powerupelement.style.gridRowStart = this.powerup.y;
    powerupelement.style.gridColumnStart = this.powerup.x;
    powerupelement.style.backgroundImage =
      "url('https://icons.iconarchive.com/icons/ph03nyx/super-mario/128/Retro-P-Wing-icon.png')";
    powerupelement.style.backgroundSize = 'cover';
    powerupelement.classList.add('powerups');
    gameBoard.appendChild(powerupelement);
  }

  effect() {
    this.player.changePlayerState();
    setTimeout(() => {
      this.player.changePlayerState();
      console.log('Immortal efektas beigesi po 5 sekundziu');
    }, 5000);
  }
}

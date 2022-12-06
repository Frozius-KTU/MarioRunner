import { GameBoardComponent } from '../game-board/game-board.component';
import { AbstractPlayer, Player } from './Entities/player';

// export class Context {
//   x: number;
//   y: number;
//   immortal = false;
//   player: Player;

//   constructor(x: number, y: number, player: Player) {
//     this.x = x;
//     this.y = y;
//     this.player = player
//   }
// }

export interface IExpression {
  Interpret(): any;
}

export class GiveExpresion implements IExpression {
  constructor(
    player: AbstractPlayer,
    gameBoard: GameBoardComponent,
    token: string[]
  ) {
    this.player = player;
    this.token = token;
    this.gameBoard = gameBoard;
  }
  player: AbstractPlayer;
  token: string[];
  gameBoard: GameBoardComponent;

  Interpret(): any {
    if (this.token[0] == 'immortal') {
      //this.player.immortal = true;
      return 'not implamented';
    } else if (this.token[0] == 'points') {
      if (parseInt(this.token[1])) {
        this.player.score += parseInt(this.token[1]);
      } else {
        return 'invalid give points command';
      }
    } else if (this.token[0] == 'health') {
      if (parseInt(this.token[1])) {
        //this.gameBoard.player!.moveAlgorithm.moveAlgorithm('ArrowUp');
        return 'not implamented';
      } else if (this.token[1] == 'max') {
        return 'not implamented';
      } else {
        return 'invalid give health command';
      }
    } else {
      return 'invalid give command';
    }
  }
}
export class RemoveExpresion implements IExpression {
  constructor(
    player: AbstractPlayer,
    gameBoard: GameBoardComponent,
    token: string[]
  ) {
    this.player = player;
    this.token = token;
    this.gameBoard = gameBoard;
  }
  player: AbstractPlayer;
  token: string[];
  gameBoard: GameBoardComponent;

  Interpret(): any {
    if (this.token[0] == 'immortal') {
      //this.player.immortal = false;
      return 'not implamented';
    } else if (this.token[0] == 'points') {
      if (parseInt(this.token[1])) {
        this.player.score -= parseInt(this.token[1]);
      } else {
        return 'invalid remove points command';
      }
    } else if (this.token[0] == 'health') {
      if (parseInt(this.token[1])) {
        return 'not implamented';
      } else {
        return 'invalid remove health command';
      }
    } else {
      return 'invalid remove command';
    }
  }
}
export class TeleportExpresion implements IExpression {
  constructor(player: AbstractPlayer, token: string[]) {
    this.player = player;
    this.token = token;
  }
  player: AbstractPlayer;
  token: string[];

  Interpret(): any {
    if (parseInt(this.token[0]) && parseInt(this.token[1])) {
      this.player.body.x = parseInt(this.token[0]);
      this.player.body.y = parseInt(this.token[1]);
    } else {
      return 'invalid tp command';
    }
  }
}
export class MoveExpresion implements IExpression {
  constructor(player: AbstractPlayer, token: string[]) {
    this.player = player;
    this.token = token;
  }
  player: AbstractPlayer;
  token: string[];

  Interpret(): any {
    if (this.token[0] == 'up') {
      this.player.body.y -= 1;
    } else if (this.token[0] == 'down') {
      this.player.body.y += 1;
    } else if (this.token[0] == 'left') {
      this.player.body.x -= 1;
    } else if (this.token[0] == 'right') {
      this.player.body.x += 1;
    } else {
      return 'invalid move command';
    }
  }
}

export class PlayerExpresion implements IExpression {
  constructor(
    player: AbstractPlayer,
    gameBoard: GameBoardComponent,
    token: string[]
  ) {
    this.player = player;
    this.token = token;
    this.gameBoard = gameBoard;
  }
  player: AbstractPlayer;
  token: string[];
  gameBoard: GameBoardComponent;

  Interpret(): any {
    let expression;

    if (this.token[0] == 'tp') {
      this.token.splice(0, 1);
      expression = new TeleportExpresion(this.player, this.token);
      return expression.Interpret();
    } else if (this.token[0] == 'move') {
      this.token.splice(0, 1);
      expression = new MoveExpresion(this.player, this.token);
      return expression.Interpret();
    } else if (this.token[0] == 'give') {
      this.token.splice(0, 1);
      expression = new GiveExpresion(this.player, this.gameBoard, this.token);
      return expression.Interpret();
    } else if (this.token[0] == 'remove') {
      this.token.splice(0, 1);
      expression = new RemoveExpresion(this.player, this.gameBoard, this.token);
      return expression.Interpret();
    } else {
      return 'invalid player command';
    }
  }
}

export class ExpressionParser {
  constructor(
    player: AbstractPlayer,
    opponent: AbstractPlayer,
    gameBoard: GameBoardComponent
  ) {
    this.player = player;
    this.opponent = opponent;
    this.gameBoard = gameBoard;
  }
  player: AbstractPlayer;
  opponent: AbstractPlayer;
  gameBoard: GameBoardComponent;

  parse(command: string): any {
    console.log(this.gameBoard);

    let token: string[] = command.split(' ');
    for (let i = 0; i < token.length; i++) {
      if (token[i] == '') {
        token.splice(i, 1);
        i--;
      }
    }
    console.log(token);

    let expression;

    if (token[0] == 'player') {
      token.splice(0, 1);
      expression = new PlayerExpresion(this.player, this.gameBoard, token);
      return expression.Interpret();
    } else if (token[0] == 'opponent') {
      token.splice(0, 1);
      expression = new PlayerExpresion(this.opponent, this.gameBoard, token);
      return expression.Interpret();
    } else {
      return 'invalid command';
    }
  }
}

// export class Interpreter {
//   main() {
//     let player = new Context(0, 0);
//     let opponent = new Context(0, 0);
//     let parser = new ExpressionParser(player, opponent);
//     let command = 'player tp 10 10';
//     let command2 = 'opponent move down';
//     let command3 = 'player give immortal';

//     parser.parse(command);
//     parser.parse(command2);
//     parser.parse(command3);

//     console.log(player);
//     console.log(opponent);
//   }
// }

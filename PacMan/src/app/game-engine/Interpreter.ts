export class Context {
  number: number;
  x: number;
  y: number;
  result: string;

  constructor(number: number, x: number, y: number) {
    this.number = number;
    this.result = '';
    this.x = x;
    this.y = y;
  }
}

export interface IExpression {
  Interpret(): void;
}

export class NumberExpresion implements IExpression {
  constructor(context: Context) {
    this.context = context;
  }
  context: Context;

  Interpret(): void {
    let stringNumber: string = this.context.number.toString();

    let numberTranslations: string[] = [
      'Zero',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
    ];

    for (let i = 0; i < stringNumber.length; i++) {
      let character = stringNumber[i];
      this.context.result += numberTranslations[parseInt(character)] + '-';
    }
  }
}

export class UnitExpresion implements IExpression {
  constructor(context: Context, expression: string) {
    this.context = context;
    this.expression = expression;
  }
  context: Context;
  expression: string;

  Interpret(): void {
    let tokens = this.expression.split(' ');

    this.context.x = parseInt(tokens[0]);
    this.context.y = parseInt(tokens[1]);
  }
}

export class TeleportExpresion implements IExpression {
  constructor(player: Context, token: string[]) {
    this.player = player;
    this.token = token;
  }
  player: Context;
  token: string[];

  Interpret(): void {
    if (parseInt(this.token[0]) && parseInt(this.token[1])) {
      this.player.x = parseInt(this.token[0]);
      this.player.y = parseInt(this.token[1]);
    } else {
      console.log('invalid command');
    }
  }
}

export class PlayerExpresion implements IExpression {
  constructor(player: Context, token: string[]) {
    this.player = player;
    this.token = token;
  }
  player: Context;
  token: string[];

  Interpret(): void {
    let expression;

    if (this.token[1] == 'tp') {
      this.token.splice(0);
      expression = new TeleportExpresion(this.player, this.token);
      expression.Interpret();
    } else if (this.token[1] == 'move') {
      console.log('not implamented command');
    } else {
      console.log('invalid command');
    }
  }
}

export class ExpressionParser {
  constructor(player: Context, opponent: Context) {
    this.player = player;
    this.opponent = opponent;
  }
  player: Context;
  opponent: Context;

  parse(command: string) {
    let token: string[] = command.split(' ');
    let expression;

    if (token[0] == 'player') {
      token.splice(0);
      expression = new PlayerExpresion(this.player, token);
      expression.Interpret();
    } else if (token[0] == 'opponent') {
      token.splice(0);
      expression = new PlayerExpresion(this.opponent, token);
      expression.Interpret();
    } else {
      console.log('invalid command');
    }

    // expression = new NumberExpresion(this.player);
    // let moveexpression = new UnitExpresion(this.player, '1 2');

    // expression.Interpret();

    // moveexpression.Interpret();

    // let result: string = this.player.result;
    // console.log('The string is:' + result);

    // console.log(this.player);
  }
}

export class Interpreter {
  main() {
    let player = new Context(3456, 0, 0);
    let opponent = new Context(3456, 0, 0);
    let parser = new ExpressionParser(player, opponent);
    let command = 'player tp 10 10';
    parser.parse(command);

    console.log(player);
    console.log(opponent);
  }
}

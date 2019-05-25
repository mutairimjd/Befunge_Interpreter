// Befunge Interpreter

function interpret(code) {
    let output = "";
    let Code_Instructions = code.split('\n').map((i) => { return i.split(''); });
    let Stack = [];
    let X = 0;
    let Y = 0;
    let MoveDirection = '>';
    let Current_Instruction;
    // TODO: Interpret the code!

    // Instructions Functions 
    var MoveRight = () => {
        if (X < Code_Instructions[Y].length - 1) {
            X++;
        } else {
            Y++;
            X = 0;
        }
    }
    var MoveLeft = () => {
        if (X > 0) {
            X--;
        } else {
            Y++;
            X = Code_Instructions[Y].length - 1;
        }
    }
    var MoveDown = () => {
        if (Y < Code_Instructions.length - 1) {
            Y++;
        } else {
            Y = 0;
            X++;
        }
    }
    var MoveUp = () => {
        if (Y > 0) {
            Y--;
        } else {
            Y = Code_Instructions.length - 1;
            X = X++;
        }
    }
    var MoveToNext = () => {
        switch (MoveDirection) {
            case '>':
                MoveRight();
                break;
            case '<':
                MoveLeft();
                break;
            case 'v':
                MoveDown();
                break;
            case '^':
                MoveUp();
                break;
        }
    }

    const InterpretToNumber = (num) => {
        Stack.push(num);
        MoveToNext();
    }
    const Addition = () => {
        Stack.push(Stack.pop() + Stack.pop());
        MoveToNext();
    }
    const Subtraction = () => {
        var a = Stack.pop();
        var b = Stack.pop();
        Stack.push(b - a);
        MoveToNext();
    }
    const Multiplication = () => {
        Stack.push(Stack.pop() * Stack.pop());
        MoveToNext();
    }
    var Division = () => {
        var a = Stack.pop();
        var b = Stack.pop();
        Stack.push(a ? Math.floor(b / a) : 0);
        MoveToNext();
    }
    var Modulo = () => {
        var a = Stack.pop();
        var b = Stack.pop();
        Stack.push(a ? b % a : 0);
        MoveToNext();
    }
    var Bang = () => {
        Stack.push(Stack.pop() ? 0 : 1);
        MoveToNext();
    }
    var GreaterThan = () => {
        var a = Stack.pop();
        var b = Stack.pop();
        Stack.push(b > a ? 1 : 0);
        MoveToNext();
    }
    var Underscore = () => {
        MoveDirection = Stack.pop() ? '<' : '>';
        MoveToNext();
    }
    var pipe = () => {
        MoveDirection = Stack.pop() ? '^' : 'v';
        MoveToNext();
    }
    var StringMode = () => {
        MoveToNext();
        while (Code_Instructions[Y][X] !== '"') {
            Stack.push(Code_Instructions[Y][X].charCodeAt(0));
            MoveToNext();
        }
        MoveToNext();
    }
    var DuplicateValue = () => {
        Stack.push(Stack.length ? Stack[Stack.length - 1] : 0);
        MoveToNext();
    }
    var Swap = () => {
        if (Stack.length === 1) {
            Stack.push(0);
        } else {
            var a = Stack.pop();
            var b = Stack.pop();
            Stack.push(a);
            Stack.push(b);
        }
        MoveToNext();
    }
    var PopAsInteger = () => {
        output += Stack.pop();
        MoveToNext();
    }
    var PopAsAscii = () => {
        output += String.fromCharCode(Stack.pop());
        MoveToNext();
    }
    var Put = () => {
        var y = Stack.pop();
        var x = Stack.pop();
        var v = Stack.pop();
        Code_Instructions[y][x] = String.fromCharCode(v);
        MoveToNext();
    }
    var Get = () => {
        var y = Stack.pop();
        var x = Stack.pop();
        Stack.push(Code_Instructions[y][x].charCodeAt(0));
        MoveToNext();
    }
    var RandomDirection = () => {
        var directions = ['>', '<', '^', 'v'];
        return directions[Math.floor(Math.random() * directions.length)];
    }
    var ChangeDirection = (direction) => {
        MoveDirection = (direction === '?') ? RandomDirection() : direction;
        MoveToNext();
    }
    var Pop = () => {
        return Stack.pop();
        MoveToNext();
    }

    const Instructions = {
        // 0-9 Push this number onto the stack.
        0: InterpretToNumber(0),
        1: InterpretToNumber(1),
        2: InterpretToNumber(2),
        3: InterpretToNumber(3),
        4: InterpretToNumber(4),
        5: InterpretToNumber(5),
        6: InterpretToNumber(6),
        7: InterpretToNumber(7),
        8: InterpretToNumber(8),
        9: InterpretToNumber(9),
        '+': Addition(),// + Addition: Pop a and b, then push a+b.
        '-': Subtraction(),// - Subtraction: Pop a and b, then push b-a.
        '*': Multiplication(),// * Multiplication: Pop a and b, then push a*b.
        '/': Division(),// / Integer division: Pop a and b, then push b/a, rounded down. If a is zero, push zero.
        '%': Modulo(),// % Modulo: Pop a and b, then push the b%a. If a is zero, push zero.
        '!': Bang(),// ! Logical NOT: Pop a value. If the value is zero, push 1; otherwise, push zero.
        '`': GreaterThan(),// ` (backtick) Greater than: Pop a and b, then push 1 if b>a, otherwise push zero.
        '>': ChangeDirection('>'),// > Start moving right.
        '<': ChangeDirection('<'),// < Start moving left.
        '^': ChangeDirection('^'),// ^ Start moving up.
        'v': ChangeDirection('v'),// v Start moving down.
        '?': ChangeDirection('?'),// ? Start moving in a random cardinal direction.
        '_': Underscore(),// _ Pop a value; move right if value = 0, left otherwise.
        '|': pipe(),// | Pop a value; move down if value = 0, up otherwise.
        '"': StringMode(),// " Start string mode: push each character's ASCII value all the way up to the next ".
        ':': DuplicateValue(),// : Duplicate value on top of the stack. If there is nothing on top of the stack, push a 0.
        '\\': Swap(),// \ Swap two values on top of the stack. If there is only one value, pretend there is an extra 0 on bottom of the stack.
        '$': Pop(),// $ Pop value from the stack and discard it.
        '.': PopAsInteger(),// . Pop value and output as an integer.
        ',': PopAsAscii(),// , Pop value and output the ASCII character represented by the integer code that is stored in the value.
        '#': MoveToNext(),// # Trampoline: Skip next cell.
        'p': Put(),// p A "put" call (a way to store a value for later use). Pop y, x and v, then change the character at the position (x,y) in the program to the character with ASCII value v.
        'g': Get(),// g A "get" call (a way to retrieve data in storage). Pop y and x, then push ASCII value of the character at that position in the program.
        ' ': MoveToNext(),//  (i.e. a space) No-op. Does nothing.
    }

    while (Code_Instructions[Y][X] !== '@') {
        console.log("Current_Instruction: ", Current_Instruction);
        Current_Instruction = Code_Instructions[Y][X];
        Instructions[Current_Instruction]();
        console.log("Current_Instruction: ", Current_Instruction);
    }
    return output;
}


let string1 : string = 'String';
let number1 : number = 1;
let boolean1 : Boolean = true;
let undefined1 : undefined = undefined;
let function1 : Function = () => {};
let numberArray : number[] = [1,2,3];

let stringOrNumber : string | number = '123';

/** Array **/
let array1 : Array<number> = [2,3,4];
let numberOrArray : number | Array<number> = [1,2,3];
let objectArray : Array<{x: string, y: number}> = [{x: 'chuoi', y: 1}];

type MyBool = true | false;
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

/** Interface **/
interface User {
  name: string;
  id: number;
}

const user: User = {
  name: "Hayes",
  id: 0,
};

function getAdminUser(): User {
  const user1: User = {
    name: "Hayes",
    id: 0,
  };
  return user1;
}

/** Generic **/
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

declare const BackpackString: Backpack<string>;
declare const BackpackNumber: Backpack<number>;

const backpack1: BackpackString = {
  add: (value: string) => {
    return;
  },
  get: () => {return 'get method'; }
}

const backpack2: Backpack<string> = {
  add: (value: string) => {
    return;
  },
  get: () => {return 'get method'; }
}


function getLength(obj: string | string[]) {
  return obj.length;
}

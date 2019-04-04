export default class Boat {
  constructor(length, direction){
    this.length = length
    this.direction = direction;
    this.coords = null;
  }
}

export const VERTICAL =  Symbol(1);
export const HORIZONTAL =  Symbol(1);

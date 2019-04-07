export default class Boat {
  constructor(length, direction){
    this.length = length
    this.direction = direction;
    this.coords = null;
    this.hits = [];
  }

  hit(coord){
    this.hits.push(coord);
  }

  isAlive(){
    return this.hits.length !== this.length;
  }

}

export const VERTICAL =  Symbol(1);
export const HORIZONTAL =  Symbol(1);

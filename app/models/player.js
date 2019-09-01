import { tracked } from '@glimmer/tracking';
import BoatInserter from 'battleships/inserters/basic';

export default class Boat {

  @tracked _isAlive = true;

  constructor(board){
    this.boatInserter = new BoatInserter(board);
    this.boats = [];
    this.board = board;
  }

  insertBoat(boat) {
    this.boats.push(boat);
    let boatCoords = this.boatInserter.insert(boat);
    this.boatCoords = {
      ...this.boatCoords,
      ...boatCoords
    }
  }

  attack(x,y){
    let coordString = `${x},${y}`;
    this.board.attack(x, y);
    let boat = this.boatCoords[coordString];
    if(boat) {
      this.boatCoords[coordString].hit(coordString);
    }
  }

  get isAlive(){
    this._isAlive = !!this.boats.reduce(function(acc, boat){
      if(boat.isAlive()){
        return acc;
      }
      return acc - 1;
    }, this.boats.length);
    return this._isAlive;
  }

}

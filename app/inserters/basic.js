import { VERTICAL , HORIZONTAL } from 'battleships/models/boat';
import BoatItterator from 'battleships/data-types/boat-itterator';

export default class BoatInserter {

  constructor(board){
    this.boardObject = board;
  }

  get board(){
    return this.boardObject.board;
  }

  get size() {
    return this.boardObject.size;
  }

  insert(boat) {
    this.coordCache = {};
    let inserted = this.attemptInsert(boat);
    while(!inserted){
      inserted = this.attemptInsert(boat);
    }
    return this.coordCache;
  }

  getACoord(){
    return (Math.abs(Math.floor(Math.random() *  this.size)))
  }

  attemptInsert(boat) {
    function checkLength(coords,coord,boat, boardSize){
      return  coords[coord] + boat.length > boardSize ? coords[coord] - boat.length : coords[coord]
    }

    let coords = {
      x: this.getACoord(),
      y: this.getACoord(),
    }

    if(boat.direction === VERTICAL) {
      coords.x = checkLength(coords,'x', boat, this.size);
    } else {
      coords.y = checkLength(coords, 'y', boat, this.size);
    }

    let itterator = new BoatItterator(boat, coords);
    itterator = itterator[Symbol.iterator]();
    for(let currentCoord of itterator){
      //dry run
      if(this.board[currentCoord.y][currentCoord.x] === 2){
        return false;
      }
    }

    itterator = itterator[Symbol.iterator]();
    for(let currentCoord of itterator){
      this.coordCache[`${currentCoord.x},${currentCoord.y}`] = boat;
    }

    boat.coords = coords;

    return true
  }
}

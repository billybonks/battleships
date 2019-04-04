import { VERTICAL , HORIZONTAL } from 'battleships/models/boat'

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
    let inserted = this.attemptInsert(boat);
    while(!inserted){
      inserted = this.attemptInsert(boat);
    }
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

    if(boat.direction === VERTICAL) {
      for(let i = 0; i < boat.length; i++) {
        //dry run
        if(this.board[coords.y][coords.x+i] === 2){
          return false;
        }
      }
      //insert
      for(let i = 0; i < boat.length; i++) {
        this.board[coords.y][coords.x+i] = 2;
      }
    }

    if(boat.direction === HORIZONTAL) {
      //dry run
      for(let i = 0; i < boat.length; i++) {
        if(this.board[coords.y+i][coords.x] === 2){
          return false;
        }
      }
      //insert
      for(let i = 0; i < boat.length; i++) {
        this.board[coords.y+i][coords.x] = 2;
      }
    }
    return true
  }
}

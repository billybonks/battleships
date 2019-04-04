import { tracked } from '@glimmer/tracking';
import { VERTICAL , HORIZONTAL } from 'battleships/models/boat'

export default class Boat {
  @tracked board = []

  constructor(size){
    this.size = size
    for(let i = 0; i < this.size; i++) {
      this.board.push(new Array(this.size))
    }
  }

  refresh(){
    //have to trick ember into rerender
    let newBoard = [];
    for(let i = 0; i < this.size; i++) {
      newBoard.push([...this.board[i]])
    }
    this.board = newBoard;
  }

  attack(rowIndex, colIndex){
    this.board[rowIndex][colIndex] = true;
  }

  insertBoat(boat) {
    let inserted = this.attemptInsert(boat);
    while(!inserted){
      inserted = this.attemptInsert(boat);
    }
  }

  attemptInsert(boat) {
    function checkLength(coords,coord,boat, boardSize){
      return  coords[coord] + boat.length > boardSize ? coords[coord] - boat.length : coords[coord]
    }

    function getACoord(boardSize){
      return (Math.abs(Math.floor(Math.random() *  boardSize)))
    }

    let coords = {
      x: getACoord(this.size),
      y: getACoord(this.size),
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

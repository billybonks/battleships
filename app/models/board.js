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
      debugger
      console.log('collided')
      inserted = this.attemptInsert(boat);
    }
  }

  attemptInsert(boat) {
    let c = null;
    let r = null;
    if(boat.direction === VERTICAL) {
      c = Math.abs(Math.floor(Math.random() *  this.size - boat.length));
      r = Math.abs(Math.floor(Math.random() *  this.size));
      for(let i = 0; i < boat.length; i++) {
        //dry run
        if(this.board[r][c+i] === 2){
          return false;
        }
      }
      //insert
      for(let i = 0; i < boat.length; i++) {
        this.board[r][c+i] = 2;
      }
    }

    if(boat.direction === HORIZONTAL) {
      c = Math.abs(Math.floor(Math.random() *  this.size));
      r = Math.abs(Math.floor(Math.random() *  this.size - boat.length));
      //dry run
      for(let i = 0; i < boat.length; i++) {
        if(this.board[r+i][c] === 2){
          return false;
        }
      }
      //insert
      for(let i = 0; i < boat.length; i++) {
        this.board[r+i][c] = 2;
      }
    }
    return true
  }
}

import { tracked } from '@glimmer/tracking';

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
}

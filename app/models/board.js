import { tracked } from '@glimmer/tracking';
import Range from 'battleships/data-types/range';

export default class Board {
  @tracked board = []

  boatCoords = {};

  constructor(size){
    this.size = size
    this.sizeItterator = new Range(0, this.size-1);
    this.constructBoard();
  }

  constructBoard(){
    let itterator = this.sizeItterator[Symbol.iterator]()
    while(true) {
      let { done } = itterator.next()
      if(!done){
        let x = new Array(this.size);
        x.fill(0)
        this.board.push(x)
      } else {
        break;
      }
    }
  }

  refresh(){
    //have to trick ember into rerender
    let newBoard = [];
    for(let i of this.sizeItterator) {
      newBoard.push([...this.board[i]])
    }
    this.board = newBoard;
  }

  attack(x, y){
    if(this.board[y][x] == 2) {
      this.board[y][x] = 3;
    } else {
      this.board[y][x] = 1;
    }
    this.refresh();
  }
}

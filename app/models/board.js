import { tracked } from '@glimmer/tracking';
import Range from 'battleships/data-types/range';
import BoatInserter from 'battleships/inserters/basic';

export default class Boat {
  @tracked board = []

  constructor(size){
    this.size = size
    this.sizeItterator = new Range(0, this.size-1);
    this.boatInserter = new BoatInserter(this);
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

  attack(rowIndex, colIndex){
    if(this.board[rowIndex][colIndex] == 2){
      this.board[rowIndex][colIndex] = 3;
    } else {
      this.board[rowIndex][colIndex] = 1;
    }
  }

  insertBoat(boat) {
    this.boatInserter.insert(boat);
  }
}

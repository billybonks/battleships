import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
export default class BoardComponent extends Component {

  @tracked lastClick = null
  @tracked board = []

  constructor() {
    super(...arguments)
    debugger
    for(let i = 0; i < this.height; i++) {
      debugger
      this.board.push(new Array(this.width))
    }
    console.log(this.board)
  }

  get height(){
    return parseInt(this.args.height)
  }

  get width(){
    return parseInt(this.args.width)
  }

  @action
  bomb(rowIndex, colIndex){
    this.board[rowIndex][colIndex] = true;
    //have to trick ember into rerender
    let newBoard = [];
    for(let i = 0; i < this.height; i++) {
      newBoard.push([...this.board[i]])
    }
    this.board = newBoard;
    this.lastClick = `${rowIndex},${colIndex}`;
    this.board.push(null)
  }


}

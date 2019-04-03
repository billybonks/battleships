import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
export default class BoardComponent extends Component {

  @tracked lastClick = null
  @tracked board = []
  @tracked width = null;
  @tracked height = null;

  constructor() {
    super(...arguments)
    for(let i = 0; i < this.size; i++) {
      this.board.push(new Array(this.size))
    }
    this.height = this.size * 50;
    this.width = this.size * 50;
  }

  get size(){
    return parseInt(this.args.size);
  }

  @action
  bomb(rowIndex, colIndex){
    this.board[rowIndex][colIndex] = true;
    //have to trick ember into rerender
    let newBoard = [];
    for(let i = 0; i < this.size; i++) {
      newBoard.push([...this.board[i]])
    }
    this.board = newBoard;
    this.lastClick = `${rowIndex},${colIndex}`;
    this.board.push(null)
  }


}

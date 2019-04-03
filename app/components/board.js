import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Boat, { VERTICAL , HORIZONTAL } from 'battleships/models/boat'
import Board from 'battleships/models/board'
export default class BoardComponent extends Component {

  @tracked lastClick = null

  @tracked width = null;
  @tracked height = null;

  constructor() {
    super(...arguments)
    let boat1 = new Boat(2,VERTICAL)
    let boat2 = new Boat(2,HORIZONTAL)
    this.board = new Board(this.size);
    this.board.insertBoat(boat1);
    this.board.insertBoat(boat2);
    this.height = this.size * 50;
    this.width = this.size * 50;
  }

  get size(){
    return parseInt(this.args.size);
  }

  @action
  bomb(rowIndex, colIndex){
    this.board.attack(rowIndex, colIndex)
    this.board.refresh();
  }


}

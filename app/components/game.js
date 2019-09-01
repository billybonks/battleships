import Component from '@glimmer/component';
import { action } from '@ember/object';
import Boat, { VERTICAL , HORIZONTAL } from 'battleships/models/boat';
import Board from 'battleships/models/board';
import Player from 'battleships/models/player';

export default class GameComponent extends Component {
  constructor() {
    super(...arguments);
    this.boats = [new Boat(2,VERTICAL), new Boat(2,HORIZONTAL)]
    this.board = new Board(+this.args.size);
    this.player = new Player(this.board);
    for (let boat of this.boats ) {
      this.player.insertBoat(boat);
    }
  }

  @action
  attack(x, y){
    debugger
    this.player.attack(x, y);
  }

}

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class BoardComponent extends Component {
  @tracked width = null;
  @tracked height = null;

  constructor() {
    super(...arguments)
    this.height = this.size * 50;
    this.width = this.size * 50;
  }

  get size(){
    return this.args.board.board.length;
  }

  @action
  attack(x, y){
    this.args.attack(x, y);
  }
}

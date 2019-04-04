import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MapBlockComponent extends Component {
  @action
  click(){
    if(this.args.value === 3 || this.args.value === 1){
      return;
    }
    this.args.bomb();
  }
}

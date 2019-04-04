import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MapBlockComponent extends Component {
  @action
  click(){
    if(this.args.value === 0){
      this.args.bomb();
    }
  }
}

import Component from '@glimmer/component';
import { VERTICAL , HORIZONTAL } from 'battleships/models/boat';

export default class BoatComponent extends Component {


  constructor(){
    super(...arguments);
    this.width = 50;
    this.height  = 50;
    this.top = 50 * (this.args.boat.coords.y);
    this.left = 50 * (this.args.boat.coords.x);
    if(this.args.boat.direction === VERTICAL ){
      this.width = 50 * this.args.boat.length;
    }
    if(this.args.boat.direction === HORIZONTAL ){
      this.height = 50 * this.args.boat.length;
    }
  }
}

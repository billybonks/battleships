import Component from '@glimmer/component';
import { action } from '@ember/object';
import RTC from 'battleships/models/rtc';

export default class ChatComponent extends Component {

  constructor(){
    super(...arguments);
    this.connect2();
  }

  async connect2(){
    this.connection = new RTC();
    await this.connection.init();
    //this.connection2 = new RTC();
    //let localOffer = await  this.connection.createOffer();

    // await this.connection2.connection.setRemoteDescription(localOffer);
    // let answer = await this.connection2.createAnswer();
    // this.connection.connection.setRemoteDescription(answer);
    //this.connection.dataChannel.send("hello world omg");
    debugger
    //create answer when in state have-remote-offer
    //


  }

  @action
  sendIt(event){
    console.log(event.target.value)
  }

  @action
  connect(event){
    this.connection.connect(event.target.value)
  }

  sendMessage(selector, channel) {
  const textarea = this.shadowRoot.querySelector(selector);
  const value = textarea.value;
  if (value === '') {
    console.log('Not sending empty message!');
    return;
  }
  console.log('Sending remote message: ', value);
  channel.send(value);
  textarea.value = '';
}
}

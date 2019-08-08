import SignalingHelper from 'battleships/models/signaling-helper';

export default class RTC {
  constructor(){
    this.connection = new RTCPeerConnection();
    this.connection.addEventListener('icecandidate', this.iceCandidate.bind(this));
    this.connection.addEventListener('message', this.onMessage.bind(this));
    this.dataChannel = this.connection.createDataChannel('messaging-channel', {ordered: true});
    this.dataChannel.binaryType = 'arraybuffer';
    this.dataChannel.addEventListener('open', this.open.bind(this));
    this.dataChannel.addEventListener('close', this.close.bind(this));
    this.connection.addEventListener('datachannel', () => {
      debugger
    });
    console.log(this)
    //this.createOffer();
  }

  async init(){
    let response = await SignalingHelper.findOffer();
    const responseJson = await response.json();
    if(!responseJson.offer) {
      await this.createOffer();
      SignalingHelper.listenForAnswers().then((answer) => {
        this.connection.setRemoteDescription(answer);
        console.log(this)
      });
    } else {
      this.createAnswer(responseJson.offer)
    }
  }
  async createOffer() {
    const offer = await this.connection.createOffer();
    await this.connection.setLocalDescription(offer);
    await SignalingHelper.postOffer(offer);
  }

  async createAnswer(offer) {
    this.connection.setRemoteDescription(offer);
    const answer = await this.connection.createAnswer();
    await this.connection.setLocalDescription(answer);
    await SignalingHelper.postAnswer(answer);
  }

  // async createAnswer(offer) {
  //   debugger
  //   const remoteDesc = await this.connection.setRemoteDescription(offer);
  //   let ans = await this.connection.createAnswer();
  //   console.log(`${JSON.stringify(ans)}`);
  // }

  async connect(desc){
    console.log(JSON.parse(desc))
    this.connection.setRemoteDescription(JSON.parse(desc))
  }
  async iceCandidate(e){
    console.log('local connection ICE candidate: ', e.candidate);
    if(e.candidate) {
      //await this.connection.addIceCandidate(e.candidate);
    }

  }

  open(){
    console.log('channel opened!');
    this.connected = false;
  }

  close(){
    console.log('channel closed!');
    this.connected = false;
  }

  onMessage(event) {
  console.log(`Remote message received by local: ${event.data}`);
  this.localMessages += event.data + '\n';
}
}

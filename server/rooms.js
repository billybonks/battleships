const rooms = {}
class Rooms {

  findOrCreateRoom(id){
    let room = rooms[id];
    if(!room){
      room = {
        offer: null,
        answer: null,
        iceCandidates: [],
      }
    }
  }
}

module.exports = new Rooms();

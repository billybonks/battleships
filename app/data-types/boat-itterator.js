import { VERTICAL } from 'battleships/models/boat'

export default class BoatItterator {
  constructor(boat, startCoords){
    this.boat = boat;
    this.startCoords = startCoords;
  }

  [Symbol.iterator]() {
    this.currentCoords = this.startCoords;
    this.currentIndex = 0;
    return this;
  }

  next() {
    if (this.currentIndex < this.boat.length) {
      if(this.currentIndex == 0){
        this.currentIndex++
        return {done: false, value:this.currentCoords}
      } else if(this.boat.direction === VERTICAL) {
        this.currentCoords = {
          x: this.currentCoords.x+1,
          y: this.currentCoords.y
        }
      } else {
        this.currentCoords = {
          x: this.currentCoords.x,
          y: this.currentCoords.y+1
        }
      }
      this.currentIndex++
      return {done: false, value:this.currentCoords}
    } else {
      return {done: true}
    }
  }
}

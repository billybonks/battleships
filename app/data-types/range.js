export default class Range {
  constructor(from,to){
    this.to = to;
    this.from = from;
  }

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  }

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
}

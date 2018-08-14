export default class Event {
  constructor(triggerCoords, srcFn) {
    this.flipped = [triggerCoords];
    this._srcFn = srcFn;
    this.queue = [];
    this.nextQueue = [];
    this.active = true;
    setTimeout(this.endFrames, 10000);
  }

  addToQueue = (fn, coords) => {
    this.nextQueue.push(fn);
    this.flipped.push(coords);
  };

  includes = coords => {
    return this.flipped.includes(
      typeof coords == "object" ? coords.coords : coords
    );
  };

  startFrames = () => {
    setTimeout(this.onNextFrame, 17);
  };

  endFrames = () => {
    this.active = false;
  };

  onNextFrame = () => {
    this.queue = this.nextQueue;
    this.nextQueue = [];
    let fn = this.queue.shift();
    while (typeof fn == "function") {
      fn();
      fn = this.queue.shift();
    }
    this.active && this.startFrames();
  };
}

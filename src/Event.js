export default class Event {
  constructor(triggerCoords, srcFn) {
    this.flipped = [triggerCoords];
    this._srcFn = srcFn;
    this.queue = [];
    this.nextQueue = [];
    this.delayedFrameCallbacks = {};
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

  startFrames = n => {
    this.frame = n;
    setTimeout(() => this.onNextFrame(n), 17);
  };

  endFrames = () => {
    this.active = false;
  };

  delay = (frameDelay, fn) => {
    const targetFrame = this.frame + frameDelay;
    if (this.delayedFrameCallbacks.hasOwnProperty(targetFrame)) {
      this.delayedFrameCallbacks[targetFrame].push(fn);
    } else {
      this.delayedFrameCallbacks[targetFrame] = [fn];
    }
  };

  setCurrentHex = hex => {
    this.currentHex = hex;
  };

  onNextFrame = n => {
    // if no more fns in the queue or no delayed fns stop animation
    if (
      !this.nextQueue.length &&
      !Object.keys(this.delayedFrameCallbacks).length
    )
      return;

    // handle queue first
    this.queue = this.nextQueue;
    this.nextQueue = [];
    let fn = this.queue.shift();
    while (typeof fn == "function") {
      fn();
      fn = this.queue.shift();
    }

    // handle delayed frames next
    const delayedQueue = this.delayedFrameCallbacks[n];
    let delayedFn = delayedQueue && delayedQueue.shift();
    while (typeof delayedFn == "function") {
      delayedFn();
      delayedFn = delayedQueue.shift();
    }
    delete this.delayedFrameCallbacks[n];

    this.startFrames(n + 1);
  };
}

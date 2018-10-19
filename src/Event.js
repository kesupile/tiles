export default class Event {
  constructor(triggerCoords, srcFn) {
    this.flipped = { [triggerCoords]: true };
    this._srcFn = srcFn;
    this.queue = [];
    this.nextQueue = [];
    this.delayedFrameCallbacks = {};
    this.flipNowQueue = [];

    /** for debugging purposes */
    console.time("ANIMATION_TIME");
    global.Tiles._executionTimes = [];
  }

  addToQueue = (fn, coords) => {
    this.flipped[coords] = true;
    this.nextQueue.push(fn);
  };

  addToFlipNow = (fn, coords) => {
    this.flipNowQueue.push(fn);
    this.flipped[coords] = true;
  };

  includes = coords =>
    !!this.flipped[typeof coords === "object" ? coords.coords : coords];

  startFrames = n => {
    if (n === 1) this._startTime = new Date().getTime();
    this.frame = n;
    setTimeout(this.onNextFrame, 17, n);
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

  onNextFrame = n => {
    // if no more fns in the queue or no delayed fns stop animation
    if (
      !this.nextQueue.length &&
      !Object.keys(this.delayedFrameCallbacks).length
    ) {
      console.timeEnd("ANIMATION_TIME");
      return;
    }

    // handle ordinary queue first
    this.queue = this.nextQueue;
    this.nextQueue = [];
    let fn = this.queue.shift();
    while (typeof fn === "function") {
      fn();
      fn = this.queue.shift();
    }

    // handle delayed frames next
    const delayedQueue = this.delayedFrameCallbacks[n];
    let delayedFn = delayedQueue && delayedQueue.shift();
    while (typeof delayedFn === "function") {
      delayedFn();
      delayedFn = delayedQueue.shift();
    }
    delete this.delayedFrameCallbacks[n];

    this.flipNowQueue.forEach(flip => flip());
    this.flipNowQueue = [];

    this.startFrames(n + 1);
  };
}

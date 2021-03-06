export default class Event {
  constructor(triggerCoords, srcFn) {
    this.triggerCoords = triggerCoords;
    this.flipped = { [triggerCoords]: true };
    this._srcFn = srcFn;
    this.nextQueue = [];
    this.delayedFrameCallbacks = {};

    /** for debugging purposes */
    console.time("ANIMATION_TIME");
    global.Tiles._executionTimes = [];
  }

  _endFrames = () => {
    this.active = false;
  };

  _onNextFrame = n => {
    // if no more fns in the queue or no delayed fns stop animation
    if (
      !this.nextQueue.length &&
      !Object.keys(this.delayedFrameCallbacks).length
    ) {
      console.timeEnd("ANIMATION_TIME");
      return;
    }

    // handle ordinary queue first
    const queue = this.nextQueue;
    this.nextQueue = [];
    let fn = queue.shift();
    while (typeof fn === "function") {
      fn();
      fn = queue.shift();
    }

    // handle delayed frames next
    const delayedQueue = this.delayedFrameCallbacks[n];
    let delayedFn = delayedQueue && delayedQueue.shift();
    while (typeof delayedFn === "function") {
      delayedFn();
      delayedFn = delayedQueue.shift();
    }

    delete this.delayedFrameCallbacks[n];

    this.startFrames(n + 1);
  };

  addToQueue = (fn, coords) => {
    this.flipped[coords] = true;
    this.nextQueue.push(fn);
  };

  startFrames = n => {
    if (n === 1) this._startTime = new Date().getTime();
    this.frame = n;
    setTimeout(this._onNextFrame, 17, n);
  };

  includes = coords =>
    !!this.flipped[typeof coords === "object" ? coords.coords : coords];

  delay = (frameDelay, fn) => {
    /** @@NOTE: might we not want to add the element to the queue as soon as the delayed callback has been executed?? */
    const targetFrame = this.frame + frameDelay;
    if (this.delayedFrameCallbacks.hasOwnProperty(targetFrame)) {
      this.delayedFrameCallbacks[targetFrame].push(fn);
    } else {
      this.delayedFrameCallbacks[targetFrame] = [fn];
    }
  };
}

/**
 * @fileoverview Description of this file.
 */

/**
 * A web worker for parsing binary assets in a separate thread.
 * @type {*}
 */

/**
 * A singleton managing a collection of web workers.
 */
class WorkerPool {
  /**
   * Initializes a WorkerPool
   */
  constructor(numWorkers, filename) {
    let that = this;
    numWorkers = numWorkers || 2;

    // Create a pool of workers.
    this.workers = [];
    for (let i = 0; i < numWorkers; ++i) {
      let worker = new Worker(filename);
      worker.onmessage = (e) => {
        that.onmessage(e);
      };
      this.workers.push(worker);
    }

    this.nextworker = 0;
    this.callbacks = {};
    this.i = 0;
  }

  /**
   * Submit task to web worker.
   */
  submit(request, callback) {
    const i = this.i;
    this.callbacks[i] = callback;
    this.i += 1;

    const w = this.nextworker;
    const worker = this.workers[w];
    this.nextworker = (w + 1) % this.workers.length;

    worker.postMessage({i, request});
  }

  /**
   * Callback for this.worker.
   */
  onmessage(e) {
    const response = e.data;
    const i = response.i;
    const callback = this.callbacks[i];
    callback(response.result);
    delete this.callbacks[i];
  }
}
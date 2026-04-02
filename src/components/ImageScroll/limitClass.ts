class LimitClass {
  limit: number;
  queue: (() => void)[];
  running: number;

  constructor(limit: number) {
    this.limit = limit;
    this.running = 0;
    this.queue = [];
  }

  async run(img) {
    if(this.running >= this.limit) {
        await new Promise(resolve => this.queue.push(resolve));
    }
    this.running++;
    img.src = img.dataset.src;
    img.onload = () => {
        this.running--;
        if(this.queue.length) {
            const next = this.queue.shift();
            if(next) {
                next();
            }
        }
    }
  }
}

const imgLimit = new LimitClass(4);

export default imgLimit;
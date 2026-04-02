class ConcurrencyLimiter {
    constructor(limit) {
      this.limit = limit;          // 最大并发数
      this.running = 0;            // 当前执行中的任务数
      this.queue = [];             // 等待队列，存储待执行的任务包装
    }
  
    // 添加一个任务，任务是一个返回 Promise 的函数
    run(task) {
      return new Promise((resolve, reject) => {
        // 将任务及其 resolve/reject 存入队列
        this.queue.push({ task, resolve, reject });
        // 尝试执行下一个任务
        this._next();
      });
    }
  
    _next() {
      // 当正在运行的任务数小于限制，且队列非空时，取出任务执行
      while (this.running < this.limit && this.queue.length) {
        const { task, resolve, reject } = this.queue.shift();
        this.running++;
        Promise.resolve()
          .then(() => task())
          .then(resolve, reject)
          .finally(() => {
            this.running--;
            this._next(); // 任务完成，继续处理队列
          });
      }
    }
  
    // 获取当前并发数（可选）
    get currentConcurrency() {
      return this.running;
    }
  
    // 获取队列长度（可选）
    get queueLength() {
      return this.queue.length;
    }
  }

  // 创建一个全局限流器实例（单例）
const trackingLimiter = new ConcurrencyLimiter(4);

// 埋点发送函数（返回 Promise）
function sendTracking(data) {
  // 这里可以是 fetch 或任何异步操作
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Sent: ${data}, concurrent: ${trackingLimiter.currentConcurrency}`);
      resolve();
    }, data*1000); // 模拟网络延迟 1 秒
  });
}

// 包装后的埋点方法，自动受限于全局并发
function track(data) {
  return trackingLimiter.run(() => sendTracking(data));
}

// 模拟同时调用 70 次
track(1)
track(3)
track(5)
track(7)
track(9)
track(2)
track(4)
track(6)
track(8)
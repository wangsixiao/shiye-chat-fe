export class EventEmitter {
    events: Record<string, ((...args: any[]) => void)[]>
    constructor() {
        this.events = {}
    }

    on(eventName: string, callback: (...args: any[]) => void) {
        if(!this.events[eventName]) {
            this.events[eventName] = []
        }
        this.events[eventName].push(callback)
    }

    off(eventName: string, callback: (...args: any[]) => void) {
        if(!this.events[eventName]) return
        if(!callback) {
            this.events[eventName] = []
        }
        this.events[eventName] = this.events[eventName].filter(cb => cb !== callback)
    }

    once(eventName: string, callback: (...args: any[]) => void) {
        const fn = (...args: any[]) => {
            callback(...args)
            this.off(eventName, fn)
        }
        this.on(eventName, fn)
    }

    emit(eventName: string, ...args: any[]) {
        if(!this.events[eventName]) return
        this.events[eventName].forEach(callback => callback(...args))
    }
}
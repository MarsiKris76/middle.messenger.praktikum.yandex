export default class EventBus {
    private listeners: Map<string, Function[]>;

    constructor() {
        this.listeners = new Map<string, Function[]>();
    };

    on(event: string, callback: Function): void {
        let eventListeners = this.listeners.get(event);
        if (!eventListeners) {
            eventListeners = [];
            this.listeners.set(event, eventListeners);
        }
        eventListeners.push(callback);
    }

    off(event: string, callback: Function): void {
        let eventListeners = this.listeners.get(event);
        if (!eventListeners) {
            throw new Error(`Нет события: ${event}`);
        }
        eventListeners = eventListeners.filter(
            listener => listener !== callback
        );
    }

    emit(event: string, ...args: unknown[]): void {
        const eventListeners = this.listeners.get(event);
        if (!eventListeners) {
            throw new Error(`Нет события: ${event}`);
        }
        eventListeners.forEach(listener => {
            listener(...args);
        });
    }
}

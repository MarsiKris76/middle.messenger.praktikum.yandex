export default class EventBus {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    private listeners: Map<string, Function[]>;

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        this.listeners = new Map<string, Function[]>();
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    on(event: string, callback: Function): void {
        let eventListeners = this.listeners.get(event);
        if (!eventListeners) {
            eventListeners = [];
            this.listeners.set(event, eventListeners);
        }
        eventListeners.push(callback);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
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

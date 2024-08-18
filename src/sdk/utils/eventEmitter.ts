import { EventEmitter } from 'events';

class EventBus {
    private static instance: EventEmitter = new EventEmitter();

    public static getInstance(): EventEmitter {
        return EventBus.instance;
    }
}

export default EventBus.getInstance();

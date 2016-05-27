
/** A generic event queue object with queueChangeEvent() and fireExistingEvents() functions
 * @author TeamworkGuy2
 * @param <E> the event type
 * @param <L> the listener function signature
 */
class EventQueue<E, L extends (...args: any[]) => void> implements Events.EventQueue<E, L> {
    eventHandler: Events.ListenerList<E, L>;
    /** temporary callbacks to call when fireExistingEventsSuccess or fireExistingEventsFailure run */
    tempDoneCb: () => void;
    tempErrorCb: () => void;
    tempEventCount: number = 0;
    events: E[] = [];
    eventValidator: (event: E) => void;


    constructor(eventHandler: Events.ListenerList<E, L>, eventValidator?: (event: E) => void) {
        var that = this;

        function fireEventsSuccess(results) {
            that.tempEventCount--;
            if (that.tempEventCount === 0 && that.tempDoneCb != null) {
                that.tempDoneCb();
                that.tempDoneCb = null;
            }
        }

        function fireEventsFailure(error) {
            that.tempEventCount--;
            if (that.tempEventCount === 0 && that.tempErrorCb != null) {
                that.tempErrorCb();
                that.tempErrorCb = null;
            }
        }

        this.eventHandler = eventHandler;

        /** callback functions that are called when eventHandler finish fireEvent() */
        this.eventHandler.setFireEventsSuccessCallback(fireEventsSuccess);
        this.eventHandler.setFireEventsFailureCallback(fireEventsFailure);

        this.eventValidator = (typeof eventValidator === "function" ? eventValidator : null);

        this.getEventHandler = this.getEventHandler.bind(this);
        this.queueChangeEvent = this.queueChangeEvent.bind(this);
        this.fireExistingEvents = this.fireExistingEvents.bind(this);
    }


    public reset() {
        if (this.hasQueuedEvents()) {
            console.error("reseting event queue with events still in queue", this.events);
        }
        this.eventHandler.reset();
    }


    /** @return {EventListenerHandler} this event queue's event handler */
    public getEventHandler(): Events.ListenerList<E, L> {
        return this.eventHandler;
    }


    public hasQueuedEvents(): boolean {
        return this.events.length > 0;
    }


    /**
     * @see #queueChangeEvent
     * @see #fireExistingEvents
     */
    public queueAndFireChangeEvent(event: E, doneCb?: () => void) {
        this.queueChangeEvent(event);
        this.fireExistingEvents(doneCb);
    }


    /** Add an event to this change handler's queue of current events, the event is fired after any
     * currently pending events and before any future events are fired using this function.
     * However, none of these calls are made until {@code fireExistingEvents()} is called
     */
    public queueChangeEvent(event: E) {
        if (event == null) { throw new Error("cannot queue null event"); }
        if (this.eventValidator) {
            this.eventValidator(event);
        }
        this.events.push(event);
    }


    /** Fire all current events in this event queue and call {@code doneCb} when
     * all the event listeners have completed
     */
    public fireExistingEvents(doneCb?: () => void) {
        this.tempDoneCb = doneCb;
        this.tempEventCount = this.events.length;
        while (this.events.length > 0) {
            var event = this.events.shift();
            this.getEventHandler().fireEvent(event);
        }
    }

}

export = EventQueue;

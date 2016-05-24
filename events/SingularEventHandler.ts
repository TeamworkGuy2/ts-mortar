import EventListenerList = require("./EventListenerList");

/** An event handler that handles a single event, i.e. similar to jquery.ready(...).
 * Listeners that are added before the event occurs are called when the event occurs.
 * Listeners that are added after the event occurs are called immediately.
 * @author TeamworkGuy2
 * @param <E> the type of event that occurs
 */
class SingularEventHandler<E> {
    private eventHandler: EventListenerList<E, Events.Listener<E>>;
    private resolved = false;
    private resolvedEvent: E;


    constructor(eventHandler: EventListenerList<E, Events.Listener<E>>) {
        var that = this;
        this.eventHandler = eventHandler;
        // if the event is resolved, don't add the event listener, fire the event to the listener immediately
        this.eventHandler.setListenerAddedCallback(function (listener) {
            if (that.resolved) {
                listener(that.resolvedEvent);
                that.eventHandler.removeListener(listener);
            }
        });
    }


    public reset() {
        this.eventHandler.reset();
        this.resolved = false;
        this.resolvedEvent = null;
    }


    /** @return this event queue's event handler */
    public getEventHandler(): EventListenerList<E, Events.Listener<E>> {
        return this.eventHandler;
    }


    public fireEvent(event: E) {
        if (this.resolved) {
            var msg = "cannot resolve singular event handler more than once, already resolved event: ";
            console.error(msg, this.resolvedEvent);
            throw new Error(msg + this.resolvedEvent);
        }
        this.resolvedEvent = event;
        this.resolved = true;
        this.getEventHandler().fireEvent(event);
    }

}

export = SingularEventHandler;

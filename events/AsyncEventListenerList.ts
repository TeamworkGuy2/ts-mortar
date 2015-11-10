import Defer = require("../promises/Defer");
import EventListenerListImpl = require("./EventListenerListImpl");

/** An event listener list for asynchronous event listeners (i.e. the listeners perform asynchronous operations)
 * manages a list of listener functions and allows events to be sent to the listeners
 */
class AsyncEventListenerHandler<E> implements Events.ListenerList<E, Events.AsyncListener<E>> {
    private eventHandler: EventListenerListImpl<E, Events.AsyncListener<E>>;


    constructor() {
        this.eventHandler = new EventListenerListImpl<E, Events.AsyncListener<E>>();
    }

    reset() {
        this.eventHandler.reset();
    }

    // have to proxy all the methods because TypeScript 'extends ...' doesn't work with our gulp compilation process
    getListeners(): Events.AsyncListener<E>[] {
        return this.eventHandler.getListeners();
    }

    getFireEventsSuccessCallback(): (res: any[]) => void {
        return this.eventHandler.getFireEventsSuccessCallback();
    }

    setFireEventsSuccessCallback(cb: (res: any[]) => void) {
        this.eventHandler.setFireEventsSuccessCallback(cb);
    }

    getFireEventsFailureCallback(): (err) => void {
        return this.eventHandler.getFireEventsFailureCallback();
    }

    setFireEventsFailureCallback(cb: (err) => void) {
        this.eventHandler.setFireEventsFailureCallback(cb);
    }

    getListenerAddedCallback(): (listener: Events.AsyncListener<E>) => void {
        return this.eventHandler.getListenerAddedCallback();
    }

    setListenerAddedCallback(cb: (listener: Events.AsyncListener<E>) => void) {
        this.eventHandler.setListenerAddedCallback(cb);
    }

    getListenerRemovedCallback(): (listener: Events.AsyncListener<E>) => void {
        return this.eventHandler.getListenerRemovedCallback();
    }

    setListenerRemovedCallback(cb: (listener: Events.AsyncListener<E>) => void) {
        this.eventHandler.setListenerRemovedCallback(cb);
    }

    addListener(listener: Events.AsyncListener<E>) {
        this.eventHandler.addListener(listener);
    }

    addOneTimeListener(listener: Events.AsyncListener<E>) {
        this.eventHandler.addOneTimeListener(listener);
    }

    addNTimeListener(listener: Events.AsyncListener<E>, removeAfterNCalls?: number) {
        this.eventHandler.addNTimeListener(listener, removeAfterNCalls);
    }

    removeListener(listener: Events.AsyncListener<E>) {
        this.eventHandler.removeListener(listener);
    }

    removeListenerAt(index: number) {
        this.eventHandler.removeListenerAt(index);
    }


    /**
     * @param event: the event object being fired to listeners
     */
    public fireEvent(event: E, customListenerCaller?: (listener: Events.AsyncListener<E>, args: [E], index: number, total: number) => any, customListenerCallsDoneCb?: (event: E) => void) {
        var fireEventsSuccessCallback = this.getFireEventsSuccessCallback();
        var fireEventsFailureCallback = this.getFireEventsFailureCallback();
        var defs: Q.Promise<any>[] = [];

        this.eventHandler.fireEvent(event, function asyncListenerCaller(listener, event, index, size) {
            var def = Defer.newDefer();
            defs.push(def.promise);
            listener(def, event[0]);
        }, function asyncListenerAwaiter() {
            Defer.when(defs).done(function (results) {
                if (typeof fireEventsSuccessCallback === "function") {
                    fireEventsSuccessCallback(results);
                }
            }, function (err) {
                if (typeof fireEventsFailureCallback === "function") {
                    fireEventsFailureCallback(err);
                }
                else {
                    throw new Error(err);
                }
            });
        });

    }

}

export = AsyncEventListenerHandler;

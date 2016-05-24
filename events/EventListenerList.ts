import Arrays = require("../utils/Arrays");

/** A listener/event handler class - manages a list of listener functions and allows events to be sent to the listeners
 * @author TeamworkGuy2
 * @param <E> the event type
 * @param <L> the listener function signature
 */
class EventListenerListImpl<E, L extends (...args: any[]) => void> implements Events.ListenerList<E, L> {
    private listeners: L[];
    /** keeps track of the number of times that each listeners function can be called before it should be removed, -1 indicates infinite calls */
    private listenerCallsUntilRemoval: number[];
    private fireEventsSuccessCallback: (res: any[]) => void;
    private fireEventsFailureCallback: (err: any) => void;
    private listenerAddedCallback: (listener: L) => void;
    private listenerRemovedCallback: (listener: L) => void;


    constructor() {
        this.reset();
    }


    public reset() {
        this.listeners = [];
        this.listenerCallsUntilRemoval = [];
        this.fireEventsSuccessCallback = null;
        this.fireEventsFailureCallback = null;
        this.listenerAddedCallback = null;
        this.listenerRemovedCallback = null;
    }


    public getListeners(): L[] {
        return this.listeners;
    }


    public getFireEventsSuccessCallback(): (res: any[]) => void {
        return this.fireEventsSuccessCallback;
    }


    public setFireEventsSuccessCallback(cb: (res: any[]) => void) {
        EventListenerListImpl.checkCallback(cb, "fire events success");
        this.fireEventsSuccessCallback = cb;
    }


    public getFireEventsFailureCallback(): (err) => void {
        return this.fireEventsFailureCallback;
    }

   
    public setFireEventsFailureCallback(cb: (err) => void) {
        EventListenerListImpl.checkCallback(cb, "fire events failure");
        this.fireEventsFailureCallback = cb;
    }


    public getListenerAddedCallback(): (listener: L) => void {
        return this.listenerAddedCallback;
    }


    public setListenerAddedCallback(cb: (listener: L) => void) {
        EventListenerListImpl.checkCallback(cb, "fire events success");
        this.listenerAddedCallback = cb;
    }



    public getListenerRemovedCallback(): (listener: L) => void {
        return this.listenerRemovedCallback;
    }


    public setListenerRemovedCallback(cb: (listener: L) => void) {
        EventListenerListImpl.checkCallback(cb, "fire events success");
        this.listenerRemovedCallback = cb;
    }


    /** Add a listener function that is called whenever a new customer is added to the bid via the UI
     * @param {Function(customer, bidId)} listener: a listener function that is passed the new customer added to the bid
     */
    public addListener(listener: L) {
        this.addNTimeListener(listener);
    }


    public addOneTimeListener(listener: L) {
        this.addNTimeListener(listener, 1);
    }


    public addNTimeListener(listener: L, removeAfterNCalls: number = -1) {
        if (typeof listener !== "function") {
            throw new Error("cannot add listener " + listener);
        }
        if (!Number.isInteger(removeAfterNCalls)) {
            throw new Error("cannot add listener with non-integer number of calls before removal '" + removeAfterNCalls + "'");
        }
        this.listeners.push(listener);
        this.listenerCallsUntilRemoval.push(removeAfterNCalls);

        if (this.listenerAddedCallback) {
            this.listenerAddedCallback(listener);
        }
    }


    /** Remove a listener function from being called whenever a new customer is added to a bid via the UI
     * @param {Function} listener: a listener that was previously registered with this GenericEventListenerHandler via {code addListener(listener)}
     */
    public removeListener(listener: L) {
        if (typeof listener !== "function") {
            throw new Error("cannot remove listener " + listener);
        }
        var index = this.listeners.indexOf(listener);
        if (index > -1 && index < this.listeners.length) {
            this.removeListenerAt(index);
        }
    }


    public removeListenerAt(index: number) {
        var listener = this.listeners[index];
        Arrays.fastRemoveIndex(this.listeners, index);
        Arrays.fastRemoveIndex(this.listenerCallsUntilRemoval, index);

        if (this.listenerRemovedCallback) {
            this.listenerRemovedCallback(listener);
        }
    }


    /**
     * @param event: the event to pass to the event listener functions
     * @param customListenerCaller: a function call that takes a listener and event and should fire that event to the listener,
     * overrides this handler default behavior {@code listener.apply(thisArg, args);}
     * @param customListenerCallsDoneCb: if provided, a function to call when all the listeners have been called, in place of 'this.fireEventsSuccessCallback'
     */
    public fireEvent(event: E, customListenerCaller?: (listener: L, args: [E], index: number, total: number) => any, customListenerCallsDoneCb?: (event: E) => void) {
        var that = this;
        var errorOccurred = false;
        var useCustomCaller = (typeof customListenerCaller === "function");

        function callListenerProxy(listener: L, thisArg: any, args: [E], i: number, size: number) {
            var res = null;
            try {
                if (useCustomCaller) {
                    res = customListenerCaller(listener, args, i, size);
                }
                else {
                    res = listener.apply(thisArg, args);
                }
            } catch (err) {
                errorOccurred = true;
                if (typeof that.fireEventsFailureCallback === "function") {
                    that.fireEventsFailureCallback(err);
                }
                else {
                    throw new Error(err);
                }
            }
            return res;
        }

        var params: [E] = [event];
        var results = [];

        for (var listenerI = that.listeners.length - 1, listenerCount = that.listeners.length; listenerI > -1 && !errorOccurred; listenerI--) {
            var listener = that.listeners[listenerI];
            var remainingCallCount = that.listenerCallsUntilRemoval[listenerI];
            if (remainingCallCount > 0) {
                that.listenerCallsUntilRemoval[listenerI]--;
                remainingCallCount--;
            }

            var res = null;
            if (typeof listener === "function") {
                res = callListenerProxy(listener, undefined, params, listenerI, listenerCount);
            }
            results.push(res);

            if (remainingCallCount === 0) {
                that.removeListenerAt(listenerI);
            }
        }

        if (typeof customListenerCallsDoneCb === "function") {
            customListenerCallsDoneCb(event);
        }
        else {
            if (typeof that.fireEventsSuccessCallback === "function") {
                that.fireEventsSuccessCallback(results);
            }
        }
    }


    /** Check if a function argument is a non-null function */
    private static checkCallback(cb, msg: string) {
        if (typeof cb !== "function") {
            throw new Error(msg + " callback '" + cb + "' must be a function");
        }
    }


    public static newInst<E1, L1 extends (...args: any[]) => void>() {
        return new EventListenerListImpl<E1, L1>();
    }

}

export = EventListenerListImpl;


declare module Events {

    export interface Listener<E> {
        (event: E): void;
    }


    export interface AsyncListener<E> {
        (promise: Q.Deferred<any>, event: E): void;
    }


    /** A generic event queue object with queueChangeEvent() and fireExistingEvents() functions
     */
    interface EventQueue<E, L extends (...args: any[]) => void> {
        /** temporary callbacks to call when fireExistingEventsSuccess or fireExistingEventsFailure run */
        tempDoneCb: () => void;
        tempErrorCb: () => void;
        tempEventCount: number;
        events: E[];
        eventValidator: (event: E) => void;

        //new (eventHandler: EventListenerHandler<E, L>, eventValidator?: (event: E) => void): GenericEventQueue<E, L>;

        reset(): void;

        /** @return this event queue's event handler */
        getEventHandler(): ListenerList<E, L>;

        hasQueuedEvents(): boolean;

        /**
         * @see #queueChangeEvent
         * @see #fireExistingEvents
         */
        queueAndFireChangeEvent(event: E, doneCb?: () => void): void;

        /** Add an event to this change handler's queue of current events, the event is fired after any
         * currently pending events and before any future events are fired using this function.
         * However, none of these calls are made until {@code fireExistingEvents()} is called
         */
        queueChangeEvent(event: E): void;

        /** Fire all current events in this event queue and call {@code doneCb} when
         * all the event listeners have completed
         */
        fireExistingEvents(doneCb?: () => void): void;
    }


    /** A listener/event handler class - manages a list of listener functions and allows events to be sent to the listeners
     */
    interface ListenerList<E, L extends (...args: any[]) => void> {

        reset();

        getListeners(): L[];

        getFireEventsSuccessCallback(): (res: any[]) => void;

        setFireEventsSuccessCallback(cb: (res: any[]) => void);

        getFireEventsFailureCallback(): (err) => void;

        setFireEventsFailureCallback(cb: (err) => void);

        getListenerAddedCallback(): (listener: L) => void;

        setListenerAddedCallback(cb: (listener: L) => void);

        getListenerRemovedCallback(): (listener: L) => void;

        setListenerRemovedCallback(cb: (listener: L) => void);

        /** Add a listener function that is called whenever a new customer is added to the bid via the UI
         * @param {Function(customer, bidId)} listener: a listener function that is passed the new customer added to the bid
         */
        addListener(listener: L);

        addOneTimeListener(listener: L);

        addNTimeListener(listener: L, removeAfterNCalls?: number);

        /** Remove a listener function from being called whenever a new customer is added to a bid via the UI
         * @param {Function} listener: a listener that was previously registered with this GenericEventListenerHandler via {code addListener(listener)}
         */
        removeListener(listener: L);

        removeListenerAt(index: number);

        /**
         * @param {E} event: the event to pass to the event listener functions
         * @param {Function} customListenerCaller: a function call that takes a listener and event and should fire that event to the listener,
         * overrides this handler default behavior {@code listener.apply(thisArg, args);}
         * @param {Function} customListenerCallsDoneCb: a function to call when all the listeners have been called
         */
        fireEvent(event: E, customListenerCaller?: (listener: L, args: [E], index: number, total: number) => any, customListenerCallsDoneCb?: (event: E) => void);

    }

}

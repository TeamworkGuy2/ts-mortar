"use strict";
var Arrays = require("../utils/Arrays");
/** A listener/event handler class - manages a list of listener functions and allows events to be sent to the listeners
 * @author TeamworkGuy2
 * @param <E> the event type
 * @param <L> the listener function signature
 */
var EventListenerListImpl = (function () {
    function EventListenerListImpl() {
        this.reset();
    }
    EventListenerListImpl.prototype.reset = function () {
        this.listeners = [];
        this.listenerCallsUntilRemoval = [];
        this.fireEventsSuccessCallback = null;
        this.fireEventsFailureCallback = null;
        this.listenerAddedCallback = null;
        this.listenerRemovedCallback = null;
    };
    EventListenerListImpl.prototype.getListeners = function () {
        return this.listeners;
    };
    EventListenerListImpl.prototype.getFireEventsSuccessCallback = function () {
        return this.fireEventsSuccessCallback;
    };
    EventListenerListImpl.prototype.setFireEventsSuccessCallback = function (cb) {
        EventListenerListImpl.checkCallback(cb, "fire events success");
        this.fireEventsSuccessCallback = cb;
    };
    EventListenerListImpl.prototype.getFireEventsFailureCallback = function () {
        return this.fireEventsFailureCallback;
    };
    EventListenerListImpl.prototype.setFireEventsFailureCallback = function (cb) {
        EventListenerListImpl.checkCallback(cb, "fire events failure");
        this.fireEventsFailureCallback = cb;
    };
    EventListenerListImpl.prototype.getListenerAddedCallback = function () {
        return this.listenerAddedCallback;
    };
    EventListenerListImpl.prototype.setListenerAddedCallback = function (cb) {
        EventListenerListImpl.checkCallback(cb, "fire events success");
        this.listenerAddedCallback = cb;
    };
    EventListenerListImpl.prototype.getListenerRemovedCallback = function () {
        return this.listenerRemovedCallback;
    };
    EventListenerListImpl.prototype.setListenerRemovedCallback = function (cb) {
        EventListenerListImpl.checkCallback(cb, "fire events success");
        this.listenerRemovedCallback = cb;
    };
    /** Add a listener function that is called whenever a new customer is added to the bid via the UI
     * @param {Function(customer, bidId)} listener: a listener function that is passed the new customer added to the bid
     */
    EventListenerListImpl.prototype.addListener = function (listener) {
        this.addNTimeListener(listener);
    };
    EventListenerListImpl.prototype.addOneTimeListener = function (listener) {
        this.addNTimeListener(listener, 1);
    };
    EventListenerListImpl.prototype.addNTimeListener = function (listener, removeAfterNCalls) {
        if (removeAfterNCalls === void 0) { removeAfterNCalls = -1; }
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
    };
    /** Remove a listener function from being called whenever a new customer is added to a bid via the UI
     * @param {Function} listener: a listener that was previously registered with this GenericEventListenerHandler via {code addListener(listener)}
     */
    EventListenerListImpl.prototype.removeListener = function (listener) {
        if (typeof listener !== "function") {
            throw new Error("cannot remove listener " + listener);
        }
        var index = this.listeners.indexOf(listener);
        if (index > -1 && index < this.listeners.length) {
            this.removeListenerAt(index);
        }
    };
    EventListenerListImpl.prototype.removeListenerAt = function (index) {
        var listener = this.listeners[index];
        Arrays.fastRemoveIndex(this.listeners, index);
        Arrays.fastRemoveIndex(this.listenerCallsUntilRemoval, index);
        if (this.listenerRemovedCallback) {
            this.listenerRemovedCallback(listener);
        }
    };
    /**
     * @param event: the event to pass to the event listener functions
     * @param customListenerCaller: a function call that takes a listener and event and should fire that event to the listener,
     * overrides this handler default behavior {@code listener.apply(thisArg, args);}
     * @param customListenerCallsDoneCb: if provided, a function to call when all the listeners have been called, in place of 'this.fireEventsSuccessCallback'
     */
    EventListenerListImpl.prototype.fireEvent = function (event, customListenerCaller, customListenerCallsDoneCb) {
        var that = this;
        var errorOccurred = false;
        var useCustomCaller = (typeof customListenerCaller === "function");
        function callListenerProxy(listener, thisArg, args, i, size) {
            var res = null;
            try {
                if (useCustomCaller) {
                    res = customListenerCaller(listener, args, i, size);
                }
                else {
                    res = listener.apply(thisArg, args);
                }
            }
            catch (err) {
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
        var params = [event];
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
    };
    /** Check if a function argument is a non-null function */
    EventListenerListImpl.checkCallback = function (cb, msg) {
        if (typeof cb !== "function") {
            throw new Error(msg + " callback '" + cb + "' must be a function");
        }
    };
    EventListenerListImpl.newInst = function () {
        return new EventListenerListImpl();
    };
    return EventListenerListImpl;
}());
module.exports = EventListenerListImpl;

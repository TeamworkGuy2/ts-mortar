var Arrays = require("../utils/Arrays");
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
    EventListenerListImpl.checkCallback = function (cb, msg) {
        if (typeof cb !== "function") {
            throw new Error(msg + " callback '" + cb + "' must be a function");
        }
    };
    EventListenerListImpl.newInst = function () {
        return new EventListenerListImpl();
    };
    return EventListenerListImpl;
})();
module.exports = EventListenerListImpl;

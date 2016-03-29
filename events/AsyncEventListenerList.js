"use strict";
var Defer = require("../promises/Defer");
var EventListenerListImpl = require("./EventListenerListImpl");
/** An event listener list for asynchronous event listeners (i.e. the listeners perform asynchronous operations)
 * manages a list of listener functions and allows events to be sent to the listeners
 */
var AsyncEventListenerHandler = (function () {
    function AsyncEventListenerHandler() {
        this.eventHandler = new EventListenerListImpl();
    }
    AsyncEventListenerHandler.prototype.reset = function () {
        this.eventHandler.reset();
    };
    // have to proxy all the methods because TypeScript 'extends ...' doesn't work with our gulp compilation process
    AsyncEventListenerHandler.prototype.getListeners = function () {
        return this.eventHandler.getListeners();
    };
    AsyncEventListenerHandler.prototype.getFireEventsSuccessCallback = function () {
        return this.eventHandler.getFireEventsSuccessCallback();
    };
    AsyncEventListenerHandler.prototype.setFireEventsSuccessCallback = function (cb) {
        this.eventHandler.setFireEventsSuccessCallback(cb);
    };
    AsyncEventListenerHandler.prototype.getFireEventsFailureCallback = function () {
        return this.eventHandler.getFireEventsFailureCallback();
    };
    AsyncEventListenerHandler.prototype.setFireEventsFailureCallback = function (cb) {
        this.eventHandler.setFireEventsFailureCallback(cb);
    };
    AsyncEventListenerHandler.prototype.getListenerAddedCallback = function () {
        return this.eventHandler.getListenerAddedCallback();
    };
    AsyncEventListenerHandler.prototype.setListenerAddedCallback = function (cb) {
        this.eventHandler.setListenerAddedCallback(cb);
    };
    AsyncEventListenerHandler.prototype.getListenerRemovedCallback = function () {
        return this.eventHandler.getListenerRemovedCallback();
    };
    AsyncEventListenerHandler.prototype.setListenerRemovedCallback = function (cb) {
        this.eventHandler.setListenerRemovedCallback(cb);
    };
    AsyncEventListenerHandler.prototype.addListener = function (listener) {
        this.eventHandler.addListener(listener);
    };
    AsyncEventListenerHandler.prototype.addOneTimeListener = function (listener) {
        this.eventHandler.addOneTimeListener(listener);
    };
    AsyncEventListenerHandler.prototype.addNTimeListener = function (listener, removeAfterNCalls) {
        this.eventHandler.addNTimeListener(listener, removeAfterNCalls);
    };
    AsyncEventListenerHandler.prototype.removeListener = function (listener) {
        this.eventHandler.removeListener(listener);
    };
    AsyncEventListenerHandler.prototype.removeListenerAt = function (index) {
        this.eventHandler.removeListenerAt(index);
    };
    /**
     * @param event: the event object being fired to listeners
     */
    AsyncEventListenerHandler.prototype.fireEvent = function (event, customListenerCaller, customListenerCallsDoneCb) {
        var fireEventsSuccessCallback = this.getFireEventsSuccessCallback();
        var fireEventsFailureCallback = this.getFireEventsFailureCallback();
        var defs = [];
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
    };
    return AsyncEventListenerHandler;
}());
module.exports = AsyncEventListenerHandler;

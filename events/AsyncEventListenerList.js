"use strict";
var Q = require("q");
var EventListenerList = require("./EventListenerList");
/** An event listener list for asynchronous event listeners (i.e. the listeners perform asynchronous operations)
 * manages a list of listener functions and allows events to be sent to the listeners
 */
var AsyncEventListenerList = (function () {
    function AsyncEventListenerList() {
        this.eventHandler = new EventListenerList();
    }
    AsyncEventListenerList.prototype.reset = function () {
        this.eventHandler.reset();
    };
    // have to proxy all the methods because TypeScript 'extends ...' doesn't work with our gulp compilation process
    AsyncEventListenerList.prototype.getListeners = function () {
        return this.eventHandler.getListeners();
    };
    AsyncEventListenerList.prototype.getFireEventsSuccessCallback = function () {
        return this.eventHandler.getFireEventsSuccessCallback();
    };
    AsyncEventListenerList.prototype.setFireEventsSuccessCallback = function (cb) {
        this.eventHandler.setFireEventsSuccessCallback(cb);
    };
    AsyncEventListenerList.prototype.getFireEventsFailureCallback = function () {
        return this.eventHandler.getFireEventsFailureCallback();
    };
    AsyncEventListenerList.prototype.setFireEventsFailureCallback = function (cb) {
        this.eventHandler.setFireEventsFailureCallback(cb);
    };
    AsyncEventListenerList.prototype.getListenerAddedCallback = function () {
        return this.eventHandler.getListenerAddedCallback();
    };
    AsyncEventListenerList.prototype.setListenerAddedCallback = function (cb) {
        this.eventHandler.setListenerAddedCallback(cb);
    };
    AsyncEventListenerList.prototype.getListenerRemovedCallback = function () {
        return this.eventHandler.getListenerRemovedCallback();
    };
    AsyncEventListenerList.prototype.setListenerRemovedCallback = function (cb) {
        this.eventHandler.setListenerRemovedCallback(cb);
    };
    AsyncEventListenerList.prototype.addListener = function (listener) {
        this.eventHandler.addListener(listener);
    };
    AsyncEventListenerList.prototype.addOneTimeListener = function (listener) {
        this.eventHandler.addOneTimeListener(listener);
    };
    AsyncEventListenerList.prototype.addNTimeListener = function (listener, removeAfterNCalls) {
        this.eventHandler.addNTimeListener(listener, removeAfterNCalls);
    };
    AsyncEventListenerList.prototype.removeListener = function (listener) {
        this.eventHandler.removeListener(listener);
    };
    AsyncEventListenerList.prototype.removeListenerAt = function (index) {
        this.eventHandler.removeListenerAt(index);
    };
    /**
     * @param event: the event object being fired to listeners
     */
    AsyncEventListenerList.prototype.fireEvent = function (event, customListenerCaller, customListenerCallsDoneCb) {
        var fireEventsSuccessCallback = this.getFireEventsSuccessCallback();
        var fireEventsFailureCallback = this.getFireEventsFailureCallback();
        var dfds = [];
        this.eventHandler.fireEvent(event, function asyncListenerCaller(listener, event, index, size) {
            var dfd = Q.defer();
            dfds.push(dfd.promise);
            listener(dfd, event[0]);
        }, function asyncListenerAwaiter() {
            Q.all(dfds).done(function (results) {
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
    return AsyncEventListenerList;
}());
module.exports = AsyncEventListenerList;

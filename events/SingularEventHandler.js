"use strict";
/** An event handler that handles a single event, i.e. similar to jquery.ready(...).
 * Listeners that are added before the event occurs are called when the event occurs.
 * Listeners that are added after the event occurs are called immediately.
 * @author TeamworkGuy2
 * @param <E> the type of event that occurs
 */
var SingularEventHandler = (function () {
    function SingularEventHandler(eventHandler) {
        this.resolved = false;
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
    SingularEventHandler.prototype.reset = function () {
        this.eventHandler.reset();
        this.resolved = false;
        this.resolvedEvent = null;
    };
    /** @return this event queue's event handler */
    SingularEventHandler.prototype.getEventHandler = function () {
        return this.eventHandler;
    };
    SingularEventHandler.prototype.fireEvent = function (event) {
        if (this.resolved) {
            var msg = "cannot resolve singular event handler more than once, already resolved event: ";
            console.error(msg, this.resolvedEvent);
            throw new Error(msg + this.resolvedEvent);
        }
        this.resolvedEvent = event;
        this.resolved = true;
        this.getEventHandler().fireEvent(event);
    };
    return SingularEventHandler;
}());
module.exports = SingularEventHandler;

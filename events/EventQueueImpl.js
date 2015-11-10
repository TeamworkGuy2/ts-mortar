var EventQueueImpl = (function () {
    function EventQueueImpl(eventHandler, eventValidator) {
        this.tempEventCount = 0;
        this.events = [];
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
        this.eventHandler.setFireEventsSuccessCallback(fireEventsSuccess);
        this.eventHandler.setFireEventsFailureCallback(fireEventsFailure);
        this.eventValidator = (typeof eventValidator === "function" ? eventValidator : null);
        this.getEventHandler = this.getEventHandler.bind(this);
        this.queueChangeEvent = this.queueChangeEvent.bind(this);
        this.fireExistingEvents = this.fireExistingEvents.bind(this);
    }
    EventQueueImpl.prototype.reset = function () {
        if (this.hasQueuedEvents()) {
            console.error("reseting event queue with events still in queue", this.events);
        }
        this.eventHandler.reset();
    };
    EventQueueImpl.prototype.getEventHandler = function () {
        return this.eventHandler;
    };
    EventQueueImpl.prototype.hasQueuedEvents = function () {
        return this.events.length > 0;
    };
    EventQueueImpl.prototype.queueAndFireChangeEvent = function (event, doneCb) {
        this.queueChangeEvent(event);
        this.fireExistingEvents(doneCb);
    };
    EventQueueImpl.prototype.queueChangeEvent = function (event) {
        if (event == null) {
            throw new Error("cannot queue null event");
        }
        if (this.eventValidator) {
            this.eventValidator(event);
        }
        this.events.push(event);
    };
    EventQueueImpl.prototype.fireExistingEvents = function (doneCb) {
        this.tempDoneCb = doneCb;
        this.tempEventCount = this.events.length;
        while (this.events.length > 0) {
            var event = this.events.shift();
            this.getEventHandler().fireEvent(event);
        }
    };
    return EventQueueImpl;
})();
module.exports = EventQueueImpl;

var SingularEventHandler = (function () {
    function SingularEventHandler(eventHandler) {
        this.resolved = false;
        var that = this;
        this.eventHandler = eventHandler;
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
})();
module.exports = SingularEventHandler;

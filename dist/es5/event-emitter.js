"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
/**
 * Global EventEmitter
 */
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        /** Map event name to Subject  */
        this._subjects = new Map();
    }
    /**
     *
     * @param {keyof Events} eventName
     * @param {(data: any) => any} handler
     * @returns {{unsubscribe: () => void}}
     */
    EventEmitter.prototype.on = function (eventName, handler) {
        var _this = this;
        if (!this._subjects.has(eventName)) {
            this._subjects.set(eventName, new Subject_1.Subject());
        }
        var _subject = this._subjects.get(eventName);
        var subscription = _subject.subscribe(handler);
        return {
            unsubscribe: function () {
                subscription.unsubscribe();
                !_subject.observers.length && _this._subjects.delete(eventName);
            }
        };
    };
    ;
    /**
     *
     * @param {keyof Events} eventName
     * @param data
     */
    EventEmitter.prototype.emit = function (eventName, data) {
        if (this._subjects.has(eventName)) {
            this._subjects.get(eventName).next(data);
        }
    };
    ;
    /**
     * Destory all subscription and clear the map
     */
    EventEmitter.prototype.destroy = function () {
        this._subjects.forEach(function (subject, _) {
            subject.unsubscribe();
        });
        this._subjects.clear();
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=event-emitter.js.map
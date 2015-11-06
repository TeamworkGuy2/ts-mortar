var DateTimes;
(function (DateTimes) {
    DateTimes.MS_PER_DAY = 1000 * 60 * 60 * 24;
    var DotNetJsonDate = (function () {
        function DotNetJsonDate() {
        }
        DotNetJsonDate.parseDotNetJson = function (value) {
            if (!value) {
                return new Date();
            }
            var time = Timestamp.parseDotNetJson(value);
            return new Date(time);
        };
        DotNetJsonDate.toDotNetJsonTimestamp = function (date, includeOffset) {
            if (includeOffset === void 0) { includeOffset = true; }
            if (date == null) {
                date = new Date();
            }
            var tz = "";
            if (includeOffset) {
                var offset = date.getTimezoneOffset();
                if (offset < 0) {
                    offset = -offset;
                    tz = '+';
                }
                else {
                    tz = '-';
                }
                tz += (offset / 60 < 10 ? '0' : '') + offset / 60;
                tz += (offset % 60 < 10 ? '0' : '') + offset % 60;
            }
            var dateStr = '/Date(' + date.getTime() + tz + ')/';
            return dateStr;
        };
        return DotNetJsonDate;
    })();
    DateTimes.DotNetJsonDate = DotNetJsonDate;
    var Dates = (function () {
        function Dates() {
        }
        Dates.getDayMinutes = function (date) {
            var dt = new Date(date.getTime());
            return dt.getHours() * 60 + dt.getMinutes();
        };
        Dates.toDisplayDate = function (date, separator) {
            if (separator === void 0) { separator = "/"; }
            var dt = new Date(date.getTime());
            var d = dt.getDate();
            var mon = dt.getMonth() + 1;
            var y = dt.getFullYear();
            return (mon <= 9 ? '0' + mon : '' + mon) + separator + (d <= 9 ? '0' + d : '' + d) + separator + y;
        };
        Dates.toDisplayDateTime = function (date, includingMidnight) {
            var dt = new Date(date.getTime());
            var hrs = dt.getHours();
            var mins = dt.getMinutes();
            if (!includingMidnight && hrs === 0 && mins === 0) {
                return Dates.toDisplayDate(date);
            }
            var ampm = hrs < 12 ? 'a.m.' : 'p.m.';
            hrs = hrs % 12;
            if (hrs === 0) {
                hrs = 12;
            }
            return Dates.toDisplayDate(date) +
                ' ' + (hrs <= 9 ? '0' + hrs : '' + hrs) +
                ':' + (mins <= 9 ? '0' + mins : '' + mins) + ' ' + ampm;
        };
        Dates.dayDiff = function (dtLeft, dtRight, incrementAtMidnight) {
            if (incrementAtMidnight === void 0) { incrementAtMidnight = false; }
            var daysDiff = ((dtLeft.getTime() - dtRight.getTime()) / DateTimes.MS_PER_DAY);
            var dateDiff = (incrementAtMidnight ? Math.floor(daysDiff) : Math.round(daysDiff));
            return dateDiff;
        };
        return Dates;
    })();
    DateTimes.Dates = Dates;
    var Timestamp = (function () {
        function Timestamp() {
        }
        Object.defineProperty(Timestamp, "currentTimezoneOffsetMillis", {
            get: function () {
                return Timestamp._timezoneOffsetMillis || (Timestamp._timezoneOffsetMillis = new Date().getTimezoneOffset() * 60 * 1000);
            },
            enumerable: true,
            configurable: true
        });
        Timestamp.now = function () {
            var now = new Date();
            var offset = now.getTimezoneOffset() * 60 * 1000;
            return (now.getTime() + offset);
        };
        Timestamp.toDate = function (timestamp, isUtc) {
            if (isUtc === void 0) { isUtc = true; }
            return new Date(timestamp - (isUtc ? Timestamp.currentTimezoneOffsetMillis : 0));
        };
        Timestamp.parseDotNetJson = function (dateString, ignoreTimezoneAssumeUtc) {
            if (ignoreTimezoneAssumeUtc === void 0) { ignoreTimezoneAssumeUtc = true; }
            if (!dateString) {
                return Date.now();
            }
            if (Number.isInteger(dateString)) {
                return dateString;
            }
            var dateObj = dateString.match(/(\d+)|([+-])|(\d{4})/g);
            var timeZoneOffsetMs = 0;
            if (dateObj.length > 2) {
                if (ignoreTimezoneAssumeUtc) {
                    timeZoneOffsetMs = -Timestamp.currentTimezoneOffsetMillis;
                }
                else {
                    var offsetVal = parseInt(dateObj[2]);
                    var sign = dateObj[1];
                    if ((sign !== '+' && sign !== '-') || isNaN(offsetVal)) {
                        throw new Error("unrecognized date string '" + dateString + "'");
                    }
                    var timeZoneOffsetHrMin = (sign === '+' ? -1 : 1) * offsetVal;
                    timeZoneOffsetMs = (Math.round(timeZoneOffsetHrMin / 100) * 60 + timeZoneOffsetHrMin % 100) * 60 * 1000;
                }
            }
            var time = parseInt(dateObj[0], 10) + timeZoneOffsetMs;
            return time;
        };
        Timestamp.toDotNetJson = function (timestamp, isUtc, includeOffset) {
            if (isUtc === void 0) { isUtc = true; }
            if (includeOffset === void 0) { includeOffset = true; }
            return DotNetJsonDate.toDotNetJsonTimestamp(Timestamp.toDate(timestamp, isUtc), includeOffset);
        };
        Timestamp.toUtcDotNetJson = function (timestamp) {
            return DotNetJsonDate.toDotNetJsonTimestamp(new Date(timestamp + Timestamp.currentTimezoneOffsetMillis));
        };
        Timestamp.getDayMinutes = function (timestamp) {
            return Dates.getDayMinutes(new Date(timestamp));
        };
        Timestamp.toDisplayDate = function (timestamp) {
            return Dates.toDisplayDate(new Date(timestamp));
        };
        Timestamp.toDisplayDateTime = function (timestamp, includingMidnight) {
            return Dates.toDisplayDateTime(new Date(timestamp), includingMidnight);
        };
        return Timestamp;
    })();
    DateTimes.Timestamp = Timestamp;
})(DateTimes || (DateTimes = {}));
module.exports = DateTimes;

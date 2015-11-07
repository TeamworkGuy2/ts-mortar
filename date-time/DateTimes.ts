
/** DateTimes - contains static sub-modules for date and time operations, including:
 * - Date: working with JS 'Date' objects and
 * - Timestamp: working with integer millisecond epoch offsets
 */
module DateTimes {

    export var MS_PER_DAY = 1000 * 60 * 60 * 24;




    /** .NET web service JSON representation of the C# 'DateTime' data type
     */
    export module DotNetJsonDate {

        /** Parses a date string in the format returned by .NET web service
         * it returns date in its time zone, so we have to convert it to UTC and then to JS time zone
         * @param value: the .NET web service date string to convert to a {@link Date} object.
         * Can be null, in which case the current date/time is returned.
         * @return a new date object created from the {@code value}
         */
        export function parseDotNetJson(value: string): Date {
            if (!value) {
                return new Date();
            }

            var time = Timestamp.parseDotNetJson(value);
            // Use the UTC epoch timestamp to create a local date
            return new Date(time);
        }


        /** Convert a date to a string in the format supported by a .NET web service
         * @param date: the date to convert.  Or null to use the current date/time.
         * @return a .NET web service date-time string representation
         */
        export function toDotNetJson(date?: Date, includeOffset: boolean = true): string {
            if (date == null) {
                date = new Date();
            }

            var tz = "";
            if (includeOffset) {
                var offset = date.getTimezoneOffset();
                if (offset < 0) {
                    offset = -offset;
                    tz = '+';
                } else {
                    tz = '-';
                }
                tz += (offset / 60 < 10 ? '0' : '') + offset / 60;
                tz += (offset % 60 < 10 ? '0' : '') + offset % 60;
            }

            var dateStr = '/Date(' + date.getTime() + tz + ')/';
            return dateStr;
        }


    }




    /** Javascript 'Date' type conversion/manipulation
     */
    export module Dates {

        /** Get minutes of the day (0 - 1439) from a date. The date is in the current timezone.
         * @param date: the date to get the minute of the day from
         * @return the number of minutes that have elapsed since the last midnight of the timestamp
         */
        export function getDayMinutes(date: Date): number {
            var dt = new Date(date.getTime());
            return dt.getHours() * 60 + dt.getMinutes();
        }


        /** Convert a date to a date string. The display date is in the current timezone.
         * @param date: the date to convert to a display date string
         * @param [separator='/']: optional separator such as '/' or '-' to separate the 'mm', 'dd', and 'yyyy' portions of the returned date string
         * @return the date represented by the timestamp in the format 'mm/dd/yyyy'
         */
        export function toDisplayDate(date: Date, separator: string = "/"): string {
            var dt = new Date(date.getTime());
            var d = dt.getDate();
            var mon = dt.getMonth() + 1;
            var y = dt.getFullYear();
            return (mon <= 9 ? '0' + mon : '' + mon) + separator + (d <= 9 ? '0' + d : '' + d) + separator + y;
        }


        /** Convert a date to a date-time string. The display date is in the current timezone.
         * @param date: the date to convert to a date-time string
         * @param [includingMidnight=false]: if true AND date is midnight, returns only the 'mm/dd/yyyy' portion of the date representation
         * @return the date-time representated by the timestamp in the format 'mm/dd/yyyy hh:mm am/pm'
         */
        export function toDisplayDateTime(date: Date, includingMidnight?: boolean): string {
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
        }


        /** Calculates the number of days between {@code dtLeft - dtRight}
         * @param [incrementAtMidnight=false]: if true, assumes dtRight's time is midnight and counts from dtRight's date
         * (i.e.if {@code incrementAtMidnight == true } then 2001-3-15 2:43 is the same day as 2001-3-15 19:39, even though the dates are more than 12 hours apart)
         */
        export function dayDiff(dtLeft: Date, dtRight: Date, incrementAtMidnight: boolean = false): number {
            var daysDiff = ((dtLeft.getTime() - dtRight.getTime()) / DateTimes.MS_PER_DAY);
            var dateDiff = (incrementAtMidnight ? Math.floor(daysDiff) : Math.round(daysDiff)); // TODO this does not handle leap years or non-gregorian calendar days
            return dateDiff;
        }

    }




    export class Timestamp {
        private static _timezoneOffsetMillis: number;

        /**
         * @return the current local timezone offset in milliseconds
         */
        static get currentTimezoneOffsetMillis() {
            return Timestamp._timezoneOffsetMillis || (Timestamp._timezoneOffsetMillis = new Date().getTimezoneOffset() * 60 * 1000);
        }

    }


    /** Unix epoch timestamp conversion/manipulation
     */
    export module Timestamp {


        /**
         * @return the current UTC time as Unix millisecond timestamp
         */
        export function now(): number {
            var now = new Date();
            var offset = now.getTimezoneOffset() * 60 * 1000; // x 1 minute as milliseconds
            return (now.getTime() + offset); // TODO workaround for .NET web services returning local timestamps
        }


        /**
         * @param timestamp: convert a timestamp to a {@link Date}
         * @param isUtc: true to assume the timestamp is UTC, false to assume
         * it is a local timezone timestamp and apply the correct offset to it
         * @return the date created from the timestamp
         */
        export function toDate(timestamp: number, isUtc: boolean = true): Date {
            // if UTC, apply a reverse timezone offset since {@code new Date()} automatically assumes the timestamp is local
            return new Date(timestamp - (isUtc ? Timestamp.currentTimezoneOffsetMillis : 0));
        }


        /** Parse a JSON string representing a .NET DateTime value
         * @param dateString: a .NET date string in the format {@code "/Date(1415354400000-0500)/"},
         * or a numeric timestamp which is returned as-is
         * @param [ignoreTimezoneAssumeUtc=true]: true to ignore embeded timezone offset in the date string and
         * treat the date as a UTC timestamp and apply the current timezone offset, false to parse any
         * embeded timezone from the date string or apply no timezone offset if there is none
         * @return the epoch millisecond timestamp value of the input {@code dateString}
         */
        export function parseDotNetJson(dateString: string | number, ignoreTimezoneAssumeUtc: boolean = true/*TODO workaround for .NET web services returning local timestamps*/): number {
            if (!dateString) {
                return Date.now();
            }
            if (Number.isInteger(<any>dateString)) {
                return (<number><any>dateString);
            }

            // Split the date string into parts. e.g. "/Date(1415354400000-0500)/" gets parsed into "1415354400000", "-", and "0500"
            var dateObj = (<string>dateString).match(/(\d+)|([+-])|(\d{4})/g);
            var timeZoneOffsetMs = 0;
            if (dateObj.length > 2) {
                if (ignoreTimezoneAssumeUtc) {
                    timeZoneOffsetMs = -Timestamp.currentTimezoneOffsetMillis;
                }
                else {
                    // parse the '+/- ####' timezone offset at the end of the date string as a 'hhmm' timezone offset
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
        }


        /** Convert a timestamp to a string to pass to a .NET web service
         * @param timestamp: the timestamp to convert
         * @param [isUtc=true]: true to assume the timestamp is UTC, false to assume
         * the timestamp is local timezone and to apply the correct offset to it
         * @param [includeOffset=true]: flag indicating whether offset portion of the timestamp should be included (normally false for UTC dates)
         * @return the string representation of the date to pass to service calls
         */
        export function toDotNetJson(timestamp: number, isUtc: boolean = true, includeOffset: boolean = true): string {
            return DotNetJsonDate.toDotNetJson(Timestamp.toDate(timestamp, isUtc), includeOffset);
        }


        /** Convert a UTC timestamp to an un-offset .NET web service timestamp by applying the reverse of the
         * current local timezone offset to the timestamp so when the server converts it to UTC it converts back to the input date
         */
        export function toUtcDotNetJson(timestamp: number): string {
            return DotNetJsonDate.toDotNetJson(new Date(timestamp + Timestamp.currentTimezoneOffsetMillis));
        }


        /** Get the minute of the day (0 - 1439) from a timestamp. The date is in the current timezone.
         * @param timestamp: the timestamp to get the minute of the day from
         * @return the number of minutes that have elapsed since the last midnight of the timestamp's date
         */
        export function getDayMinutes(timestamp: number): number {
            return Dates.getDayMinutes(new Date(timestamp));
        }


        /** Convert a timestamp to a date string. The display date is in the current timezone.
         * @param timestamp: the timestamp to convert to a date
         * @return the date represented by the timestamp in the format 'mm/dd/yyyy'
         */
        export function toDisplayDate(timestamp: number, separator?: string): string {
            return Dates.toDisplayDate(new Date(timestamp), separator);
        }


        /** Convert a timestamp to a date-time string. The displayed date is in the current timezone.
         * @param timestamp: the timestamp to convert to a date-time string
         * @return the date-time representated by the timestamp in the format 'mm/dd/yyyy hh:mm am/pm'
         */
        export function toDisplayDateTime(timestamp: number, includingMidnight?: boolean): string {
            return Dates.toDisplayDateTime(new Date(timestamp), includingMidnight);
        }

    }

}

export = DateTimes;

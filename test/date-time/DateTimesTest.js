"use strict";
//import QUnit = require("qunit"); // implicitly setup by 'qunit-tests' in root of project, run using node.js
var DateTimes = require("../../../ts-mortar/date-time/DateTimes");
function testDotNetJson(sr) {
    var date = new Date(2000, 0, 27);
    var jsonTimestamp = DateTimes.DotNetJsonDate.toDotNetJson(date);
    var res = DateTimes.DotNetJsonDate.parseDotNetJson(jsonTimestamp);
    sr.equal(date.getTime(), res.getTime());
}
function testDotNetJsonTimestamp(sr) {
    var now = Date.now();
    var jsonTimestamp = DateTimes.Timestamp.toDotNetJson(now, false);
    var res = DateTimes.Timestamp.parseDotNetJson(jsonTimestamp);
    sr.equal(now, res);
}
QUnit.module("DateTimes", {});
QUnit.test("DateTimes.MS_PER_DAY", function MS_PER_DAYTest(sr) {
    sr.equal(DateTimes.MS_PER_DAY, 24 * 60 * 60 * 1000);
});
QUnit.test("DotNetJsonDate.parseDotNetJson", function parseDotNetJsonTest(sr) {
    testDotNetJson(sr);
});
QUnit.test("DotNetJsonDate.toDotNetJson", function toDotNetJsonTest(sr) {
    testDotNetJson(sr);
});
QUnit.test("Dates.getDayMinutes", function getDayMinutesTest(sr) {
    var date = new Date(2000, 0, 27, 2, 14);
    var res = DateTimes.Dates.getDayMinutes(date);
    sr.equal(134, res);
});
QUnit.test("Dates.toDisplayDate", function toDisplayDateTest(sr) {
    var res1 = DateTimes.Dates.toDisplayDate(new Date(2000, 0, 27, 2, 14));
    sr.equal("01/27/2000", res1);
    var res2 = DateTimes.Dates.toDisplayDate(new Date(2000, 0, 9, 2, 14), "-");
    sr.equal("01-09-2000", res2);
});
QUnit.test("Dates.toDisplayDateTime", function toDisplayDateTimeTest(sr) {
    var res1 = DateTimes.Dates.toDisplayDateTime(new Date(2000, 0, 27, 0, 0), false);
    sr.equal("01/27/2000", res1);
    var res1 = DateTimes.Dates.toDisplayDateTime(new Date(2000, 0, 27, 2, 14), false);
    sr.equal("01/27/2000 02:14 a.m.", res1);
    var res1 = DateTimes.Dates.toDisplayDateTime(new Date(2000, 0, 27, 23, 8), false);
    sr.equal("01/27/2000 11:08 p.m.", res1);
});
QUnit.test("Dates.dayDiff", function dayDiffTest(sr) {
    var oldDate = new Date(2000, 0, 27);
    var newDate = new Date(2000, 2, 1); // Jan 27 to Mar 1 = 34 days
    var res1 = DateTimes.Dates.dayDiff(newDate, oldDate);
    sr.equal(res1, 34);
});
QUnit.test("Timestamp.currentTimezoneOffsetMillis", function currentTimezoneOffsetMillisTest(sr) {
    var res1 = DateTimes.Timestamp.currentTimezoneOffsetMillis;
    sr.equal(res1, new Date().getTimezoneOffset() * 60 * 1000);
});
QUnit.test("Timestamp.now", function nowTest(sr) {
    var now = new Date().getTime();
    var res1 = DateTimes.Timestamp.now();
    sr.equal(res1 >= now, true);
});
QUnit.test("Timestamp.toDate", function toDateTest(sr) {
    var date = new Date();
    var now = date.getTime();
    var res1 = DateTimes.Timestamp.toDate(now, false);
    sr.equal(res1.getTime(), now);
    var res2 = DateTimes.Timestamp.toDate(now, true);
    sr.equal(res2.getTime(), now - DateTimes.Timestamp.currentTimezoneOffsetMillis);
});
QUnit.test("Timestamp.parseDotNetJson", function parseDotNetJsonTest(sr) {
    testDotNetJsonTimestamp(sr);
});
QUnit.test("Timestamp.toDotNetJson", function toDotNetJsonTest(sr) {
    testDotNetJsonTimestamp(sr);
});
QUnit.test("Timestamp.toUtcDotNetJson", function toUtcDotNetJsonTest(sr) {
    testDotNetJsonTimestamp(sr);
});
QUnit.test("Timestamp.getDayMinutes", function getDayMinutesTest(sr) {
    var date = new Date(2000, 0, 27, 2, 14);
    var res = DateTimes.Timestamp.getDayMinutes(date.getTime());
    sr.equal(134, res);
});
QUnit.test("Timestamp.toDisplayDate", function toDisplayDateTest(sr) {
    var res1 = DateTimes.Timestamp.toDisplayDate(new Date(2000, 0, 27, 2, 14).getTime());
    sr.equal("01/27/2000", res1);
    var res2 = DateTimes.Timestamp.toDisplayDate(new Date(2000, 0, 9, 2, 14).getTime(), "-");
    sr.equal("01-09-2000", res2);
});
QUnit.test("Timestamp.toDisplayDateTime", function toDisplayDateTimeTest(sr) {
    var res1 = DateTimes.Timestamp.toDisplayDateTime(new Date(2000, 0, 27, 0, 0).getTime(), false);
    sr.equal("01/27/2000", res1);
    var res1 = DateTimes.Timestamp.toDisplayDateTime(new Date(2000, 0, 27, 2, 14).getTime(), false);
    sr.equal("01/27/2000 02:14 a.m.", res1);
    var res1 = DateTimes.Timestamp.toDisplayDateTime(new Date(2000, 0, 27, 23, 8).getTime(), false);
    sr.equal("01/27/2000 11:08 p.m.", res1);
});

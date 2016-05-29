import chai = require("chai");
import mocha = require("mocha");
import DateTimes = require("../../../ts-mortar/date-time/DateTimes");

var asr = chai.assert;


suite("DateTimes", function DateTimesTest() {

    function testDotNetJson(asr: Chai.AssertStatic) {
        var date = new Date(2000, 0, 27);
        var jsonTimestamp = DateTimes.DotNetJsonDate.toDotNetJson(date);
        var res = DateTimes.DotNetJsonDate.parseDotNetJson(jsonTimestamp);
        asr.equal(date.getTime(), res.getTime());
    }


    function testDotNetJsonTimestamp(asr: Chai.AssertStatic) {
        var now = Date.now();
        var jsonTimestamp = DateTimes.Timestamp.toDotNetJson(now, false);
        var res = DateTimes.Timestamp.parseDotNetJson(jsonTimestamp);
        asr.equal(now, res);
    }


    test("DateTimes.MS_PER_DAY", function MS_PER_DAYTest() {
        asr.equal(DateTimes.MS_PER_DAY, 24 * 60 * 60 * 1000);
    });


    test("DotNetJsonDate.parseDotNetJson", function parseDotNetJsonTest() {
        testDotNetJson(asr);
    });


    test("DotNetJsonDate.toDotNetJson", function toDotNetJsonTest() {
        testDotNetJson(asr);
    });


    test("Dates.getDayMinutes", function getDayMinutesTest() {
        var date = new Date(2000, 0, 27, 2, 14);
        var res = DateTimes.Dates.getDayMinutes(date);
        asr.equal(134, res);
    });


    test("Dates.toDisplayDate", function toDisplayDateTest() {
        var res1 = DateTimes.Dates.toDisplayDate(new Date(2000, 0, 27, 2, 14));
        asr.equal("01/27/2000", res1);

        var res2 = DateTimes.Dates.toDisplayDate(new Date(2000, 0, 9, 2, 14), "-");
        asr.equal("01-09-2000", res2);
    });


    test("Dates.toDisplayDateTime", function toDisplayDateTimeTest() {
        var res1 = DateTimes.Dates.toDisplayDateTime(new Date(2000, 0, 27, 0, 0), false);
        asr.equal("01/27/2000", res1);

        var res1 = DateTimes.Dates.toDisplayDateTime(new Date(2000, 0, 27, 2, 14), false);
        asr.equal("01/27/2000 02:14 a.m.", res1);

        var res1 = DateTimes.Dates.toDisplayDateTime(new Date(2000, 0, 27, 23, 8), false);
        asr.equal("01/27/2000 11:08 p.m.", res1);
    });


    test("Dates.dayDiff", function dayDiffTest() {
        var oldDate = new Date(2000, 0, 27);
        var newDate = new Date(2000, 2, 1); // Jan 27 to Mar 1 = 34 days
        var res1 = DateTimes.Dates.dayDiff(newDate, oldDate);
        asr.equal(res1, 34);
    });


    test("Timestamp.currentTimezoneOffsetMillis", function currentTimezoneOffsetMillisTest() {
        var res1 = DateTimes.Timestamp.currentTimezoneOffsetMillis;
        asr.equal(res1, new Date().getTimezoneOffset() * 60 * 1000);
    });


    test("Timestamp.now", function nowTest() {
        var now = new Date().getTime();
        var res1 = DateTimes.Timestamp.now();
        asr.equal(res1 >= now, true);
    });


    test("Timestamp.toDate", function toDateTest() {
        var date = new Date();
        var now = date.getTime();
        var res1 = DateTimes.Timestamp.toDate(now, false);
        asr.equal(res1.getTime(), now);

        var res2 = DateTimes.Timestamp.toDate(now, true);
        asr.equal(res2.getTime(), now - DateTimes.Timestamp.currentTimezoneOffsetMillis);
    });


    test("Timestamp.parseDotNetJson", function parseDotNetJsonTest() {
        testDotNetJsonTimestamp(asr);
    });


    test("Timestamp.toDotNetJson", function toDotNetJsonTest() {
        testDotNetJsonTimestamp(asr);
    });


    test("Timestamp.toUtcDotNetJson", function toUtcDotNetJsonTest() {
        testDotNetJsonTimestamp(asr);
    });


    test("Timestamp.getDayMinutes", function getDayMinutesTest() {
        var date = new Date(2000, 0, 27, 2, 14);
        var res = DateTimes.Timestamp.getDayMinutes(date.getTime());
        asr.equal(134, res);
    });


    test("Timestamp.toDisplayDate", function toDisplayDateTest() {
        var res1 = DateTimes.Timestamp.toDisplayDate(new Date(2000, 0, 27, 2, 14).getTime());
        asr.equal("01/27/2000", res1);

        var res2 = DateTimes.Timestamp.toDisplayDate(new Date(2000, 0, 9, 2, 14).getTime(), "-");
        asr.equal("01-09-2000", res2);
    });


    test("Timestamp.toDisplayDateTime", function toDisplayDateTimeTest() {
        var res1 = DateTimes.Timestamp.toDisplayDateTime(new Date(2000, 0, 27, 0, 0).getTime(), false);
        asr.equal("01/27/2000", res1);

        var res1 = DateTimes.Timestamp.toDisplayDateTime(new Date(2000, 0, 27, 2, 14).getTime(), false);
        asr.equal("01/27/2000 02:14 a.m.", res1);

        var res1 = DateTimes.Timestamp.toDisplayDateTime(new Date(2000, 0, 27, 23, 8).getTime(), false);
        asr.equal("01/27/2000 11:08 p.m.", res1);
    });

});
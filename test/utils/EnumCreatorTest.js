"use strict";
var chai = require("chai");
var EnumCreator = require("../../../ts-mortar/utils/EnumCreator");
var asr = chai.assert;
suite("EnumCreator", function EnumCreatorTest() {
    var TestEnumBase = (function () {
        function TestEnumBase(type) {
            this.type = type;
        }
        return TestEnumBase;
    }());
    var TestEnum = EnumCreator.initEnumClass(TestEnumBase, TestEnumBase, function (toMember) {
        return {
            A: toMember(new TestEnumBase("number")),
            B: toMember(new TestEnumBase("string")),
            C: toMember(new TestEnumBase("Tuple<number, string, number>")),
        };
    });
    test("name", function nameTest() {
        asr.equal(TestEnum.A.type, "number");
        asr.equal(TestEnum.A.name, "A");
    });
    test("values", function valuesTest() {
        asr.equal(TestEnum.values().length, 3);
        asr.deepEqual(TestEnum.values().map(function (a) { return a.name; }), ["A", "B", "C"]);
    });
    test("isInstance", function isInstanceTest() {
        asr.equal(TestEnum.isInstance(TestEnum.B), true);
        asr.equal(TestEnum.isInstance({ _name: "B", value: 2 }), false);
    });
    test("parse", function parseTest() {
        asr.equal(TestEnum.tryParse("B"), TestEnum.B);
        asr.equal(TestEnum.tryParse("1"), null);
        asr.equal(TestEnum.parse("C"), TestEnum.C);
        try {
            asr.equal(TestEnum.parse("1"), null);
            asr.ok(false, "expected enum.parse to fail");
        }
        catch (err) {
            asr.ok(true);
        }
    });
});

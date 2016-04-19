"use strict";
//import QUnit = require("qunit"); // implicitly setup by 'qunit-tests' in root of project, run using node.js
var EnumCreator = require("../../../ts-mortar/utils/EnumCreator");
var TestEnum = (function () {
    function TestEnum(name, id) {
        EnumCreator.EnumConstantImpl.call(this, name);
        this.id = id;
    }
    TestEnum.isInstance = function (obj) { return null; };
    TestEnum.values = function () { return null; };
    TestEnum.parse = function (name, throwErrorIfNotEnum) { return null; };
    TestEnum.prototype.name = function () { return null; };
    TestEnum.A = null;
    TestEnum.B = null;
    TestEnum.C = null;
    TestEnum.Cctor = (function () {
        EnumCreator.initEnumClass(TestEnum, TestEnum, function () { return [
            TestEnum.A = new TestEnum("A", 1),
            TestEnum.B = new TestEnum("B", 2),
            TestEnum.C = new TestEnum("C", 4)
        ]; });
    }());
    return TestEnum;
}());
QUnit.module("EnumCreator", {});
QUnit.test("name", function nameTest(sr) {
    sr.equal(TestEnum.A.id, 1);
    sr.equal(TestEnum.A.name(), "A");
});
QUnit.test("values", function valuesTest(sr) {
    sr.equal(TestEnum.values().length, 3);
    sr.deepEqual(TestEnum.values().map(function (a) { return a.name(); }), ["A", "B", "C"]);
});
QUnit.test("isInstance", function isInstanceTest(sr) {
    sr.equal(TestEnum.isInstance(TestEnum.B), true);
    sr.equal(TestEnum.isInstance({ _name: "B", value: 2 }), false);
});
QUnit.test("parse", function parseTest(sr) {
    sr.equal(TestEnum.parse("B", false), TestEnum.B);
    sr.equal(TestEnum.parse("1", false), null);
});

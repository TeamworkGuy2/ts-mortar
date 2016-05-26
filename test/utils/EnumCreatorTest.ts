//import QUnit = require("qunit"); // implicitly setup by 'qunit-tests' in root of project, run using node.js
import EnumCreator = require("../../../ts-mortar/utils/EnumCreator");

class TestEnumBase {
    public type: string;


    constructor(type: string) {
        this.type = type;
    }
}

var TestEnum = EnumCreator.initEnumClass(TestEnumBase, TestEnumBase, (toMember) => {
    return {
        A: toMember(new TestEnumBase("number")),
        B: toMember(new TestEnumBase("string")),
        C: toMember(new TestEnumBase("Tuple<number, string, number>")),
    };
});

type Te = typeof TestEnum;


QUnit.module("EnumCreator", {
});


QUnit.test("name", function nameTest(sr) {

    sr.equal(TestEnum.A.type, "number");

    sr.equal(TestEnum.A.name, "A");
});


QUnit.test("values", function valuesTest(sr) {

    sr.equal(TestEnum.values().length, 3);

    sr.deepEqual(TestEnum.values().map((a) => a.name), ["A", "B", "C"]);
});


QUnit.test("isInstance", function isInstanceTest(sr) {

    sr.equal(TestEnum.isInstance(TestEnum.B), true);

    sr.equal(TestEnum.isInstance({ _name: "B", value: 2 }), false);
});


QUnit.test("parse", function parseTest(sr) {

    sr.equal(TestEnum.tryParse("B"), TestEnum.B);

    sr.equal(TestEnum.tryParse("1"), null);

    sr.equal(TestEnum.parse("C"), TestEnum.C);

    try {
        sr.equal(TestEnum.parse("1"), null);
        sr.ok(false, "expected enum.parse to fail");
    } catch (err) {
        sr.ok(true);
    }
});

//import QUnit = require("qunit"); // implicitly setup by 'qunit-tests' in root of project, run using node.js
import EnumCreator = require("../../../ts-mortar/utils/EnumCreator");

class TestEnum implements EnumCreator.EnumConstant {
    static A: TestEnum = null;
    static B: TestEnum = null;
    static C: TestEnum = null;

    private static Cctor = (function () {
        EnumCreator.initEnumClass(TestEnum, TestEnum, () => [
            TestEnum.A = new TestEnum("A", 1),
            TestEnum.B = new TestEnum("B", 2),
            TestEnum.C = new TestEnum("C", 4)
        ]);
    } ());

    static isInstance(obj): boolean { return null; }
    static values(): TestEnum[] { return null; }
    static parse(name: string, throwErrorIfNotEnum?: boolean): TestEnum { return null; }

    public name(): string { return null; }


    public id: number;


    constructor(name: string, id: number) {
        EnumCreator.EnumConstantImpl.call(this, name);
        this.id = id;
    }

}


QUnit.module("EnumCreator", {
});


QUnit.test("name", function nameTest(sr) {

    sr.equal(TestEnum.A.id, 1);

    sr.equal(TestEnum.A.name(), "A");
});


QUnit.test("values", function valuesTest(sr) {

    sr.equal(TestEnum.values().length, 3);

    sr.deepEqual(TestEnum.values().map((a) => a.name()), ["A", "B", "C"]);
});


QUnit.test("isInstance", function isInstanceTest(sr) {

    sr.equal(TestEnum.isInstance(TestEnum.B), true);

    sr.equal(TestEnum.isInstance({ _name: "B", value: 2 }), false);
});


QUnit.test("parse", function parseTest(sr) {

    sr.equal(TestEnum.parse("B", false), TestEnum.B);

    sr.equal(TestEnum.parse("1", false), null);
});

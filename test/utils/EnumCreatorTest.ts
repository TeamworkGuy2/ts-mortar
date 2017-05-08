import chai = require("chai");
import mocha = require("mocha");
import EnumCreator = require("../../utils/EnumCreator");

var asr = chai.assert;


suite("EnumCreator", function EnumCreatorTest() {

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




    test("name", function nameTest() {

        asr.equal(TestEnum.A.type, "number");

        asr.equal(TestEnum.A.name, "A");
    });


    test("values", function valuesTest() {

        asr.equal(TestEnum.values().length, 3);

        asr.deepEqual(TestEnum.values().map((a) => a.name), ["A", "B", "C"]);
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
        } catch (err) {
            asr.ok(true);
        }
    });

});

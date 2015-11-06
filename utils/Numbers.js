var Numbers;
(function (Numbers) {
    function isNumeric(n) {
        return Numbers.toNumber(n) != null;
    }
    Numbers.isNumeric = isNumeric;
    function toNumber(num) {
        var val = null;
        return !isNaN((val = parseFloat(num))) && isFinite(val) ? val : null;
    }
    Numbers.toNumber = toNumber;
    function isNullOrZero(num) {
        return num == null || num === 0;
    }
    Numbers.isNullOrZero = isNullOrZero;
    function getNullableNumeric(obj) {
        var value = obj.val();
        if (value == null || (value = value.trim()).length === 0) {
            return null;
        }
        var num = value * 1;
        return isNaN(num) ? null : num;
    }
    Numbers.getNullableNumeric = getNullableNumeric;
    function roundTo(num, decimalPlaces) {
        return parseFloat(num.toFixed(decimalPlaces));
    }
    Numbers.roundTo = roundTo;
    function getNullableNumericPercent(obj) {
        var value = obj.val();
        if (value == null || (value = value.trim()).length === 0) {
            return null;
        }
        var len = value.length;
        if (len > 0 && value.charAt(0) === '%') {
            value = value.substr(1);
            len--;
        }
        if (len > 0 && value.charAt(len - 1) === '%') {
            value = value.substr(0, len - 1);
            len--;
        }
        var num = value.trim() * 1;
        return isNaN(num) ? null : num;
    }
    Numbers.getNullableNumericPercent = getNullableNumericPercent;
    function orZero(num, infinityToZero) {
        var val = (num == null || typeof num === "number") ? num : parseFloat(num);
        return (num == null || isNaN(val) ||
            (infinityToZero === true && (val === Infinity ||
                val === Number.NEGATIVE_INFINITY || val === Number.POSITIVE_INFINITY))) ? 0 : val;
    }
    Numbers.orZero = orZero;
    function format(value, decimalPlaces, includeSeparator, digitsBetweenSeparators) {
        if (digitsBetweenSeparators === void 0) { digitsBetweenSeparators = 3; }
        return Numbers.formatNumeric(value, decimalPlaces, includeSeparator, digitsBetweenSeparators);
    }
    Numbers.format = format;
    function formatNumeric(value, decimalPlaces, includeSeparator, digitsBetweenSeparators) {
        if (digitsBetweenSeparators === void 0) { digitsBetweenSeparators = 3; }
        if (value == null) {
            return value;
        }
        var val = value.toString().trim();
        if (/(^(\+|\-)(0|([1-9][0-9]*))(\.[0-9]+)?$)|(^(0{0,1}|([1-9][0-9]*))(\.[0-9]+)?$)/.test(val) === false) {
            return val;
        }
        var num = Number(val).toFixed(decimalPlaces);
        var intAndDecimalPart = num.toString().trim().split(".");
        var intPartStr = intAndDecimalPart[0];
        var isNegative = false;
        if (intPartStr.indexOf("+") === 0) {
            intPartStr = intPartStr.substr(1, intPartStr.length - 1);
        }
        else if (intPartStr.indexOf("-") === 0) {
            intPartStr = intPartStr.substr(1, intPartStr.length - 1);
            isNegative = true;
        }
        var result = "";
        if (decimalPlaces > 0) {
            var decimals = intAndDecimalPart[1];
            result = "." + decimals;
        }
        if (includeSeparator === true) {
            for (var size = intPartStr.length; size > 0; size -= digitsBetweenSeparators) {
                result = (size - digitsBetweenSeparators > 0 ? "," : "") + intPartStr.substring((size - digitsBetweenSeparators > 0 ? size - digitsBetweenSeparators : 0), size) + result;
            }
        }
        else {
            result = intPartStr + result;
        }
        result = (isNegative ? "-" + result : result);
        return result;
    }
    Numbers.formatNumeric = formatNumeric;
})(Numbers || (Numbers = {}));
module.exports = Numbers;

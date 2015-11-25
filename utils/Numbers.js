/** Util functions for converting numeric values to and from other formats
 */
var Numbers;
(function (Numbers) {
    /**
     * @return true if the input argument is a number or a string representation of a number, false if not
     */
    function isNumeric(n) {
        return Numbers.toNumber(n) != null;
    }
    Numbers.isNumeric = isNumeric;
    /**
     * @return a number if the input argument is a number or a string representing a valid number, null otherwise
     */
    function toNumber(num) {
        var val = null;
        return !isNaN((val = parseFloat(num))) && isFinite(val) ? val : null;
    }
    Numbers.toNumber = toNumber;
    /**
     * @param num: the number to check
     * @return true if the parameter is null or zero, false if not
     */
    function isNullOrZero(num) {
        return num == null || num === 0;
    }
    Numbers.isNullOrZero = isNullOrZero;
    /**
     * @param val an object containing a 'val' function that returns a string representation of a number or an empty string
     * @return the numeric representation of the value returned by the obj's 'val' function
     * or null if null or an empty string was returned by the 'val' function
     */
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
    /**
     * @param val an object containing a 'val' function that returns a string representation of a percentage (i.e. a string beginning or ending with a percent sign '%') or an empty string
     * @return the numeric representation of the value returned by the obj's 'val' function
     * or null if null or an empty string was returned by the 'val' function
     */
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
    /** Convert a value like {@code 1340283.5264} to {@code 1,340,283.53}
     * @param value a value to convert to a currency value
     * @param decimalPlaces the number of decimal places to include
     * @param includeSeparator true to include a separator every {@code digitsBetweenSeparators} digits,
     * false for no separator
     * @param digitsBetweenSeparators: the number of digits between separators, for example {@code 3}
     * would produce {@code 1,340,283.53}, but {@code 4} would produce {@code 134,0283.53}
     * @return a string representing the formatted numeric value
     */
    function format(value, decimalPlaces, includeSeparator, digitsBetweenSeparators) {
        if (digitsBetweenSeparators === void 0) { digitsBetweenSeparators = 3; }
        return Numbers.formatNumeric(value, decimalPlaces, includeSeparator, digitsBetweenSeparators);
    }
    Numbers.format = format;
    /** Convert a value like {@code 1340283.5264} to {@code 1,340,283.53}
     * @param value a value to convert to a currency value
     * @param decimalPlaces the number of decimal places to include
     * @param includeSeparator true to include a separator every {@code digitsBetweenSeparators}
     * digits, false for no separator
     * @param digitsBetweenSeparators: the number of digits between separators, for example {@code 3}
     * would produce {@code 1,340,283.53}, but {@code 4} would produce {@code 134,0283.53}
     * @return a string representing the formatted numeric value
     */
    function formatNumeric(value, decimalPlaces, includeSeparator, digitsBetweenSeparators) {
        if (digitsBetweenSeparators === void 0) { digitsBetweenSeparators = 3; }
        if (value == null) {
            return value;
        }
        var val = value.toString().trim();
        // ensure the value is numeric
        if (/(^(\+|\-)(0|([1-9][0-9]*))(\.[0-9]+)?$)|(^(0{0,1}|([1-9][0-9]*))(\.[0-9]+)?$)/.test(val) === false) {
            return val;
        }
        var num = Number(val).toFixed(decimalPlaces);
        // split the number into decimal and whole number parts
        var intAndDecimalPart = num.toString().trim().split(".");
        var intPartStr = intAndDecimalPart[0];
        // remove leading +- sign, so that values like -821999.00 does not become -,821,999.00
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
        // add separators every N-characters
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

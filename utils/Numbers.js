"use strict";
/** Util functions for converting numeric values to and from other formats
 */
var Numbers;
(function (Numbers) {
    /**
     * @returns true if the input argument is a number or a string representation of a number, false if not
     */
    function isNumeric(n) {
        return toNumber(n) != null;
    }
    Numbers.isNumeric = isNumeric;
    /**
     * @returns a number if the input argument is a number or a string representing a valid number, null otherwise
     */
    function toNumber(num) {
        var val = null;
        return !isNaN(val = parseFloat(num)) && isFinite(val) ? val : null;
    }
    Numbers.toNumber = toNumber;
    /**
     * @param num the number to check
     * @returns true if the parameter is null or zero, false if not
     */
    function isNullOrZero(num) {
        return num == null || num === 0;
    }
    Numbers.isNullOrZero = isNullOrZero;
    /**
     * @param num the number to round
     * @param decimalPlaces the number of decimal places to round the number to
     * @returns the 'num' rounded to the specified number of decimal places
     */
    function roundTo(num, decimalPlaces) {
        return parseFloat(toFixed(num, decimalPlaces));
    }
    Numbers.roundTo = roundTo;
    /** A correct version of JavaScript's Number.toFixed() method. Handles incorrect round of certain values like 1.005 to 1.01
     * @param num the number to round
     * @param decimalPlaces the number of decimal places to round the number to
     * @returns the 'num' as a string rounded to the specified number of decimal places
     */
    function toFixed(num, decimalPlaces) {
        var fraction = num % 1;
        if (fraction === 0 || !isFinite(num)) {
            // whole number or NaN/Infinity
            return num.toFixed(decimalPlaces);
        }
        else {
            // if the decimal needs padding with 0's, don't add the '1' to correct for rounding
            var numStr = num.toString();
            return ((numStr.length - numStr.indexOf(".") - 1) < decimalPlaces ? num : +(num + "1")).toFixed(decimalPlaces);
        }
    }
    Numbers.toFixed = toFixed;
    /** Convert NaN, null, or undefined numbers to zero, infinity remains as is.
     * Example: orZero("string")
     * returns: 0
     * Or example: orZero("-12")
     * returns: -12
     *
     * @param num the number to check
     * @param infinityToZero true to convert infinity (Infinity, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)
     * to zero, false to leave it as is
     * @returns the parsed number
     */
    function orZero(num, infinityToZero) {
        var val = (num == null || typeof num === "number") ? num : parseFloat(num);
        return (val == null || isNaN(val) ||
            (infinityToZero === true && (val === Infinity ||
                val === Number.NEGATIVE_INFINITY || val === Number.POSITIVE_INFINITY))) ? 0 : val;
    }
    Numbers.orZero = orZero;
    /** Convert a value like 1340283.5264 to '1,340,283.53'
     * @param value a value to convert to a currency value
     * @param decimalPlaces the number of decimal places to include
     * @param includeSeparator true to include a separator every 'digitsBetweenSeparators' digits,
     * false for no separator
     * @param digitsBetweenSeparators the number of digits between separators, for example 3
     * would produce '1,340,283.53', but 4 would produce '134,0283.53'
     * @returns a string representing the formatted numeric value
     */
    function format(value, decimalPlaces, includeSeparator, digitsBetweenSeparators) {
        if (digitsBetweenSeparators === void 0) { digitsBetweenSeparators = 3; }
        return formatNumeric(value, decimalPlaces, includeSeparator, digitsBetweenSeparators);
    }
    Numbers.format = format;
    /** Convert a value like 1340283.5264 to '1,340,283.53'
     * @param value a value to convert to a currency value
     * @param decimalPlaces the number of decimal places to include
     * @param includeSeparator true to include a separator every 'digitsBetweenSeparators'
     * digits, false for no separator
     * @param digitsBetweenSeparators the number of digits between separators, for example 3
     * would produce '1,340,283.53', but 4 would produce '134,0283.53'
     * @returns a string representing the formatted numeric value
     */
    function formatNumeric(value, decimalPlaces, includeSeparator, digitsBetweenSeparators) {
        if (digitsBetweenSeparators === void 0) { digitsBetweenSeparators = 3; }
        if (value == null) {
            return null;
        }
        var val = value.toString().trim();
        // ensure the value is numeric
        if (val.length > 0 && /(^(\+|\-)?(0|([1-9][0-9]*))(\.[0-9]+)?$)/.test(val) === false) {
            return val;
        }
        var num = toFixed(Number(val), decimalPlaces);
        // split the number into decimal and whole number parts
        var intAndDecimalPart = num.trim().split(".");
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

/** Util functions for converting numeric values to and from other formats
 */
module Numbers {

    /**
     * @return true if the input argument is a number or a string representation of a number, false if not
     */
    export function isNumeric(n: number | string): n is number {
        return Numbers.toNumber(n) != null;
    }


    /**
     * @return a number if the input argument is a number or a string representing a valid number, null otherwise
     */
    export function toNumber(num: string | number): number {
        var val: number = null;
        return !isNaN(val = parseFloat(<string>num)) && isFinite(val) ? val : null;
    }


    /**
     * @param num the number to check
     * @return true if the parameter is null or zero, false if not
     */
    export function isNullOrZero(num: number): boolean {
        return num == null || num === 0;
    }


    /**
     * @param obj an object containing a 'val' function that returns a string representation of a number or an empty string
     * @return the numeric representation of the value returned by the obj's 'val' function
     * or null if null or an empty string was returned by the 'val' function
     */
    export function getNullableNumeric(obj: { val(): string; }): number {
        var value = obj.val();
        if (value == null || (value = value.trim()).length === 0) {
            return null;
        }
        var num: number = <any>value * 1;
        return isNaN(num) ? null : num;
    }


    export function roundTo(num: number, decimalPlaces: number): number {
        return parseFloat(num.toFixed(decimalPlaces));
    }


    /**
     * @param obj an object containing a 'val' function that returns a numeric percent string (i.e. a string beginning or ending with a percent sign '%') or an empty string
     * @return the numeric representation of the value returned by the obj's 'val' function
     * or null if null or an empty string was returned by the 'val' function
     */
    export function getNullableNumericPercent(obj: { val(): string }): number {
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
        var num: number = <any>value.trim() * 1;
        return isNaN(num) ? null : num;
    }


    /** Convert NaN, null, or undefined numbers to zero, infinity remains as is.
     * Example: Numbers.orZero("string")
     * returns: 0
     * Or example: Numbers.orZero("-12")
     * returns: -12
     *
     * @param num the number to check
     * @param infinityToZero true to convert infinity (Infinity, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)
     * to zero, false to leave it as is
     * @return the parsed number
     */
    export function orZero(num: string, infinityToZero?: boolean): number;
    export function orZero(num: number, infinityToZero?: boolean): number;
    export function orZero(num: any, infinityToZero?: boolean): number {
        var val = (num == null || typeof num === "number") ? num : parseFloat(num);
        return (num == null || isNaN(val) ||
            (infinityToZero === true && (val === Infinity ||
                val === Number.NEGATIVE_INFINITY || val === Number.POSITIVE_INFINITY))) ? 0 : val;
    }


    /** Convert a value like 1340283.5264 to '1,340,283.53'
     * @param value a value to convert to a currency value
     * @param decimalPlaces the number of decimal places to include
     * @param includeSeparator true to include a separator every 'digitsBetweenSeparators' digits,
     * false for no separator
     * @param digitsBetweenSeparators the number of digits between separators, for example 3
     * would produce '1,340,283.53', but 4 would produce '134,0283.53'
     * @return a string representing the formatted numeric value
     */
    export function format(value: any, decimalPlaces: number, includeSeparator: boolean, digitsBetweenSeparators: number = 3): string {
        return Numbers.formatNumeric(value, decimalPlaces, includeSeparator, digitsBetweenSeparators);
    }


    /** Convert a value like 1340283.5264 to '1,340,283.53'
     * @param value a value to convert to a currency value
     * @param decimalPlaces the number of decimal places to include
     * @param includeSeparator true to include a separator every 'digitsBetweenSeparators'
     * digits, false for no separator
     * @param digitsBetweenSeparators the number of digits between separators, for example 3
     * would produce '1,340,283.53', but 4 would produce '134,0283.53'
     * @return a string representing the formatted numeric value
     */
    export function formatNumeric(value: any, decimalPlaces: number, includeSeparator: boolean, digitsBetweenSeparators: number = 3): string {
        if (value == null) {
            return value;
        }
        var val = value.toString().trim();
        // ensure the value is numeric
        if (/(^(\+|\-)(0|([1-9][0-9]*))(\.[0-9]+)?$)|(^(0{0,1}|([1-9][0-9]*))(\.[0-9]+)?$)/.test(val) === false) {
            return val;
        }
        var num: string = Number(val).toFixed(decimalPlaces);
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
        var result: string = "";
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

}


export = Numbers;
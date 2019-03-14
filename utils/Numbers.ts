/** Util functions for converting numeric values to and from other formats
 */
module Numbers {

    /**
     * @returns true if the input argument is a number or a string representation of a number, false if not
     */
    export function isNumeric(n: number | string | null | undefined): boolean {
        return toNumber(n) != null;
    }


    /**
     * @returns a number if the input argument is a number or a string representing a valid number, null otherwise
     */
    export function toNumber(num: string | number | null | undefined): number | null {
        var val: number = <never>null;
        return !isNaN(val = parseFloat(<string>num)) && isFinite(val) ? val : null;
    }


    /**
     * @param num the number to check
     * @returns true if the parameter is null or zero, false if not
     */
    export function isNullOrZero(num: number | null | undefined): boolean {
        return num == null || num === 0;
    }


    /**
     * @param num the number to round
     * @param decimalPlaces the number of decimal places to round the number to
     * @returns the 'num' rounded to the specified number of decimal places
     */
    export function roundTo(num: number, decimalPlaces: number): number {
        return parseFloat(num.toFixed(decimalPlaces));
    }


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
    export function orZero(num: number | string | null | undefined, infinityToZero?: boolean): number {
        var val = (num == null || typeof num === "number") ? <number>num : parseFloat(num);
        return (val == null || isNaN(val) ||
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
     * @returns a string representing the formatted numeric value
     */
    export function format(value: number | string | null | undefined, decimalPlaces: number, includeSeparator: boolean, digitsBetweenSeparators: number = 3): string | null {
        return formatNumeric(value, decimalPlaces, includeSeparator, digitsBetweenSeparators);
    }


    /** Convert a value like 1340283.5264 to '1,340,283.53'
     * @param value a value to convert to a currency value
     * @param decimalPlaces the number of decimal places to include
     * @param includeSeparator true to include a separator every 'digitsBetweenSeparators'
     * digits, false for no separator
     * @param digitsBetweenSeparators the number of digits between separators, for example 3
     * would produce '1,340,283.53', but 4 would produce '134,0283.53'
     * @returns a string representing the formatted numeric value
     */
    export function formatNumeric(value: number | string | null | undefined, decimalPlaces: number, includeSeparator: boolean, digitsBetweenSeparators: number = 3): string | null {
        if (value == null) {
            return null;
        }
        var val = value.toString().trim();
        // ensure the value is numeric
        if (val.length > 0 && /(^(\+|\-)?(0|([1-9][0-9]*))(\.[0-9]+)?$)/.test(val) === false) {
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
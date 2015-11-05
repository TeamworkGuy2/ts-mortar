
module Strings {

    /** Check if a string ends with a specific suffix
     * For example: {@code endsWith("coding in javascript", "script")}
     * returns: {@code true}
     * @param str: the string to check. Null returns false
     * @param suffix: the suffix to check for. Null returns false
     * @return true if {@code str} ends with {@code stuffix}, false otherwise
     */
    export function endsWith(str: string, suffix: string): boolean {
        if (str == null || suffix == null) {
            return false;
        }
        return str.indexOf(suffix) === (str.length - suffix.length);
    }


    /** Check if a string is null or empty
     * @param str: the string to check
     * @return true if the {@code str} is null or empty, false if not
     */
    export function isNullOrEmpty(str: string): boolean {
        return str == null || str.length === 0;
    }


    /** Check if a string is null or empty or contains only whitespace
     * @param str: the string to check
     * @return true if the {@code str} is null, empty or contains only
     * whitespace characters, false otherwise
     */
    export function isNullOrWhiteSpace(str: string): boolean {
        return str == null || (str.trim instanceof Function ? str.trim().length === 0 : false);
    }


    /** Check if a character at a specific index in a string is a digit
     * @param str: the string to get the character from
     * @param i: the index of the character
     * @return true if the character at the specified index is a digit {@code 0-9}, false if not
     */
    export function isCharAtDigit(str: string, i: number): boolean {
        if (str == null || i < 0 || i >= str.length) {
            return false;
        }
        var ch = str.charCodeAt(i) - 48;
        return ch >= 0 && ch <= 9;
    }


    /** Check if all characters in a string are digits
     * @param str: the string to check
     * @return true if every character in the string is a digit {@code [0-9]}, false if not
     */
    export function isDigit(str: string): boolean {
        if (str == null) {
            return false;
        }
        for (var i = 0, size = str.length; i < size; i++) {
            var ch = str.charCodeAt(i) - 48;
            if (ch < 0 || ch > 9) {
                return false;
            }
        }
        return true;
    }


    /** Check if a char at a specific index in a string is upper case
     * For example: {@code isCharAtUpperCase("Super", 0)}
     * returns: {@code true}
     * Or example: {@code isCharAtUpperCase("Super", 4)}
     * returns {@code false}
     * @param str: the string that the char resides in
     * @param i: the index of the character in {@code str} to test
     * @return true if the character at index {@code i} is upper case
     */
    export function isCharAtUpperCase(str: string, i: number): boolean {
        if (str == null || i < 0 || i >= str.length) {
            return false;
        }
        var ch = str.charAt(i);
        return ch === ch.toUpperCase();
    }


    /** Check if a char at a specific index in a string is lower case
     * For example: {@code isCharAtLowerCase("Super", 0)}
     * returns: {@code false}
     * Or example: {@code isCharAtLowerCase("Super", 4)}
     * returns {@code true}
     * @param str: the string that the char resides in
     * @param i: the index of the character in {@code str} to test
     * @return true if the character at index {@code i} is lower case
     */
    export function isCharAtLowerCase(str: string, i: number): boolean {
        if (str == null || i < 0 || i >= str.length) {
            return false;
        }
        var ch = str.charAt(i);
        return ch === ch.toLowerCase();
    }


    /** Compare two strings, ignoring leading/trailing whitespace and ignoring upper/lower case
     * @param str1: the first string to compare
     * @param str2: the second string to compare
     * @return true if the strings are loosely equal (ignoring case and whitespace)
     */
    export function looseEqual(str1: string, str2: string): boolean {
        return str1 != null && str2 != null && str1.trim().toUpperCase() === str2.trim().toUpperCase();
    }


    export function padZeroLeft(value, maxDigits: number, padChar: string = '0'): string {
        return Strings.padLeft(value, maxDigits, padChar);
    }


    /** Prepend padding to the {@code String(value)} representation {@code value} to increase it's length to {@code maxDigits}
     * @param value: the value to convert to a string and pad
     * @param maxDigits: the maximum length of the returned string
     * @param [padChar]: an character to use as padding
     * @return the {@code value} converted to a string and padded with {@code padChar} until the string is {@code maxDigits} long,
     * or returns the {@code value} as a string without modification if that string is longer than {@code maxDigits}
     */
    export function padLeft(value, maxDigits: number, padChar: string): string {
        var valStr = String(value);
        if (valStr.length > maxDigits) {
            return value;
        }
        return value != null ? new Array(maxDigits - valStr.length + 1).join(padChar) + value : value;
    }


    /**
     * @see padLeft()
     */
    export function padRight(value, maxDigits: number, padChar: string): string {
        var valStr = String(value);
        if (valStr.length > maxDigits) {
            return value;
        }
        return value != null ? value + new Array(maxDigits - valStr.length + 1).join(padChar) : value;
    }


    /** Remove {@code leadingStr} string from the beginning of {@code str} as many times as it appears.
     * For example: removeTrailingStrings("stubstubAlpha", "stub")
     * Returns: "Alpha"
     *
     * @param str: the string to remove the leading values from
     * @param leadingStr: the sub-string to search for and remove from the beginning of {@code str}
     * @return {@code str} with the matching leading strings removed
     */
    export function removeLeading(str: string, leadingStr: string, removeRepeats: boolean = false) {
        var res = str;
        var leadingStrLen = leadingStr.length;

        if (res.indexOf(leadingStr) === 0) {
            res = res.substr(leadingStrLen);
        }

        if (removeRepeats) {
            while (res.indexOf(leadingStr) === 0) {
                res = res.substr(leadingStrLen);
            }
        }
        return res;
    }


    
    /** Remove {@code trailingStr} string from the end of {@code str} as many times as it appears.
     * For example: removeTrailingStrings("alphaPiePiePie", "Pie")
     * Returns: "alpha"
     *
     * @param str: the string to remove the trailing values from
     * @param trailingStr: the sub-string to search for and remove from the end of {@code str}
     * @return {@code str} with the matching trailing strings removed
     */
    export function removeTrailing(str: string, trailingStr: string, removeRepeats: boolean = false) {
        var res = str;
        var trailingStrLen = trailingStr.length;

        if (res.lastIndexOf(trailingStr) === res.length - trailingStrLen) {
            res = res.substr(0, res.length - trailingStrLen);
        }

        if (removeRepeats) {
            while (res.lastIndexOf(trailingStr) === res.length - trailingStrLen) {
                res = res.substr(0, res.length - trailingStrLen);
            }
        }
        return res;
    }


    /** Replace all occurances of a specified substring with a replacement string
     * For example: {@code replaceAll("cat in the hat", "at", "ab")}
     * returns: {@code "cab in the hab"}
     * @param str: the string to search and replace
     * @param find: the string to search for
     * @param replace: the replacement string
     * @return the {@code str} with all instances of {@code find} replaced with {@code replace}
     */
    export function replaceAll(str: string, find: string, replace: string): string {
        if (str == null || find == null) {
            throw new Error("incorrect usage (" + str + ", " + find + ", " + replace + "), expected (String str, String find, String replace)");
        }
        return str.split(find).join(replace);
    }

}

export = Strings;

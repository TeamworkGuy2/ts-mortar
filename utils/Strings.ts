﻿
/** String utilities, includes:
 * is-null/empty/whitespace, is-upper/lower/digit, pad-start/end, and remove-leading/trailing
 */
module Strings {

    /** Check if a string is null or empty
     * @param str the string to check
     * @returns true if the 'str' is null or empty, false if not
     */
    export function isNullOrEmpty(str: string | null | undefined): boolean {
        return str == null || str.length === 0;
    }


    /** Check if a string is null or empty or contains only whitespace
     * @param str the string to check
     * @returns true if the 'str' is null, empty or contains only
     * whitespace characters, false otherwise
     */
    export function isNullOrWhiteSpace(str: string | null | undefined): boolean {
        return str == null || str.trim().length === 0;
    }


    /** Check that a string is NOT null nor empty
     * @param str the string to check
     * @returns true if the 'str' is not null and not empty, false if null or empty
     */
    export function notNullOrEmpty(str: string | null | undefined): str is string {
        return str != null && str.length > 0;
    }


    /** Check that a string is NOT null nor empty nor contains only whitespace
     * @param str the string to check
     * @returns true if the 'str' is not null, not empty, nor contains only whitespace characters,
     * false otherwise
     */
    export function notNullOrWhiteSpace(str: string | null | undefined): str is string {
        return str != null && str.trim().length > 0;
    }


    /** Check if a character at a specific index in a string is a digit
     * @param str the string to get the character from
     * @param i the index of the character
     * @returns true if the character at the specified index is a digit [0-9], false if not
     */
    export function isCharAtDigit(str: string | null | undefined, i: number): boolean {
        if (str == null || i < 0 || i >= str.length) {
            return false;
        }
        var ch = str.charCodeAt(i) - 48;
        return ch >= 0 && ch <= 9;
    }


    /** Check if all characters in a string are digits
     * @param str the string to check
     * @returns true if every character in the string is a digit [0-9], false if the string is empty or contains non-digits
     */
    export function isDigit(str: string | null | undefined): boolean {
        var size = 0;
        if (str == null || (size = str.length) === 0) {
            return false;
        }
        for (var i = 0; i < size; i++) {
            var ch = str.charCodeAt(i) - 48;
            if (ch < 0 || ch > 9) {
                return false;
            }
        }
        return true;
    }


    /** Check if a char at a specific index in a string is upper case
     * Example: isCharAtUpperCase("Super", 0)
     * returns: true
     * Example: isCharAtUpperCase("Super", 4)
     * returns false
     *
     * @param str the string that the char resides in
     * @param i the index of the character in 'str' to test
     * @returns true if the character at index 'i' is upper case
     */
    export function isCharAtUpperCase(str: string | null | undefined, i: number): boolean {
        if (str == null || i < 0 || i >= str.length) {
            return false;
        }
        var ch = str.charAt(i);
        return ch === ch.toUpperCase();
    }


    /** Check if a char at a specific index in a string is lower case
     * Example: isCharAtLowerCase("Super", 0)
     * returns: false
     * Example: isCharAtLowerCase("Super", 4)
     * returns true
     *
     * @param str the string that the char resides in
     * @param i the index of the character in 'str' to test
     * @returns true if the character at index 'i' is lower case
     */
    export function isCharAtLowerCase(str: string | null | undefined, i: number): boolean {
        if (str == null || i < 0 || i >= str.length) {
            return false;
        }
        var ch = str.charAt(i);
        return ch === ch.toLowerCase();
    }


    /** Compare two strings, ignoring leading/trailing whitespace and ignoring upper/lower case
     * @param str1 the first string to compare
     * @param str2 the second string to compare
     * @returns true if the strings are loosely equal (ignoring case and whitespace)
     */
    export function looseEqual(str1: string | null | undefined, str2: string | null | undefined): boolean {
        return str1 != null && str2 != null && str1.trim().toUpperCase() === str2.trim().toUpperCase();
    }


    /** Truncates the maximum length of a string
     * @param str the string to truncate
     * @param maxLen the max length of the string
     * @param ellipsis an optional string to append to the returned string if it is truncated, this string is appended in addition to the 'maxLen'
     */
    export function truncate(str: string, maxLen: number, ellipsis?: string): string;
    export function truncate(str: string | null | undefined, maxLen: number, ellipsis?: string): string;
    export function truncate(str: string | null | undefined, maxLen: number, ellipsis: string = ""): string {
        return str != null && str.length > maxLen ? str.substring(0, maxLen - ellipsis.length) + ellipsis : str || "";
    }


    /** Prepend padding to the 'String(value)' representation of 'value' to increase it's length to 'targetLen'
     * @param value the value to convert to a string and pad
     * @param targetLen the maximum length of the returned string
     * @param padChar an character to use as padding
     * @returns the 'value' converted to a string and padded with 'padChar' until the string is 'targetLen' long,
     * or returns the 'value' as a string without modification if the string is longer than 'targetLen'
     */
    export function padStart(value: string | number, targetLen: number, padChar: string): string {
        var valStr = String(value);
        if (valStr.length >= targetLen) {
            return valStr;
        }
        return value != null ? padChar.repeat(targetLen - valStr.length) + valStr : valStr;
    }


    /** Append padding to the 'String(value)' representation of 'value' to increase it's length to 'targetLen'
     * @param value the value to convert to a string and pad
     * @param targetLen the maximum length of the returned string
     * @param padChar an character to use as padding
     * @returns the 'value' converted to a string and padded with 'padChar' until the string is 'targetLen' long,
     * or returns the 'value' as a string without modification if the string is longer than 'targetLen'
     */
    export function padEnd(value: string | number, targetLen: number, padChar: string): string {
        var valStr = String(value);
        if (valStr.length >= targetLen) {
            return valStr;
        }
        return value != null ? valStr + padChar.repeat(targetLen - valStr.length) : valStr;
    }


    /** Remove 'leadingStr' string from the beginning of 'str' as many times as it appears.
     * Example: removeTrailingStrings("stubstubAlpha", "stub")
     * returns: "Alpha"
     *
     * @param str the string to remove the leading values from
     * @param leadingStr the sub-string to search for and remove from the beginning of 'str''
     * @returns 'str' with the matching leading strings removed
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


    /** Remove 'trailingStr' string from the end of 'str' as many times as it appears.
     * Example: removeTrailingStrings("alphaPiePiePie", "Pie")
     * returns: "alpha"
     *
     * @param str the string to remove the trailing values from
     * @param trailingStr the sub-string to search for and remove from the end of 'str''
     * @returns 'str' with the matching trailing strings removed
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
     * Example: replaceAll("cat in the hat", "at", "ab")
     * returns: "cab in the hab"
     *
     * @param str the string to search and replace
     * @param find the string to search for
     * @param replace the replacement string
     * @returns the 'str' with all instances of 'find' replaced with 'replace'
     */
    export function replaceAll(str: string, find: string, replace: string): string {
        if (str == null || find == null) {
            throw new Error("incorrect usage (" + str + ", " + find + ", " + replace + "), expected (String str, String find, String replace)");
        }
        return str.split(find).join(replace);
    }

}

export = Strings;

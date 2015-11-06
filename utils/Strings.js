var Strings;
(function (Strings) {
    function endsWith(str, suffix) {
        if (str == null || suffix == null) {
            return false;
        }
        return str.indexOf(suffix) === (str.length - suffix.length);
    }
    Strings.endsWith = endsWith;
    function isNullOrEmpty(str) {
        return str == null || str.length === 0;
    }
    Strings.isNullOrEmpty = isNullOrEmpty;
    function isNullOrWhiteSpace(str) {
        return str == null || (str.trim instanceof Function ? str.trim().length === 0 : false);
    }
    Strings.isNullOrWhiteSpace = isNullOrWhiteSpace;
    function isCharAtDigit(str, i) {
        if (str == null || i < 0 || i >= str.length) {
            return false;
        }
        var ch = str.charCodeAt(i) - 48;
        return ch >= 0 && ch <= 9;
    }
    Strings.isCharAtDigit = isCharAtDigit;
    function isDigit(str) {
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
    Strings.isDigit = isDigit;
    function isCharAtUpperCase(str, i) {
        if (str == null || i < 0 || i >= str.length) {
            return false;
        }
        var ch = str.charAt(i);
        return ch === ch.toUpperCase();
    }
    Strings.isCharAtUpperCase = isCharAtUpperCase;
    function isCharAtLowerCase(str, i) {
        if (str == null || i < 0 || i >= str.length) {
            return false;
        }
        var ch = str.charAt(i);
        return ch === ch.toLowerCase();
    }
    Strings.isCharAtLowerCase = isCharAtLowerCase;
    function looseEqual(str1, str2) {
        return str1 != null && str2 != null && str1.trim().toUpperCase() === str2.trim().toUpperCase();
    }
    Strings.looseEqual = looseEqual;
    function padZeroLeft(value, maxDigits, padChar) {
        if (padChar === void 0) { padChar = '0'; }
        return Strings.padLeft(value, maxDigits, padChar);
    }
    Strings.padZeroLeft = padZeroLeft;
    function padLeft(value, maxDigits, padChar) {
        var valStr = String(value);
        if (valStr.length > maxDigits) {
            return value;
        }
        return value != null ? new Array(maxDigits - valStr.length + 1).join(padChar) + value : value;
    }
    Strings.padLeft = padLeft;
    function padRight(value, maxDigits, padChar) {
        var valStr = String(value);
        if (valStr.length > maxDigits) {
            return value;
        }
        return value != null ? value + new Array(maxDigits - valStr.length + 1).join(padChar) : value;
    }
    Strings.padRight = padRight;
    function removeLeading(str, leadingStr, removeRepeats) {
        if (removeRepeats === void 0) { removeRepeats = false; }
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
    Strings.removeLeading = removeLeading;
    function removeTrailing(str, trailingStr, removeRepeats) {
        if (removeRepeats === void 0) { removeRepeats = false; }
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
    Strings.removeTrailing = removeTrailing;
    function replaceAll(str, find, replace) {
        if (str == null || find == null) {
            throw new Error("incorrect usage (" + str + ", " + find + ", " + replace + "), expected (String str, String find, String replace)");
        }
        return str.split(find).join(replace);
    }
    Strings.replaceAll = replaceAll;
})(Strings || (Strings = {}));
module.exports = Strings;

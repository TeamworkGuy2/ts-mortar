var Arrays;
(function (Arrays) {
    Arrays.EMPTY_ARRAY = Object.freeze([]);
    function addAll(src, toAdd) {
        if (toAdd && toAdd.length > 0) {
            Array.prototype.push.apply(src, toAdd);
        }
        return src;
    }
    Arrays.addAll = addAll;
    function addAllTransform(src, toAdd, transformer) {
        for (var i = 0, size = toAdd.length; i < size; i++) {
            src.push(transformer(toAdd[i]));
        }
        return src;
    }
    Arrays.addAllTransform = addAllTransform;
    function asArray(data, copyToNewAry) {
        if (copyToNewAry === void 0) { copyToNewAry = false; }
        if (Array.isArray(data)) {
            return copyToNewAry ? data.slice() : data;
        }
        else {
            return [data];
        }
    }
    Arrays.asArray = asArray;
    function binarySearch(ary, comparatorPropName, searchValue) {
        var low = 0;
        var high = ary.length - 1;
        while (low <= high) {
            var mid = Math.floor((low + high) / 2);
            var midVal = ary[mid];
            var compare = midVal[comparatorPropName] - searchValue;
            if (compare < 0) {
                low = mid + 1;
            }
            else if (compare > 0) {
                high = mid - 1;
            }
            else {
                return mid;
            }
        }
        return -(low + 1);
    }
    Arrays.binarySearch = binarySearch;
    function copy(src) {
        return addAll([], src);
    }
    Arrays.copy = copy;
    function concat(ary1, ary2) {
        var res = [];
        Array.prototype.push.apply(res, ary1);
        Array.prototype.push.apply(res, ary2);
        return res;
    }
    Arrays.concat = concat;
    function containsAll(ary, searchFor) {
        if (ary == null || searchFor == null) {
            return false;
        }
        for (var i = 0, size = searchFor.length; i < size; i++) {
            if (ary.indexOf(searchFor[i]) < 0) {
                return false;
            }
        }
        return true;
    }
    Arrays.containsAll = containsAll;
    function clear(ary) {
        if (ary == null) {
            return;
        }
        for (var i = 0, size = ary.length; i < size; i++) {
            ary.pop();
        }
    }
    Arrays.clear = clear;
    function diff(ary1, ary2) {
        if (ary1 == null || ary2 == null || !Array.isArray(ary1) || !Array.isArray(ary2)) {
            if (ary1 == null && ary2 == null) {
                return { added: [], removed: [] };
            }
            if ((ary1 != null && !Array.isArray(ary1)) || (ary2 != null && !Array.isArray(ary2)) || ary1 === undefined || ary2 === undefined) {
                throw new Error("incorrect usage ([" + ary1 + "], [" + ary2 + "]), expected (Array ary1, Array ary2)");
            }
            if (ary1 == null && ary2 != null) {
                return {
                    added: ary2.slice(),
                    removed: []
                };
            }
            if (ary1 != null && ary2 == null) {
                return {
                    added: [],
                    removed: ary1.slice()
                };
            }
        }
        var added = [];
        var removed = [];
        var ary2Used = [];
        var ary1Size = ary1.length;
        var ary2Size = ary2.length;
        for (var i = 0; i < ary1Size; i++) {
            var elem1 = ary1[i];
            var matchingIdx2 = -1;
            for (var ii = 0; ii < ary2Size; ii++) {
                if (ary2Used[ii] !== true && elem1 === ary2[ii]) {
                    matchingIdx2 = ii;
                    break;
                }
            }
            if (matchingIdx2 === -1) {
                removed.push(ary1[i]);
            }
            else {
                ary2Used[matchingIdx2] = true;
            }
        }
        for (var ii = 0; ii < ary2Size; ii++) {
            if (!ary2Used[ii]) {
                added.push(ary2[ii]);
            }
        }
        return {
            added: added,
            removed: removed
        };
    }
    Arrays.diff = diff;
    function fastRemove(ary, value) {
        var aryLen = ary != null ? ary.length : 0;
        if (aryLen === 0) {
            return ary;
        }
        for (var i = 0; i < aryLen; i++) {
            if (ary[i] === value) {
                ary[i] = ary[aryLen - 1];
                ary.pop();
                break;
            }
        }
        return ary;
    }
    Arrays.fastRemove = fastRemove;
    function fastRemoveIndex(ary, index) {
        var aryLen = ary != null ? ary.length : 0;
        if (aryLen === 0) {
            return ary;
        }
        if (aryLen > 1) {
            ary[index] = ary[aryLen - 1];
        }
        ary.pop();
        return ary;
    }
    Arrays.fastRemoveIndex = fastRemoveIndex;
    function filterSplit(ary, filterFunc) {
        if (ary == null) {
            return toBiFilterResult([], [], []);
        }
        if (typeof filterFunc !== "function") {
            throw new Error("incorrect parameter 'filterFunc', must be a 'function(value: T, index: number, array: T[]): boolean'");
        }
        var matching = [];
        var notMatching = [];
        for (var i = 0, size = ary.length; i < size; i++) {
            var value = ary[i];
            if (filterFunc(value, i, ary)) {
                matching.push(value);
            }
            else {
                notMatching.push(value);
            }
        }
        return toBiFilterResult(ary, matching, notMatching);
    }
    Arrays.filterSplit = filterSplit;
    function toBiFilterResult(all, matching, notMatching) {
        return {
            all: all,
            matching: matching,
            notMatching: notMatching
        };
    }
    function findAllProp(ary, propName, propValue) {
        if (ary == null || propName == null || propValue === undefined) {
            return null;
        }
        var res = [];
        for (var i = 0, size = ary.length; i < size; i++) {
            if (ary[i][propName] === propValue) {
                res.push(ary[i]);
            }
        }
        return res;
    }
    Arrays.findAllProp = findAllProp;
    function findProp(ary, propName, propValue) {
        if (ary == null || propName == null || propValue === undefined) {
            return null;
        }
        for (var i = 0, size = ary.length; i < size; i++) {
            if (ary[i][propName] === propValue) {
                return ary[i];
            }
        }
        return null;
    }
    Arrays.findProp = findProp;
    function findOne(ary, filter, ensureOne) {
        if (ensureOne === void 0) { ensureOne = false; }
        if (ary == null || filter == null) {
            return null;
        }
        var result = null;
        var resultCount = 0;
        for (var i = 0, size = ary.length; i < size; i++) {
            if (filter(ary[i], i, ary) === true) {
                if (resultCount === 0) {
                    result = ary[i];
                    if (!ensureOne) {
                        resultCount++;
                        break;
                    }
                }
                resultCount++;
                throw new Error("found multiple results, expected to find one");
            }
        }
        if (resultCount === 1) {
            return result;
        }
        return null;
    }
    Arrays.findOne = findOne;
    function findOneByProp(ary, searchPropName, searchPropValue, ensureOne) {
        if (ensureOne === void 0) { ensureOne = false; }
        if (ary == null || searchPropName == null) {
            return null;
        }
        var result = null;
        var resultCount = 0;
        for (var i = 0, size = ary.length; i < size; i++) {
            var obj = ary[i];
            if (obj != null && obj[searchPropName] === searchPropValue) {
                if (resultCount === 0) {
                    result = obj;
                    if (!ensureOne) {
                        resultCount++;
                        break;
                    }
                }
                resultCount++;
                throw new Error("found multiple results for '" + searchPropName + "'='" + searchPropValue + "', expected to find one");
            }
        }
        if (resultCount === 1) {
            return result;
        }
        return null;
    }
    Arrays.findOneByProp = findOneByProp;
    function first(ary, filterFunc) {
        if (ary == null) {
            return null;
        }
        if (typeof filterFunc !== "function") {
            throw new Error("incorrect parameter 'filterFunc', must be a 'function(value, index, array): boolean'");
        }
        for (var i = 0, size = ary.length; i < size; i++) {
            if (filterFunc(ary[i], i, ary) == true) {
                return ary[i];
            }
        }
        return null;
    }
    Arrays.first = first;
    function getAllProp(ary, propName) {
        if (ary == null || propName == null) {
            return [];
        }
        var results = new Array(ary.length);
        for (var i = ary.length - 1; i > -1; i--) {
            results[i] = ary[i][propName];
        }
        return results;
    }
    Arrays.getAllProp = getAllProp;
    function hasItems(ary) {
        return ary != null && ary.length > 0;
    }
    Arrays.hasItems = hasItems;
    function indexOfProp(ary, propName, propValue) {
        if (ary == null || propName == null || propValue === undefined) {
            return -1;
        }
        for (var i = 0, size = ary.length; i < size; i++) {
            if (ary[i][propName] === propValue) {
                return i;
            }
        }
        return -1;
    }
    Arrays.indexOfProp = indexOfProp;
    function last(ary, filterFunc) {
        if (ary == null) {
            return null;
        }
        if (typeof filterFunc !== "function") {
            throw new Error("incorrect parameter 'filterFunc', must be a 'function(value, index, array): boolean'");
        }
        for (var i = ary.length - 1; i > -1; i--) {
            if (filterFunc(ary[i], i, ary) == true) {
                return ary[i];
            }
        }
        return null;
    }
    Arrays.last = last;
    function lastIndexOfProp(ary, propName, propValue) {
        if (ary == null || propName == null || propValue === undefined) {
            return -1;
        }
        for (var i = ary.length - 1; i > -1; i--) {
            if (ary[i][propName] === propValue) {
                return i;
            }
        }
        return -1;
    }
    Arrays.lastIndexOfProp = lastIndexOfProp;
    function looseDiff(ary1, ary2) {
        var diffRes = diff(ary1, ary2);
        var looseDiff = Array.prototype.concat.apply(diffRes.added, diffRes.removed);
        return looseDiff;
    }
    Arrays.looseDiff = looseDiff;
    function looseEqual(ary1, ary2) {
        if (ary1 == null || ary2 == null || !Array.isArray(ary1) || !Array.isArray(ary2)) {
            if (ary1 == null && ary2 == null) {
                return true;
            }
            if ((ary1 != null && !Array.isArray(ary1)) || (ary2 != null && !Array.isArray(ary2)) || ary1 === undefined || ary2 === undefined) {
                throw new Error("incorrect usage ([" + ary1 + "], [" + ary2 + "]), " + "expected (Array ary1, Array ary2)");
            }
            if ((ary1 == null && ary2 != null) || (ary1 != null && ary2 == null)) {
                return false;
            }
        }
        if (ary1.length !== ary2.length) {
            return false;
        }
        var matchingCount = 0;
        for (var i = ary1.length - 1; i > -1; i--) {
            if (ary2.indexOf(ary1[i]) === -1) {
                return false;
            }
            matchingCount++;
        }
        return matchingCount == ary2.length;
    }
    Arrays.looseEqual = looseEqual;
    function mapFilter(ary, mapFilterFunc) {
        if (ary == null) {
            return [];
        }
        if (typeof mapFilterFunc !== "function") {
            throw new Error("incorrect parameter 'mapFilterFunc', must be a 'function(value, dstOut: { value; isValid }): void'");
        }
        var results = [];
        var dstOut = { value: null, isValid: false };
        for (var i = 0, size = ary.length; i < size; i++) {
            dstOut.isValid = false;
            dstOut.value = null;
            var inputVal = ary[i];
            mapFilterFunc(inputVal, dstOut);
            if (dstOut.isValid === true) {
                results.push(dstOut.value || inputVal);
            }
        }
        return results;
    }
    Arrays.mapFilter = mapFilter;
    function mapFilterNotNull(ary, mapFunc) {
        if (ary == null) {
            return [];
        }
        if (typeof mapFunc !== "function") {
            throw new Error("incorrect parameter 'mapFilterFunc', must be a 'function(value): Object'");
        }
        var results = [];
        for (var i = 0, size = ary.length; i < size; i++) {
            var res = mapFunc(ary[i], i, ary);
            if (res != null) {
                results.push(res);
            }
        }
        return results;
    }
    Arrays.mapFilterNotNull = mapFilterNotNull;
    function removeValue(ary, value) {
        var idx = ary.indexOf(value);
        if (idx > -1) {
            removeIndex(ary, idx);
        }
        return idx;
    }
    Arrays.removeValue = removeValue;
    function removeIndex(ary, index) {
        if (ary == null) {
            return ary;
        }
        var size = ary.length;
        if (ary.length < 1 || index < 0 || index >= ary.length) {
            return ary;
        }
        for (var i = index + 1; i < size; i++) {
            ary[i - 1] = ary[i];
        }
        ary[size - 1] = null;
        ary.length = size - 1;
        return ary;
    }
    Arrays.removeIndex = removeIndex;
    function setAllProp(ary, propName, propValue) {
        if (ary == null || propName == null) {
            return;
        }
        for (var i = ary.length - 1; i > -1; i--) {
            ary[i][propName] = propValue;
        }
        return;
    }
    Arrays.setAllProp = setAllProp;
    function sortNumeric(ary, descending) {
        if (descending === void 0) { descending = false; }
        if (descending === false) {
            ary.sort(function (a, b) { return a - b; });
        }
        else {
            ary.sort(function (a, b) { return b - a; });
        }
        return ary;
    }
    Arrays.sortNumeric = sortNumeric;
    function splice(origAry, insertAry, index, deleteCount) {
        if (deleteCount === void 0) { deleteCount = 0; }
        if (origAry == null || insertAry == null || !Array.isArray(origAry) || !Array.isArray(insertAry) || index === undefined) {
            if (origAry == null && insertAry == null) {
                return null;
            }
            if ((origAry != null && !Array.isArray(origAry)) || (insertAry != null && !Array.isArray(insertAry)) || origAry === undefined || insertAry === undefined) {
                throw new Error("incorrect usage ([" + origAry + "], [" + insertAry + "], " + index + ", " + (deleteCount || 0) + "), " + "expected (Array origAry, Array insertAry, Integer index, Integer deleteCount)");
            }
            if ((origAry == null && insertAry != null) || (origAry != null && insertAry == null)) {
                return Array.prototype.push.apply([], origAry || insertAry);
            }
        }
        if (insertAry.length === 0) {
            return origAry;
        }
        var tmp;
        if (index === origAry.length && deleteCount === 0) {
            tmp = origAry;
            Array.prototype.push.apply(tmp, insertAry);
        }
        else {
            tmp = [];
            for (var i = 0; i < index; i++) {
                tmp.push(origAry[i]);
            }
            Array.prototype.push.apply(tmp, insertAry);
            for (var i = index + deleteCount, size = origAry.length; i < size; i++) {
                tmp.push(origAry[i]);
            }
        }
        return tmp;
    }
    Arrays.splice = splice;
    function union(ary1, ary2) {
        if (ary1 == null || ary2 == null) {
            if (ary1 == null && ary2 != null) {
                return ary2.slice();
            }
            else if (ary1 != null && ary2 == null) {
                return ary1.slice();
            }
            else {
                return [];
            }
        }
        var results = [];
        for (var i = 0, size = ary1.length; i < size; i++) {
            var idx = ary2.indexOf(ary1[i]);
            if (idx > -1) {
                results.push(ary1[i]);
            }
        }
        return results;
    }
    Arrays.union = union;
    function unique(ary) {
        if (ary == null || ary.length < 2) {
            return ary || null;
        }
        ary = ary.sort();
        var res = [ary[0]];
        for (var i = 1, size = ary.length; i < size; i++) {
            if (res.indexOf(ary[i]) === -1) {
                res.push(ary[i]);
            }
        }
        return res;
    }
    Arrays.unique = unique;
})(Arrays || (Arrays = {}));
module.exports = Arrays;

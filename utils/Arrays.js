"use strict";
var Arrays;
(function (Arrays) {
    Arrays.EMPTY_ARRAY = Object.freeze([]);
    /** Add all of the values in 'toAdd' to the 'src' array
     * @returns the source array
     */
    function addAll(src, toAdd) {
        if (toAdd != null && toAdd.length > 0) {
            Array.prototype.push.apply(src, toAdd);
        }
        return src;
    }
    Arrays.addAll = addAll;
    /** Transform and add the elements from one array to another
     * @param src the array to add elements to
     * @param toAdd the elements to transform and add
     * @param transformer a function to transform the 'toAdd' values before adding them to 'src'
     */
    function addAllTransform(src, toAdd, transformer) {
        for (var i = 0, size = toAdd.length; i < size; i++) {
            src.push(transformer(toAdd[i]));
        }
        return src;
    }
    Arrays.addAllTransform = addAllTransform;
    /** Given an array or an object, return the array, or a new array containing the object as it's only element
     * @param data the object or array
     * @param copyToNewAry optional (default: false) if the data is an array, copy the items into a new array
     */
    function asArray(data, copyToNewAry) {
        if (Array.isArray(data)) {
            return copyToNewAry ? data.slice() : data;
        }
        else {
            return [data];
        }
    }
    Arrays.asArray = asArray;
    /** Check if an array is not null and has any items
     * @param ary the array to check
     * @returns true if the array is not null and has a length greater than 0
     */
    function hasAny(ary) {
        return ary != null && ary.length > 0;
    }
    Arrays.hasAny = hasAny;
    /** Given an array or an object, return true if it is an object or an array containing one element, false if the array is empty or contains more than 1 element
     * @param data the object or array
     */
    function isOneItem(data) {
        return Array.isArray(data) ? data.length === 1 : true;
    }
    Arrays.isOneItem = isOneItem;
    /** Given an array or an object, return the object or the first element if the array contains 1 element, else return null if the array is empty or contains more than 1 element
     * @param data the object or array
     */
    function getIfOneItem(data) {
        return Array.isArray(data) ? (data.length === 1 ? data[0] : null) : data;
    }
    Arrays.getIfOneItem = getIfOneItem;
    /** Perform a binary search of a property in an array of values and return the index.
     * For example: Arrays.binarySearch([{key: 3}, {key: 10}, {key: 14}, {key: 15}], "key", 14)
     * returns: 2 indicating that the 3rd array element matches
     *
     * For example: Arrays.binarySearch([{key: 3}, {key: 10}, {key: 14}, {key: 15}], "id", 13)
     * returns: -3 indicating that no matching element was found,
     * but if a matching element did exist in the array, it would be at index 3
     */
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
    /** Remove all values from an array
     */
    function clear(ary) {
        if (ary != null) {
            ary.length = 0;
        }
    }
    Arrays.clear = clear;
    /** Returns a new array containing the elements from 'ary1' followed by the elements from 'ary2'
     */
    function concat(ary1, ary2) {
        if (ary1 != null && ary2 != null) {
            return ary1.concat(ary2);
        }
        else {
            return (ary1 != null ? ary1.slice() : (ary2 != null ? ary2.slice() : []));
        }
    }
    Arrays.concat = concat;
    /** Check whether all of the values in the second array are contained in the first array
     * @param ary the array of values
     * @param searchFor the values to search for
     * @returns true if all of 'searchFor' values are contained in 'ary'
     */
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
    /** Check whether any of the values in the second array are contained in the first array
     * @param ary the array of values
     * @param searchFor the values to search for
     * @returns true if any of 'searchFor' values are contained in 'ary'
     */
    function containsAny(ary, searchFor) {
        if (ary == null || searchFor == null) {
            return false;
        }
        for (var i = 0, size = searchFor.length; i < size; i++) {
            if (ary.indexOf(searchFor[i]) > -1) {
                return true;
            }
        }
        return false;
    }
    Arrays.containsAny = containsAny;
    /** Count the number of elements in an array that match a filter
     * @param ary the array of values
     * @param filter the filter to use on 'ary'
     * @returns the number of 'ary' elements that return a truthy value when passed through the 'filter' function
     */
    function count(ary, filter) {
        var res = 0;
        for (var i = 0, size = ary.length; i < size; i++) {
            if (filter(ary[i], i, ary)) {
                res++;
            }
        }
        return res;
    }
    Arrays.count = count;
    /** Get the difference between two arrays. Also known as the symmetric difference (https://en.wikipedia.org/wiki/Symmetric_difference).
     * NOTE: duplicate values in either array are considered unique.  If there are two of the same values in 'ary1', then 'ary2' must contain two of those values to cancel out both of the values from 'ary1'.
     * For example: Arrays.diff([1, 2, 3], [2, 4])
     * returns: [4, 1, 3]
     * which represents the differences between 'ary1' and 'ary2' (note: the returned array order is undefined)
     *
     * @param ary1 the first array to compare
     * @param ary2 the second array to compare
     * @returns of values that exist in only one of the input arrays
     * @see diff()
     */
    function diff(ary1, ary2, equal) {
        var diffRes = (equal != null ? diffPartsCustomEquality(ary1, ary2, equal) : diffParts(ary1, ary2));
        var looseDiff = Array.prototype.concat.apply(diffRes.added, diffRes.removed);
        return looseDiff;
    }
    Arrays.diff = diff;
    /** Return the difference between two arrays as elements added and removed from the first array.
     * Items which only exist in 'ary1' are called 'removed'.
     * Items which only exist in 'ary2' are called 'added'.
     * NOTE: duplicate values in either array are considered unique.  If there are two of the same values in 'ary1', then 'ary2' must contain two of those values to cancel out both of the values from 'ary1'.
     *
     * For example: Arrays.diffParts([1, 2, 3], [2, 4])
     * returns: { added: [4], removed: [1, 3]},
     * which are the values to add and remove from 'ary1' to convert it to 'ary2'
     *
     * @param ary1 the master/original array to base differences on
     * @param ary2 the branch/new array to find differences in
     * @returns with 'added' and 'removed' arrays of values from 'ary1' and 'ary2'
     * @see looseDiff()
     */
    function diffParts(ary1, ary2) {
        if (ary1 == null || ary2 == null || !Array.isArray(ary1) || !Array.isArray(ary2)) {
            if (ary1 == null && ary2 == null) {
                return { added: [], removed: [] };
            }
            // else, incorrect arguments
            if ((ary1 != null && !Array.isArray(ary1)) || (ary2 != null && !Array.isArray(ary2)) || ary1 === undefined || ary2 === undefined) {
                throw new Error("incorrect usage ([" + ary1 + "], [" + ary2 + "]), expected (Array ary1, Array ary2)");
            }
            // if one array is null and the other is not, the difference is just the non-null array's values
            if (ary1 == null && ary2 != null) {
                return {
                    added: ary2.slice(),
                    removed: []
                };
            }
            else /*if (ary1 != null && ary2 == null)*/ {
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
        // keep track of each element in 'ary2' that does not exist in 'ary1'
        for (var i = 0; i < ary1Size; i++) {
            var elem1 = ary1[i];
            var matchingIdx2 = -1;
            for (var ii = 0; ii < ary2Size; ii++) {
                if (ary2Used[ii] !== true && elem1 === ary2[ii]) {
                    matchingIdx2 = ii;
                    break;
                }
            }
            // items that only exist in 'ary1' are 'removed'
            if (matchingIdx2 === -1) {
                removed.push(ary1[i]);
            }
            else {
                ary2Used[matchingIdx2] = true;
            }
        }
        // items that only exist in 'ary2' are 'added'
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
    Arrays.diffParts = diffParts;
    /** Return the difference between two arrays as elements added and removed from the first array.
     * Items which only exist in 'ary1' are called 'removed'.
     * Items which only exist in 'ary2' are called 'added'.
     * NOTE: duplicate values in either array are considered unique.  If there are two of the same values in 'ary1', then 'ary2' must contain two of those values to cancel out both of the values from 'ary1'.
     *
     * For example: Arrays.diffParts([1, 2, 3], [2, 4])
     * returns: { added: [4], removed: [1, 3]},
     * which are the values to add and remove from 'ary1' to convert it to 'ary2'
     *
     * @param ary1 the master/original array to base differences on
     * @param ary2 the branch/new array to find differences in
     * @returns with 'added' and 'removed' arrays of values from 'ary1' and 'ary2'
     * @see looseDiff()
     */
    function diffPartsCustomEquality(ary1, ary2, equal) {
        if (ary1 == null || ary2 == null || !Array.isArray(ary1) || !Array.isArray(ary2)) {
            if (ary1 == null && ary2 == null) {
                return { added: [], removed: [] };
            }
            // else, incorrect arguments
            if ((ary1 != null && !Array.isArray(ary1)) || (ary2 != null && !Array.isArray(ary2)) || ary1 === undefined || ary2 === undefined) {
                throw new Error("incorrect usage ([" + ary1 + "], [" + ary2 + "]), expected (Array ary1, Array ary2)");
            }
            // if one array is null and the other is not, the difference is just the non-null array's values
            if (ary1 == null && ary2 != null) {
                return {
                    added: ary2.slice(),
                    removed: []
                };
            }
            else /*if (ary1 != null && ary2 == null)*/ {
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
        // keep track of each element in 'ary2' that does not exist in 'ary1'
        for (var i = 0; i < ary1Size; i++) {
            var elem1 = ary1[i];
            var matchingIdx2 = -1;
            for (var ii = 0; ii < ary2Size; ii++) {
                if (ary2Used[ii] !== true && equal(elem1, ary2[ii])) {
                    matchingIdx2 = ii;
                    break;
                }
            }
            // items that only exist in 'ary1' are 'removed'
            if (matchingIdx2 === -1) {
                removed.push(ary1[i]);
            }
            else {
                ary2Used[matchingIdx2] = true;
            }
        }
        // items that only exist in 'ary2' are 'added'
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
    Arrays.diffPartsCustomEquality = diffPartsCustomEquality;
    function distinct(ary, propName) {
        if (ary == null || ary.length < 2) {
            return ary || null;
        }
        var res = [ary[0]];
        if (propName == null) {
            for (var i = 1, size = ary.length; i < size; i++) {
                if (res.indexOf(ary[i]) === -1) {
                    res.push(ary[i]);
                }
            }
        }
        else {
            for (var i = 1, size = ary.length; i < size; i++) {
                if (Arrays.indexOfProp(res, propName, ary[i][propName]) === -1) {
                    res.push(ary[i]);
                }
            }
        }
        return res;
    }
    Arrays.distinct = distinct;
    function fastRemove(ary, value) {
        var aryLen = 0;
        if (ary == null || (aryLen = ary.length) === 0) {
            return ary;
        }
        var idx = ary.indexOf(value);
        if (idx > -1) {
            ary[idx] = ary[aryLen - 1];
            ary.pop();
        }
        return ary;
    }
    Arrays.fastRemove = fastRemove;
    function fastRemoveIndex(ary, index) {
        var aryLen = 0;
        if (ary == null || (aryLen = ary.length) === 0) {
            return ary;
        }
        if (aryLen > 1) {
            ary[index] = ary[aryLen - 1];
        }
        ary.pop();
        return ary;
    }
    Arrays.fastRemoveIndex = fastRemoveIndex;
    /** Split an array of values into matching and non-matching arrays using a filter
     * For example: Arrays.filterSplit([1, 2, 3, 4, 5], function (value, idx, ary) { return value % 2 == 0; })
     * returns: { all: [1, 2, 3, 4, 5], matching: [2, 4], notMatching: [1, 3, 5] }
     *
     * @param ary the array of values to filter
     * @param filterFunc the function to filter the values,
     * true stores items in the returned 'matching' property,
     * false stores items in the returned 'notMatching' property
     * @returns a filter result object contains the original array 'all' and arrays of 'matching' and 'notMatching' items
     */
    function filterSplit(ary, filterFunc) {
        if (ary == null) {
            return toBiFilterResult([], [], []);
        }
        if (typeof filterFunc !== "function") {
            throw new Error("incorrect parameter 'filterFunc', must be a 'function(value: E, index: number, array: E[]): boolean'");
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
    // convert an array of items and arrays containing matching and non-matching items to an 'BiFilterResult' object
    function toBiFilterResult(all, matching, notMatching) {
        return {
            all: all,
            matching: matching,
            notMatching: notMatching
        };
    }
    /** Search for objects in an array containing a property matching a given input property.
     * For example: Arrays.findAllProp([ {name: "billy", value: 5}, {name: "sam", value: 5}, {name: "overhill", value: 3} ], "value", 5)
     * returns: {name: "billy", value: 5}, {name: "sam", value: 5}
     * because the matching object has a property "value" with a value of 5
     *
     * @param ary the array to search
     * @param propName the name of the property to search for on each object
     * @param propValue the property value to compare
     * @returns an array of objects containing properties named 'propName' with values equal to 'propValue',
     * returns a new empty array if no matching object was found
     */
    function findMatchingProps(ary, propName, propValue) {
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
    Arrays.findMatchingProps = findMatchingProps;
    /** Return the first matching value in an array using a filter function, null if no matches.
     * Optional: throw an exception if more than one result is found.
     * For example: Arrays.first([ {key: 27, value: "A"}, {key: 46, value: "B"}, {key: 84, value: "C"}, {key: 84, value: "D"} ], function (obj) { return obj.key === 84; })
     * returns: {key: 84, value: "C"}
     *
     * @param ary the array of values to search
     * @param filter the filter to apply to 'ary'
     * @returns the first (lowest index) value passed to 'filter' from 'ary' that returns true, or null if a match cannot be found
     */
    function first(ary, filter, ensureOne) {
        if (ensureOne === void 0) { ensureOne = false; }
        var idx = firstIndex(ary, filter, ensureOne);
        return idx < 0 ? null : ary[idx];
    }
    Arrays.first = first;
    /** Return the index of the first matching value in an array using a filter function, null if no matches.
     * @see #first()
     */
    function firstIndex(ary, filter, ensureOne) {
        if (ensureOne === void 0) { ensureOne = false; }
        if (ary == null || filter == null) {
            return -1;
        }
        var resultIdx = -1;
        var resultCount = 0;
        for (var i = 0, size = ary.length; i < size; i++) {
            if (filter(ary[i], i, ary) === true) {
                if (resultCount === 0) {
                    resultIdx = i;
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
            return resultIdx;
        }
        return -1;
    }
    Arrays.firstIndex = firstIndex;
    function last(ary, filterFunc) {
        var idx = lastIndex(ary, filterFunc);
        return idx < 0 ? null : ary[idx];
    }
    Arrays.last = last;
    /** Return the last value in an array that matches a filter, null if no matches
     * @param ary the array of values to search
     * @param filterFunc the filter to apply
     * @returns the highest-index value passed to 'filterFunc' from 'ary' that returns true, null if no value returns true
     */
    function lastIndex(ary, filterFunc) {
        if (ary == null) {
            return -1;
        }
        for (var i = ary.length - 1; i > -1; i--) {
            if (filterFunc(ary[i], i, ary) == true) {
                return i;
            }
        }
        return -1;
    }
    Arrays.lastIndex = lastIndex;
    /** Search for an object in an array containing a property matching a given input property.
     * Optional: throw an exception if more than one result is found.
     * For example: Arrays.firstProp([ {name: "billy", value: 4}, {name: "sam", value: 5}, {name: "will", value: 5} ], "value", 5)
     * returns: {name: "sam", value: 5}
     * Or example: Arrays.firstProp([ {name: "billy", value: 4}, {name: "sam", value: 4}, {name: "will", value: 5} ], "value", 5, true)
     * throws an error because the value appears more than once and the 'ensureOne' parameter = true
     *
     * @param ary the array of values to search
     * @param propName the name of the property  to search for on each object
     * @param propValue the property value to compare
     * @returns the first (lowest index) matching value from the input array, or null if a result cannot be found
     */
    function firstProp(ary, propName, propValue, ensureOne) {
        if (ensureOne === void 0) { ensureOne = false; }
        if (ary == null || propName == null) {
            return null;
        }
        var result = null;
        var resultCount = 0;
        for (var i = 0, size = ary.length; i < size; i++) {
            var obj = ary[i];
            if (obj != null && obj[propName] === propValue) {
                if (resultCount === 0) {
                    result = obj;
                    if (!ensureOne) {
                        resultCount++;
                        break;
                    }
                }
                resultCount++;
                throw new Error("found multiple results for '" + propName + "'='" + propValue + "', expected to find one");
            }
        }
        if (resultCount === 1) {
            return result;
        }
        return null;
    }
    Arrays.firstProp = firstProp;
    /** Get a property from each object in an array of objects
     * @param ary the array of objects
     * @param propName the name of the property to get
     * @param distinct optional boolean which indicates whether unique results only should be returned
     * @returns an array of the specified property from each object in 'ary'
     */
    function pluck(ary, propName, distinct) {
        if (ary == null || propName == null) {
            return [];
        }
        if (!distinct) {
            var results = new Array(ary.length);
            for (var i = ary.length - 1; i > -1; i--) {
                results[i] = ary[i][propName];
            }
            return results;
        }
        else {
            var results = [];
            for (var i = 0, size = ary.length; i < size; i++) {
                var value = ary[i][propName];
                if (results.indexOf(value) < 0) {
                    results.push(value);
                }
            }
            return results;
        }
    }
    Arrays.pluck = pluck;
    /** Search for the index of an object with a specified property in an array.
     * For example: Arrays.indexOfPropValue([ {name: "billy", value: 12}, {name: "sam", value: 12} ], "value", 12)
     * returns: 0
     * because the first object with the property "value" with a value of 12 was at index 0
     *
     * @param ary the array to search
     * @param propName the name of the property to search for on each object
     * @param propValue the property value to compare
     * @param offset optional, 'ary' offset at which to start search, supports negative offset same as 'Array<T>.indexOf(T, number)'
     * @returns the array index of an object with a matching property, -1 if no matching object was found
     */
    function indexOfProp(ary, propName, propValue, offset) {
        if (ary == null || propName == null || propValue === undefined) {
            return -1;
        }
        for (var size = ary.length, i = offset < 0 ? (size + offset > 0 ? size + offset : 0) : (offset || 0); i < size; i++) {
            if (ary[i][propName] === propValue) {
                return i;
            }
        }
        return -1;
    }
    Arrays.indexOfProp = indexOfProp;
    /** Search for the last index of an object with a specified property in an array
     * For example: Arrays.lastIndexOfPropValue([ {text: "john's bid", value: 12}, {text: "test bid", value: 12} ], "value", 12)
     * returns: 1
     * because the last object with the property "value" with a value of 12 was at index 1
     *
     * @param ary the array to search
     * @param propName the name of the property to search for on each object
     * @param propValue the property value to compare
     * @returns the array index of an object with a matching property, -1 if no matching object was found
     */
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
    /** Check if two arrays are equal, element by element
     * For example: Arrays.equal(["A", 23, true], ["A", 23, true])
     * returns: true
     * Or example: Arrays.equal(["A", 23, true], ["A", 13])
     * returns: false
     *
     * @param ary1 the first array to compare
     * @param ary2 the second array to compare
     */
    function equal(ary1, ary2) {
        if (ary1 == null || ary2 == null || ary1.length !== ary2.length) {
            return false;
        }
        for (var i = 0, size = ary1.length; i < size; i++) {
            if (ary1[i] !== ary2[i]) {
                return false;
            }
        }
        return true;
    }
    Arrays.equal = equal;
    /** Check whether two arrays are equal, ignoring the order of the elements in each array.
     * elements are compared using strict (i.e. '===') equality.
     * For example: Arrays.looseEqual([26, "Alpha", 5], [5, 26, "Alpha"])
     * returns: true
     * Or example: Arrays.looseEqual([34, "A", "QA"], [7, 34, "A"])
     * returns: false
     *
     * @param ary1 the first array to compare
     * @param ary2 the second array to compare
     * @returns true if both arrays contain the same elements in any order, or if both arrays are null.
     * False if one or more elements differ between the two arrays
     */
    function looseEqual(ary1, ary2) {
        if (ary1 == null || ary2 == null || !Array.isArray(ary1) || !Array.isArray(ary2)) {
            if (ary1 == null && ary2 == null) {
                return true;
            }
            if ((ary1 != null && !Array.isArray(ary1)) || (ary2 != null && !Array.isArray(ary2)) || ary1 === undefined || ary2 === undefined) {
                throw new Error("incorrect usage ([" + ary1 + "], [" + ary2 + "]), " + "expected (Array ary1, Array ary2)");
            }
            if (ary1 == null || ary2 == null) {
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
    /** Transforms the elements of an array into a new array
     * For example: Arrays.map([1, 2, 3, 4], (value) => value % 3)
     * returns: [1, 2, 0, 1]
     *
     * @param ary the array to map
     * @returns a new array with each index containing the result of passing the original 'ary' element at that index through the 'mapFunc', or an empty array if the 'ary' is null
     */
    function map(ary, mapFunc) {
        if (ary == null) {
            return [];
        }
        var res = [];
        for (var i = 0, size = ary.length; i < size; i++) {
            res.push(mapFunc(ary[i], i, ary));
        }
        return res;
    }
    Arrays.map = map;
    /** Maps and filters an array in one operation by passing a two field object to the map-filter
     * function as a destination 'out' parameter like C#'s 'out' parameters
     * For example: Arrays.mapFilter([1, 2, 3, 4, 5, 6, 7], function (value, dstOut) { dstOut.isValid = (value % 3 !== 0); })
     * returns: [1, 2, 4, 5, 7]
     * Or example: Arrays.mapFilter(['A', 'B', 'C', 'D', 'C', 'A', 'B'], function (value, dstOut) { dstOut.isValid = (value !== 'D'); dstOut.value = value.toLowerCase(); })
     * returns: ['a', 'b', 'c', 'c', 'a', 'b']
     *
     * @param ary the array AND filter to map
     * @param mapFilterFunc since JS and TS don't have 'out' parameters
     * this function accepts a value and sets 'dstOut.isValid' true if the value is accepted, false if it is filtered out,
     * and stores the mapped result for valid values in 'dstOut.value'.
     * NOTE: if 'dstOut.value' is left null, the input 'value' is stored in the returned array
     * @returns an array of filtered and mapped result values
     */
    function mapFilter(ary, mapFilterFunc) {
        if (ary == null) {
            return [];
        }
        if (typeof mapFilterFunc !== "function") {
            throw new Error("incorrect parameter 'mapFilterFunc', must be a 'function(value, dstOut: { value; isValid }): void'");
        }
        var results = [];
        var nil = {};
        var dstOut = { value: nil, isValid: false };
        for (var i = 0, size = ary.length; i < size; i++) {
            dstOut.isValid = false;
            dstOut.value = nil;
            var inputVal = ary[i];
            mapFilterFunc(inputVal, dstOut);
            if (dstOut.isValid === true) {
                results.push(dstOut.value !== nil ? dstOut.value : inputVal);
            }
        }
        return results;
    }
    Arrays.mapFilter = mapFilter;
    /** Like #mapFilter() except null return values are filtered out instead of using an two parameter 'out' style object with an 'isValid' flag
     * @param the array of values to map-filter
     * @param mapFunc the Array#map() style function to transform input values,
     * null returned values are not stored in the returned array, allowing the function to filter
     * @returns an array of non-null mapped result values
     */
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
    function removeAll(ary, toRemove, fastRemove) {
        if (ary == null || toRemove == null) {
            return ary;
        }
        var idx;
        if (fastRemove) {
            // remove all matches by swapping them to the end of the array and shrinking the array
            for (var i = 0, size = toRemove.length; i < size; i++) {
                if ((idx = ary.indexOf(toRemove[i])) > -1) {
                    Arrays.fastRemoveIndex(ary, idx);
                }
            }
        }
        else {
            // find the indices to remove
            var indicesToSkip = [];
            for (var i = 0, size = toRemove.length; i < size; i++) {
                if ((idx = ary.indexOf(toRemove[i])) > -1) {
                    indicesToSkip.push(idx);
                }
            }
            // rebuild the array without the items to remove
            if (indicesToSkip.length > 0) {
                var newI = 0;
                var nextSkipIndexI = 0;
                var nextSkipIndex = indicesToSkip[nextSkipIndexI];
                for (var i = 0, size = ary.length; i < size; i++) {
                    if (i === nextSkipIndex) {
                        nextSkipIndexI++;
                        nextSkipIndex = indicesToSkip[nextSkipIndexI];
                    }
                    else {
                        ary[newI] = ary[i];
                        newI++;
                    }
                }
                ary.length = ary.length - indicesToSkip.length;
            }
        }
        return ary;
    }
    Arrays.removeAll = removeAll;
    /** Remove the first instance of a matching value from an array
     * @returns the removed index or -1 if the value could not be found
     */
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
            return null;
        }
        var size = ary.length;
        if (size < 1 || index < 0 || index >= size) {
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
    /** Set a property on every object in an array.
     * Useful for clearing a specific property to false or null.
     * @param ary the array of objects
     * @param propName the name of the property to set
     * @param propValue the value to assigned to each object's 'propName' property
     */
    function setAllProp(ary, propName, propValue) {
        if (ary == null || propName == null) {
            return;
        }
        for (var i = ary.length - 1; i > -1; i--) {
            ary[i][propName] = propValue;
        }
    }
    Arrays.setAllProp = setAllProp;
    /**
     * @returns the input array, sorted in numeric order (ascending by default, with second parameter flag to sort descending)
     */
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
    /** Create an array containing the contents of two arrays.
     * For example: Arrays.spliceArray([0, 1, 1, 5], [10, 15, 20], 2, 1)
     * returns: [0, 1, 10, 15, 20, 5]
     *
     * @param origAry the initial array to copy
     * @param insertAry the array to insert into 'origAry'
     * @param index the 'origAry' index at which to insert the elements from 'insertAry'
     * @param deleteCount optional (default: 0) the number of elements to not copy from 'origAry' starting at 'index'
     * @returns the 'origAry' or a new array containing the contents of 'origAry' and 'insertAry'
     */
    function splice(origAry, insertAry, index, deleteCount, copyToNewAry) {
        if (deleteCount === void 0) { deleteCount = 0; }
        if (origAry == null) {
            if (insertAry == null) {
                return [];
            }
            else {
                return insertAry.slice(0);
            }
        }
        if ((origAry != null && !Array.isArray(origAry)) || (insertAry != null && !Array.isArray(insertAry))) {
            throw new Error("incorrect usage ([" + origAry + "], [" + insertAry + "], " + index + ", " + (deleteCount || 0) + "), " + "expected (Array, Array, Integer[, Integer])");
        }
        if (deleteCount === 0 && (insertAry == null || insertAry.length === 0)) {
            return (copyToNewAry ? origAry.slice() : origAry);
        }
        var tmp;
        // add to the end of the array
        if (index === origAry.length && deleteCount === 0) {
            tmp = (copyToNewAry ? origAry.slice() : origAry);
            if (insertAry != null && insertAry.length > 0) {
                Array.prototype.push.apply(tmp, insertAry);
            }
        }
        else if (index === 0 && deleteCount === 0) {
            tmp = (copyToNewAry ? origAry.slice() : origAry);
            if (insertAry != null && insertAry.length > 0) {
                Array.prototype.unshift.apply(tmp, insertAry);
            }
        }
        else {
            // copy up to the index to insert, then insert the array, and copying the remaining portion
            tmp = origAry.slice(0, index);
            if (insertAry != null && insertAry.length > 0) {
                Array.prototype.push.apply(tmp, insertAry);
            }
            for (var i = index + deleteCount, size = origAry.length; i < size; i++) {
                tmp.push(origAry[i]);
            }
        }
        return tmp;
    }
    Arrays.splice = splice;
    /** Swap two elements in an array
     * For example: Arrays.swap(["A", "B", "C", "D"], 1, 2)
     * returns: ["A", "C", "B", "D"]
     *
     * @param ary the array of elements
     * @param i1 the first index of the two indexes to swap
     * @param i2 the second index of the two indexes to swap
     */
    function swap(ary, i1, i2) {
        var tmp = ary[i2];
        ary[i2] = ary[i1];
        ary[i1] = tmp;
        return ary;
    }
    Arrays.swap = swap;
    function toMap(ary, prop) {
        if (ary == null) {
            return {};
        }
        var reduceCall = Array.prototype.reduce.call;
        return reduceCall(ary, function (map, itm) {
            map[itm[prop]] = itm;
            return map;
        }, {});
    }
    Arrays.toMap = toMap;
    /** Return elements that exist in two arrays.
     * For example: Arrays.union([1, 2, 3, 4, 5, "A"], [1, 2, 4, "A"])
     * returns: [1, 2, 4, "A"]
     *
     * @param ary1 the first array
     * @param ary2 the second array
     * @returns an array of shared elements between 'ary1' and 'ary2'
     */
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
    /** Find the maximum value in an array of numbers
     * @param ary the array of numbers to search
     */
    function max(ary) {
        var max = Number.NEGATIVE_INFINITY;
        for (var i = 0, size = ary.length; i < size; i++) {
            max = ary[i] > max ? ary[i] : max;
        }
        return max;
    }
    Arrays.max = max;
    /** Find the maximum value in an array of numbers
     * @param ary the array of numbers to search
     */
    function maxValueIndex(ary) {
        var max = Number.NEGATIVE_INFINITY;
        var maxI = -1;
        for (var i = 0, size = ary.length; i < size; i++) {
            if (ary[i] > max) {
                max = ary[i];
                maxI = i;
            }
        }
        return maxI;
    }
    Arrays.maxValueIndex = maxValueIndex;
    /** Find the minimum value in an array of numbers
     * @param ary the array of numbers to search
     */
    function min(ary) {
        var min = Number.POSITIVE_INFINITY;
        for (var i = 0, size = ary.length; i < size; i++) {
            min = ary[i] < min ? ary[i] : min;
        }
        return min;
    }
    Arrays.min = min;
    /** Find the minimum value in an array of numbers
     * @param ary the array of numbers to search
     */
    function minValueIndex(ary) {
        var min = Number.POSITIVE_INFINITY;
        var minI = -1;
        for (var i = 0, size = ary.length; i < size; i++) {
            if (ary[i] < min) {
                min = ary[i];
                minI = i;
            }
        }
        return minI;
    }
    Arrays.minValueIndex = minValueIndex;
    /** Sum the values of an array
     * @param ary an array of numeric convertable values to sum; null, infinite, and NaN values in the array are treated as zero.
     * If the array is null, 0 is returned.
     * @returns the sum of the values in 'ary'
     */
    function sum(ary, infinityToZero) {
        if (ary == null) {
            return 0;
        }
        var sum = 0;
        for (var i = ary.length - 1; i > -1; i--) {
            var val = ary[i];
            val = (val == null || isNaN(val) || (infinityToZero && (val === Infinity || val === Number.NEGATIVE_INFINITY || val === Number.POSITIVE_INFINITY))) ? 0 : val;
            sum += val;
        }
        return sum;
    }
    Arrays.sum = sum;
})(Arrays || (Arrays = {}));
module.exports = Arrays;

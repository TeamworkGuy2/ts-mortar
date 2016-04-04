"use strict";
var Arrays;
(function (Arrays) {
    Arrays.EMPTY_ARRAY = Object.freeze([]);
    /** Add all of the values in {@code toAdd} to the {@code src} array
     * @return the source array
     */
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
    /** Given an array or an object, return the array, or a new array containing the object as it's only element
     * @param data the object or array
     * @param [copyToNewAry=false] if the data is an array, copy the items into a new array
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
    /** Perform a binary search of a property in an array of values and return the index
     * for example: {@code binarySearch([{key: 3}, {key: 10}, {key: 14}, {key: 15}], "key", 14)}
     * returns: {@code 2} indicating that the 3rd array element matches
     *
     * for example: {@code binarySearch([{key: 3}, {key: 10}, {key: 14}, {key: 15}], "id", 13)}
     * returns: {@code -3} indicating that no matching element was found,
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
    /** Create a copy of an array
     */
    function copy(src) {
        return addAll([], src);
    }
    Arrays.copy = copy;
    /** Returns a new array containing the elements from {@code ary1} followed by the elements from {@code ary2}
     */
    function concat(ary1, ary2) {
        var res = [];
        Array.prototype.push.apply(res, ary1);
        Array.prototype.push.apply(res, ary2);
        return res;
    }
    Arrays.concat = concat;
    /** Check whether all of the values in the second array are contained in the first array
     * @param ary: the array of values
     * @param searchFor: the values to search for
     * @return true if all of {@code searchFor} values are contained in {@code ary}
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
    /** Remove all values from an array
     */
    function clear(ary) {
        if (ary == null) {
            return;
        }
        for (var i = 0, size = ary.length; i < size; i++) {
            ary.pop();
        }
    }
    Arrays.clear = clear;
    /** Return the difference between two arrays as elements added and removed from the first array.
     * For example: {@code ary1 = [1, 2, 3]} and {@code ary2 = [2, 4]}
     * returns: {@code { added: [4], removed: [1, 3]}},
     * which are the values to add and remove from {@code ary1} to convert it to {@code ary2}
     *
     * @param ary1: the master/original array to base differences on
     * @param ary2: the branch/new array to find differences in
     * @return with 'added' and 'removed' arrays of values from {@code ary1} and {@code ary2}
     * @see looseDiff()
     */
    function diff(ary1, ary2) {
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
        // keep track of each element in {@code ary2} that does not exist in {@code ary1}
        for (var i = 0; i < ary1Size; i++) {
            var elem1 = ary1[i];
            var matchingIdx2 = -1;
            for (var ii = 0; ii < ary2Size; ii++) {
                if (ary2Used[ii] !== true && elem1 === ary2[ii]) {
                    matchingIdx2 = ii;
                    break;
                }
            }
            // items that only exist in {@code ary1} are 'removed'
            if (matchingIdx2 === -1) {
                removed.push(ary1[i]);
            }
            else {
                ary2Used[matchingIdx2] = true;
            }
        }
        // items that only exist in {@code ary2} are 'added'
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
    /** Remove the first matching value from an array without creating a new array of splicing the array.
     * NOTE: the returned order of the array's elements is not defined.
     * @param ary: the array of values to search and remove the matching value from
     * @param value: the value to search for and remove
     * @return {@code ary} of values with the first matching instance of {@code value} removed,
     * values are compared based on strict equality '===='
     */
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
    /** Remove a value at a specific index from an array without creating a new array of splicing the array.
     * NOTE: the returned order of the array's elements is not defined.
     * @param ary: the array of values to remove the index value from
     * @param index: the index of the value to remove from the array
     * @return {@code ary} of values with the specified index removed
     */
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
    /** Split an array of values into matching and non-matching arrays using a filter
     * For example:
     * {@code filterSplit([1, 2, 3, 4, 5], function (value, idx, ary) { return value % 2 == 0; })}
     * returns:
     * {@code { all: [1, 2, 3, 4, 5], matching: [2, 4], notMatching: [1, 3, 5] }}
     *
     * @param {E[]} ary: array of input values to filter
     * @param {ArrayFilterFunc} filterFunc: the function to filter the values,
     * true stores items in the returned 'matching' property,
     * false stores items in the returned 'notMatching' property
     * @return a filter result that contains the original 'all' {@code ary} and arrays of 'matching' and 'notMatching' items
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
    // convert an array of items and arrays containing matching and non-matching items to an {@link BiFilterResult} object
    function toBiFilterResult(all, matching, notMatching) {
        return {
            all: all,
            matching: matching,
            notMatching: notMatching
        };
    }
    /** Search for objects in an array containing a property matching a given input property.
     * For example: {@code findAllProp([ {name: "billy", value: 5}, {name: "sam", value: 5}, {name: "overhill", value: 3} ], "value", 5)}
     * returns: {@code {name: "billy", value: 5}, {name: "sam", value: 5} }
     * because the matching object has a property "value" with a value of 5
     *
     * @param ary: the array to search
     * @param propName: the name of the property to search for on each object
     * @param propValue: the property value to compare
     * @return an array of objects containing properties named 'propName' with values equal to 'propValue',
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
     * For example: {@code first([ {key: 27, value: "A"}, {key: 46, value: "B"}, {key: 84, value: "C"}, {key: 84, value: "D"} ], function (obj) { return obj.key === 84; })}
     * returns: {@code {key: 84, value: "C"} }
     *
     * @param ary: the array of values to search
     * @param filter: the filter to apply to {@code ary}
     * @return the first (lowest index) value passed to 'filter' from 'ary' that returns true, or null if a match cannot be found
     */
    function first(ary, filter, ensureOne) {
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
    Arrays.first = first;
    /** Search for an object in an array containing a property matching a given input property.
     * Optional: throw an exception if more than one result is found.
     * For example: {@code firstProp([ {name: "billy", value: 4}, {name: "sam", value: 5}, {name: "will", value: 5} ], "value", 5)}
     * returns: {@code {name: "sam", value: 5} }
     * Or example: {@code firstProp([ {name: "billy", value: 4}, {name: "sam", value: 4}, {name: "will", value: 5} ], "value", 5, true)}
     * throws an error because the value appears more than once and the 'ensureOne' parameter = true
     *
     * @param ary: the array of values to search
     * @param propName: the name of the property  to search for on each object
     * @param propValue: the property value to compare
     * @return the first (lowest index) matching value from the input array, or null if a result cannot be found
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
     * @param ary: the array of objects
     * @param propName: the name of the property to get
     * @return an array of the specified property from each object in {@code ary}
     */
    function pluck(ary, propName) {
        if (ary == null || propName == null) {
            return [];
        }
        var results = new Array(ary.length);
        for (var i = ary.length - 1; i > -1; i--) {
            results[i] = ary[i][propName];
        }
        return results;
    }
    Arrays.pluck = pluck;
    /**
     * @param ary the array to check
     * @return true if the array is not null and has a length greater than 0
     */
    function hasItems(ary) {
        return ary != null && ary.length > 0;
    }
    Arrays.hasItems = hasItems;
    /** Search for the index of an object with a specified property in an array.
     * For example: {@code indexOfPropValue([ {name: "billy", value: 12}, {name: "sam", value: 12} ], "value", 12)}
     * returns: {@code 0}
     * because the first object with the property "value" with a value of 12 was at index 0
     *
     * @param ary: the array to search
     * @param propName: the name of the property to search for on each object
     * @param propValue: the property value to compare
     * @return the array index of an object with a matching property, -1 if no matching object was found
     */
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
    /** Return the last value in an array that matches a filter, null if no matches
     * @param ary: the array of values to search
     * @param filterFunc: the filter to apply
     * @return the highest-index value passed to {@code filterFunc} from {@code ary} that returns true, null if no value returns true
     */
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
    /** Search for the last index of an object with a specified property in an array
     * For example: {@code lastIndexOfPropValue([ {text: "john's bid", value: 12}, {text: "test bid", value: 12} ], "value", 12)}
     * returns: {@code 1}
     * because the last object with the property "value" with a value of 12 was at index 1
     *
     * @param ary: the array to search
     * @param propName: the name of the property to search for on each object
     * @param propValue: the property value to compare
     * @return the array index of an object with a matching property, -1 if no matching object was found
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
    /** Get the difference between two arrays.
     * For example: {@code ary1 = [1, 2, 3]} and {@code ary2 = [2, 4]}
     * returns: {@code [4, 1, 3]}
     * which represents the differences between {@code ary1} and {@code ary2} (note: the returned array order is undefined)
     *
     * @param ary1: the first array to compare
     * @param ary2: the second array to compare
     * @return of values that exist in only one of the input arrays
     * @see diff()
     */
    function looseDiff(ary1, ary2) {
        var diffRes = diff(ary1, ary2);
        var looseDiff = Array.prototype.concat.apply(diffRes.added, diffRes.removed);
        return looseDiff;
    }
    Arrays.looseDiff = looseDiff;
    /** Check if two arrays are equal, element by element
     * For example: {@code equal(["A", 23, true], ["A", 23, true])}
     * returns: {@code true}
     * Or example: {@code equal(["A", 23, true], ["A", 13])}
     * returns: {@code false}
     *
     * @param ary1: the first array to compare
     * @param ary2: the second array to compare
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
     * For example: {@code looseEqual([26, "Alpha", 5], [5, 26, "Alpha"])}
     * returns: {@code true}
     * Or example: {@code looseEqual([34, "A", "QA"], [7, 34, "A"])}
     * returns: {@code false}
     *
     * @param ary1: the first array to compare
     * @param ary1: the second array to compare
     * @return true if both arrays contain the same elements in any order, or if both arrays are null.
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
    /** Maps and filters an array in one operation by passing a two field object to the map-filter
     * function as a destination 'out' parameter like C#'s 'out' parameters
     * For example: {@code mapFilter([1, 2, 3, 4, 5, 6, 7], function (value, dstOut) { dstOut.isValid = (value % 3 !== 0); })}
     * returns: {@code [1, 2, 4, 5, 7]}
     * Or example: {@code mapFilter(['A', 'B', 'C', 'D', 'C', 'A', 'B'], function (value, dstOut) { dstOut.isValid = (value !== 'D'); dstOut.value = value.toLowerCase(); })}
     * returns: {@ ['a', 'b', 'c', 'c', 'a', 'b']}
     *
     * @param ary: the array AND filter to map
     * @param mapFilterFunc: since JS and TS don't have 'out' parameters
     * this function accepts a value and sets 'dstOut.isValid' true if the value is accepted, false if it is filtered out,
     * and stores the mapped result for valid values in 'dstOut.value'.
     * NOTE: if 'dstOut.value' is left null, the input 'value' is stored in the returned array
     * @return an array of filtered and mapped result values
     */
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
    /** Like {@see #mapFilter()} except null return values are filtered out instead of using an two parameter 'out' style object with an 'isValid' flag
     * @param the array of values to map-filter
     * @param mapFunc: the {@link Array#map()} style function to transform input values,
     * null returned values are not stored in the returned array, allowing the function to filter
     * @return an array of non-null mapped result values
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
    /** Remove the first instance of a matching value from an array
     * @return the removed index or -1 if the value could not be found
     */
    function removeValue(ary, value) {
        var idx = ary.indexOf(value);
        if (idx > -1) {
            removeIndex(ary, idx);
        }
        return idx;
    }
    Arrays.removeValue = removeValue;
    /** Remove an index from an array
     * For example: {@code removeIndex(["Alpha", "Beta", "Gamma"], 1)}
     * returns: {@code ["Alpha", "Gamma"]}
     *
     * @param ary: the array to remove an index from
     * @param index: the index of the value to remove
     * @return the {@code ary} with the value at {@code index} removed
     */
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
    /** Set a property on every object in an array.
     * Useful for clearing a specific property to false or null.
     * @param ary: the array of objects
     * @param propName: the name of the property to set
     * @param propValue: the value to assigned to each object's {@code propName} property
     */
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
    /**
     * @return the input array, sorted in numeric order (ascending by default, with second parameter flag to sort descending)
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
     * For example: {@code spliceArray([0, 1, 1, 5], [1, 2, 3], 2, 1)}
     * returns: {@code [0, 1, 1, 2, 3, 5]}
     *
     * @param origAry: the initial array to copy
     * @param insertAry: the array to insert into {@code origAry}
     * @param index: the {@code origAry} index at which to insert the elements from {@code insertAry}
     * @param [deleteCount=0]: the number of elements to not copy from {@code origAry} starting at {@code index}
     * @return the {@code origAry} or a new array containing the contents of {@code origAry} and {@code insertAry}
     */
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
        // add to the end of the array
        if (index === origAry.length && deleteCount === 0) {
            tmp = origAry;
            Array.prototype.push.apply(tmp, insertAry);
        }
        else {
            tmp = [];
            // copy up to the index to insert, then insert the array, and copying the remaining portion
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
    /** Swap two elements in an array
     * For example: {@code swap(["A", "B", "C", "D"], 1, 2)}
     * returns: {@code ["A", "C", "B", "D"]}
     *
     * @param ary: the array of elements
     * @param i1: the first index of the two indexes to swap
     * @param i2: the second index of the two indexes to swap
     */
    function swap(ary, i1, i2) {
        var tmp = ary[i2];
        ary[i2] = ary[i1];
        ary[i1] = tmp;
        return ary;
    }
    Arrays.swap = swap;
    /** Return elements that exist in two arrays.
     * For example: {@code union([1, 2, 3, 4, 5, "A"], [1, 2, 4, "A"])}
     * returns: {@code [1, 2, 4, "A"]}
     *
     * @param ary1: the first array
     * @param ary2: the second array
     * @return an array of shared elements between {@code ary1} and {@code ary2}
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
    /** Returns the unique values of an array as defined by the {@linke Array#indexOf()} operator.
     * For example: {@code toUnique(["alpha", "beta", "charlie", "alpha", "beta"])}
     * returns: {@code ["alpha", "beta", "charlie"]}
     *
     * @param ary: an array of values
     * @return a new array of values containing the original array's unique values
     */
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
})(Arrays || (Arrays = {}));
module.exports = Arrays;


module Arrays {

    export interface FilterResult<T> {
        all: T[];
        matching: T[];
        notMatching: T[];
    }


    export var EMPTY_ARRAY = Object.freeze([]);


    /** Add all of the values in 'toAdd' to the 'src' array
     * @returns the source array
     */
    export function addAll<E>(src: E[], toAdd: E[] | null | undefined): E[] {
        if (toAdd != null && toAdd.length > 0) {
            Array.prototype.push.apply(src, toAdd);
        }
        return src;
    }


    /** Transform and add the elements from one array to another
     * @param src the array to add elements to
     * @param toAdd the elements to transform and add
     * @param transformer a function to transform the 'toAdd' values before adding them to 'src'
     */
    export function addAllTransform<E, U>(src: E[], toAdd: U[], transformer: (item: U) => E): E[] {
        for (var i = 0, size = toAdd.length; i < size; i++) {
            src.push(transformer(toAdd[i]));
        }
        return src;
    }


    /** Given an array or an object, return the array, or a new array containing the object as it's only element
     * @param data the object or array
     * @param copyToNewAry optional (default: false) if the data is an array, copy the items into a new array
     */
    export function asArray<E>(data: E | E[], copyToNewAry?: boolean): E[] {
        if (Array.isArray(data)) {
            return copyToNewAry ? (<E[]>data).slice() : <E[]>data;
        }
        else {
            return [<E>data];
        }
    }


    /** Check if an array is not null and has any items
     * @param ary the array to check
     * @returns true if the array is not null and has a length greater than 0
     */
    export function hasAny<E>(ary: E[] | ArrayLike<E> | null | undefined): ary is E[] {
        return ary != null && (<any[]>ary).length > 0;
    }


    /** Given an array or an object, return true if it is an object or an array containing one element, false if the array is empty or contains more than 1 element
     * @param data the object or array
     */
    export function isOneItem<E>(data: E | E[] | null | undefined): boolean {
        return Array.isArray(data) ? data.length === 1 : true;
    }


    /** Given an array or an object, return the object or the first element if the array contains 1 element, else return null if the array is empty or contains more than 1 element
     * @param data the object or array
     */
    export function getIfOneItem<E>(data: E | E[] | null | undefined): E | null {
        return Array.isArray(data) ? (data.length === 1 ? data[0] : null) : <E | null>data;
    }


    /** Perform a binary search of a property in an array of values and return the index.
     * For example: Arrays.binarySearch([{key: 3}, {key: 10}, {key: 14}, {key: 15}], "key", 14)
     * returns: 2 indicating that the 3rd array element matches
     *
     * For example: Arrays.binarySearch([{key: 3}, {key: 10}, {key: 14}, {key: 15}], "id", 13)
     * returns: -3 indicating that no matching element was found,
     * but if a matching element did exist in the array, it would be at index 3
     */
    export function binarySearch<E, K extends keyof E>(ary: ArrayLike<E>, comparatorPropName: K, searchValue: E[K]): number {
        var low = 0;
        var high = ary.length - 1;

        while (low <= high) {
            var mid = Math.floor((low + high) / 2);
            var midVal = ary[mid];
            var compare = <any>midVal[comparatorPropName] - <any>searchValue;

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


    /** Remove all values from an array
     */
    export function clear(ary: any[] | null | undefined): void {
        if (ary != null) {
            ary.length = 0;
        }
    }


    /** Returns a new array containing the elements from 'ary1' followed by the elements from 'ary2'
     */
    export function concat<E>(ary1: E[] | null | undefined, ary2: E[] | null | undefined): E[] {
        if (ary1 != null && ary2 != null) {
            return ary1.concat(ary2);
        }
        else {
            return (ary1 != null ? ary1.slice() : (ary2 != null ? ary2.slice() : []));
        }
    }


    /** Check whether all of the values in the second array are contained in the first array
     * @param ary the array of values
     * @param searchFor the values to search for
     * @returns true if all of 'searchFor' values are contained in 'ary'
     */
    export function containsAll<E>(ary: E[] | null | undefined, searchFor: E[] | null | undefined): boolean {
        if (ary == null || searchFor == null) { return false; }
        for (var i = 0, size = searchFor.length; i < size; i++) {
            if (ary.indexOf(searchFor[i]) < 0) {
                return false;
            }
        }
        return true;
    }


    /** Check whether any of the values in the second array are contained in the first array
     * @param ary the array of values
     * @param searchFor the values to search for
     * @returns true if any of 'searchFor' values are contained in 'ary'
     */
    export function containsAny<E>(ary: E[] | null | undefined, searchFor: E[] | null | undefined): boolean {
        if (ary == null || searchFor == null) { return false; }
        for (var i = 0, size = searchFor.length; i < size; i++) {
            if (ary.indexOf(searchFor[i]) > -1) {
                return true;
            }
        }
        return false;
    }


    /** Count the number of elements in an array that match a filter
     * @param ary the array of values
     * @param filter the filter to use on 'ary'
     * @returns the number of 'ary' elements that return a truthy value when passed through the 'filter' function
     */
    export function count<E>(ary: E[], filter: (value: E, index: number, array: E[]) => boolean): number {
        var res = 0;
        for (var i = 0, size = ary.length; i < size; i++) {
            if (filter(ary[i], i, ary)) {
                res++;
            }
        }
        return res;
    }


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
    export function diff<E>(ary1: E[] | null | undefined, ary2: E[] | null | undefined, equal?: ((a: E, b: E) => boolean) | null | undefined): E[] {
        var diffRes = (equal != null ? diffPartsCustomEquality(ary1, ary2, equal) : diffParts(ary1, ary2));
        var looseDiff = Array.prototype.concat.apply(diffRes.added, diffRes.removed);
        return looseDiff;
    }


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
    export function diffParts<E>(ary1: E[] | null | undefined, ary2: E[] | null | undefined): { added: E[]; removed: E[] } {
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
                    removed: (<E[]>ary1).slice()
                };
            }
        }

        var added: E[] = [];
        var removed: E[] = [];
        var ary2Used: boolean[] = [];
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
    export function diffPartsCustomEquality<E1, E2>(ary1: E1[] | null | undefined, ary2: E2[] | null | undefined, equal: (a: E1, b: E2) => boolean): { added: E2[]; removed: E1[] } {
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
                    removed: (<E1[]>ary1).slice()
                };
            }
        }

        var added: E2[] = [];
        var removed: E1[] = [];
        var ary2Used: boolean[] = [];
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


    /** Returns the distinct/unique values of an array as defined by the Array#indexOf() operator.
     * For example: Arrays.distinct(["alpha", "beta", "charlie", "alpha", "beta"])
     * returns: ["alpha", "beta", "charlie"]
     *
     * @param ary an array of values
     * @param propName optional, object property name on which to base the distinctness check
     * @returns a new array of values containing the original array's distinct values
     */
    export function distinct<E>(ary: E[], propName?: (keyof E) | null): E[];
    export function distinct<E>(ary: E[] | null | undefined, propName?: (keyof E) | null): E[] | null;
    export function distinct<E>(ary: E[] | null | undefined, propName?: (keyof E) | null): E[] | null {
        if (ary == null || ary.length < 2) { return ary || null; }
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


    /** Remove the first matching value from an array without creating a new array of splicing the array.
     * NOTE: the returned order of the array's elements is not defined.
     * @param ary the values to search and remove the matching value from
     * @param value the value to search for and remove
     * @returns 'ary' of values with the first matching instance of 'value' removed,
     * values are compared based on strict equality '===='
     */
    export function fastRemove<E>(ary: E[], value: E): E[];
    export function fastRemove<E>(ary: E[] | null | undefined, value: E): E[] | null | undefined;
    export function fastRemove<E>(ary: E[] | null | undefined, value: E): E[] | null | undefined {
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


    /** Remove a value at a specific index from an array without creating a new array of splicing the array.
     * NOTE: the returned order of the array's elements is not defined.
     * @param ary the array of values
     * @param index the index of the value to remove from the array
     * @returns 'ary' of values with the specified index removed
     */
    export function fastRemoveIndex<E>(ary: E[], index: number): E[]
    export function fastRemoveIndex<E>(ary: E[] | null | undefined, index: number): E[] | null | undefined;
    export function fastRemoveIndex<E>(ary: E[] | null | undefined, index: number): E[] | null | undefined {
        var aryLen = 0;
        if (ary == null || (aryLen = ary.length) === 0 || index < 0 || index >= aryLen) {
            return ary;
        }
        if (aryLen > 1) {
            ary[index] = ary[aryLen - 1];
        }
        ary.pop();

        return ary;
    }


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
    export function filterSplit<E>(ary: E[] | ArrayLike<E> | null | undefined, filterFunc: (value: E, index: number, array: E[]) => boolean): FilterResult<E> {
        if (ary == null) { return toBiFilterResult([], [], []); }

        var matching: E[] = [];
        var notMatching: E[] = [];

        for (var i = 0, size = ary.length; i < size; i++) {
            var value = ary[i];
            if (filterFunc(value, i, <E[]>ary)) {
                matching.push(value);
            }
            else {
                notMatching.push(value);
            }
        }

        return toBiFilterResult(<E[]>ary, matching, notMatching);
    }


    // convert an array of items and arrays containing matching and non-matching items to an 'BiFilterResult' object
    function toBiFilterResult<E>(all: E[], matching: E[], notMatching: E[]): FilterResult<E> {
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
    export function findMatchingProps<E, K extends keyof E>(ary: E[] | ArrayLike<E> | null | undefined, propName: K, propValue: E[K]): E[] | null {
        if (ary == null || propName == null || propValue === undefined) { return null; }
        var res: E[] = [];
        for (var i = 0, size = ary.length; i < size; i++) {
            if (ary[i][propName] === propValue) {
                res.push(ary[i]);
            }
        }
        return res;
    }


    /** Return the first matching value in an array using a filter function, null if no matches.
     * Optional: throw an exception if more than one result is found.
     * For example: Arrays.first([ {key: 27, value: "A"}, {key: 46, value: "B"}, {key: 84, value: "C"}, {key: 84, value: "D"} ], function (obj) { return obj.key === 84; })
     * returns: {key: 84, value: "C"}
     *
     * @param ary the array of values to search
     * @param filter the filter to apply to 'ary'
     * @returns the first (lowest index) value passed to 'filter' from 'ary' that returns true, or null if a match cannot be found
     */
    export function first<E>(ary: E[] | ArrayLike<E> | null | undefined, filter: (value: E, index: number, array: E[]) => boolean, ensureOne: boolean = false): E | null {
        var idx = firstIndex(<E[]>ary, filter, ensureOne);
        return idx < 0 ? null : (<any>ary)[idx];
    }


    /** Return the index of the first matching value in an array using a filter function, null if no matches.
     * @see #first()
     */
    export function firstIndex<E>(ary: E[] | ArrayLike<E> | null | undefined, filter: (value: E, index: number, array: E[]) => boolean, ensureOne: boolean = false): number {
        if (ary == null || filter == null) { return -1; }
        var resultIdx: number = -1;
        var resultCount = 0;

        for (var i = 0, size = ary.length; i < size; i++) {
            if (filter(ary[i], i, <E[]>ary) === true) {
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


    export function last<E>(ary: E[] | ArrayLike<E> | null | undefined, filterFunc: (value: E, index: number, array: E[]) => boolean): E | null {
        var idx = lastIndex(<E[]>ary, filterFunc);
        return idx < 0 ? null : (<any>ary)[idx];
    }


    /** Return the last value in an array that matches a filter, null if no matches
     * @param ary the array of values to search
     * @param filterFunc the filter to apply
     * @returns the highest-index value passed to 'filterFunc' from 'ary' that returns true, null if no value returns true
     */
    export function lastIndex<E>(ary: E[] | ArrayLike<E> | null | undefined, filterFunc: (value: E, index: number, array: E[]) => boolean): number {
        if (ary == null) { return -1; }

        for (var i = ary.length - 1; i > -1; i--) {
            if (filterFunc(ary[i], i, <E[]>ary) == true) {
                return i;
            }
        }
        return -1;
    }


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
    export function firstProp<E, K extends keyof E>(ary: E[] | ArrayLike<E> | null | undefined, propName: K, propValue: E[K], ensureOne: boolean = false): E | null {
        if (ary == null || propName == null) { return null; }
        var result: E | null = null;
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


    /** Get a property from each object in an array of objects
     * @param ary the array of objects
     * @param propName the name of the property to get
     * @param distinct optional boolean which indicates whether unique results only should be returned
     * @returns an array of the specified property from each object in 'ary'
     */
    export function pluck<E, K extends keyof E>(ary: E[] | ArrayLike<E> | null | undefined, propName: K, distinct?: boolean | null): E[K][] {
        if (ary == null || propName == null) { return []; }
        if (!distinct) {
            var results: E[K][] = new Array(ary.length);
            for (var i = ary.length - 1; i > -1; i--) {
                results[i] = ary[i][propName];
            }
            return results;
        }
        else {
            var results: E[K][] = [];
            for (var i = 0, size = ary.length; i < size; i++) {
                var value = ary[i][propName];
                if (results.indexOf(value) < 0) {
                    results.push(value);
                }
            }
            return results;
        }
    }


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
    export function indexOfProp<E, K extends keyof E>(ary: E[] | ArrayLike<E> | null | undefined, propName: K, propValue: E[K], offset?: number): number {
        if (ary == null || propName == null || propValue === undefined) { return -1; }
        for (var size = ary.length, i = <number>offset < 0 ? (size + <number>offset > 0 ? size + <number>offset : 0) : (offset || 0); i < size; i++) {
            if (ary[i][propName] === propValue) {
                return i;
            }
        }
        return -1;
    }


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
    export function lastIndexOfProp<E, K extends keyof E>(ary: E[] | ArrayLike<E> | null | undefined, propName: K, propValue: E[K]): number {
        if (ary == null || propName == null || propValue === undefined) { return -1; }
        for (var i = ary.length - 1; i > -1; i--) {
            if (ary[i][propName] === propValue) {
                return i;
            }
        }
        return -1;
    }


    /** Check if two arrays are equal, element by element
     * For example: Arrays.equal(["A", 23, true], ["A", 23, true])
     * returns: true
     * Or example: Arrays.equal(["A", 23, true], ["A", 13])
     * returns: false
     *
     * @param ary1 the first array to compare
     * @param ary2 the second array to compare
     */
    export function equal<E>(ary1: E[] | ArrayLike<E> | null | undefined, ary2: E[] | ArrayLike<E> | null | undefined): boolean {
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
    export function looseEqual<E>(ary1: E[] | null | undefined, ary2: E[] | null | undefined): boolean {
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


    /** Transforms the elements of an array into a new array
     * For example: Arrays.map([1, 2, 3, 4], (value) => value % 3)
     * returns: [1, 2, 0, 1]
     *
     * @param ary the array to map
     * @returns a new array with each index containing the result of passing the original 'ary' element at that index through the 'mapFunc', or an empty array if the 'ary' is null
     */
    export function map<T, R>(ary: T[] | ArrayLike<T> | null | undefined, mapFunc: (value: T, index: number, array: T[] | ArrayLike<T>) => R): R[] {
        if (ary == null) { return []; }

        var res: R[] = [];

        for (var i = 0, size = ary.length; i < size; i++) {
            res.push(mapFunc(ary[i], i, ary));
        }

        return res;
    }


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
    export function mapFilter<T, R>(ary: T[] | ArrayLike<T> | null | undefined, mapFilterFunc: (value: T, dstOut: { value: R; isValid: boolean }) => void): R[] {
        if (ary == null) { return []; }

        var results: R[] = [];
        var nil = <R>{};
        var dstOut: { value: R; isValid: boolean } = { value: nil, isValid: false };

        for (var i = 0, size = ary.length; i < size; i++) {
            dstOut.isValid = false;
            dstOut.value = nil;
            var inputVal = ary[i];
            mapFilterFunc(inputVal, dstOut);
            if (<boolean>dstOut.isValid === true) {
                results.push(dstOut.value !== nil ? dstOut.value : <R><any>inputVal);
            }
        }

        return results;
    }


    /** Like #mapFilter() except null return values are filtered out instead of using an two parameter 'out' style object with an 'isValid' flag
     * @param the array of values to map-filter
     * @param mapFunc the Array#map() style function to transform input values,
     * null returned values are not stored in the returned array, allowing the function to filter
     * @returns an array of non-null mapped result values
     */
    export function mapFilterNotNull<T, R>(ary: T[] | ArrayLike<T> | null | undefined, mapFunc: (value: T, index: number, array: T[] | ArrayLike<T>) => R): R[] {
        if (ary == null) { return []; }

        var results: R[] = [];

        for (var i = 0, size = ary.length; i < size; i++) {
            var res = mapFunc(ary[i], i, ary);
            if (res != null) {
                results.push(res);
            }
        }

        return results;
    }


    /** Remove all of the specified values from this list.
     * The removal is done in place.
     * For example: Arrays.removeAll([1, 2, 3, 4, 5, 5], [1, 5])
     * returns: [2, 3, 4, 5]
     * For example: Arrays.removeAll([1, 2, 2, 3, 3], [2, 2, 3], true)
     * returns: [3, 1]
     * NOTE: if 'fastRemove' is true, the order of 'ary' when this method returns is not defined and will probably differ from the original order
     *
     * @param ary the array to remove items from
     * @param toRemove the items to search for and remove
     * @param fastRemove optional (default: false) flag indicating whether this function is allowed to reorder the input array's elements
     * @returns the same input 'ary'
     */
    export function removeAll<E>(ary: E[], toRemove: E[], fastRemove?: boolean): E[];
    export function removeAll<E>(ary: E[] | null | undefined, toRemove: E[] | null | undefined, fastRemove?: boolean): E[] | null;
    export function removeAll<E>(ary: E[] | null | undefined, toRemove: E[] | null | undefined, fastRemove?: boolean): E[] | null {
        if (ary == null || toRemove == null) { return <null>ary; }

        var idx: number;
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
            var indicesToSkip: number[] = [];
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


    /** Remove the first instance of a matching value from an array
     * @returns the removed index or -1 if the value could not be found
     */
    export function removeValue<E>(ary: E[], value: E): number {
        var idx = ary.indexOf(value);
        if (idx > -1) {
            removeIndex(ary, idx);
        }
        return idx;
    }


    /** Remove an index from an array
     * For example: Arrays.removeIndex(["Alpha", "Beta", "Gamma"], 1)
     * returns: ["Alpha", "Gamma"]
     *
     * @param ary the array to remove an index from
     * @param index the index of the value to remove
     * @returns the 'ary' with the value at 'index' removed
     */
    export function removeIndex<E>(ary: E[], index: number): E[];
    export function removeIndex<E>(ary: E[] | null | undefined, index: number): E[] | null;
    export function removeIndex<E>(ary: E[] | null | undefined, index: number): E[] | null {
        if (ary == null) { return null; }
        var size = ary.length;
        if (size < 1 || index < 0 || index >= size) { return ary; }

        for (var i = index + 1; i < size; i++) {
            ary[i - 1] = ary[i];
        }
        ary[size - 1] = <never>null;
        ary.length = size - 1;
        return ary;
    }


    /** Set a property on every object in an array.
     * Useful for clearing a specific property to false or null.
     * @param ary the array of objects
     * @param propName the name of the property to set
     * @param propValue the value to assigned to each object's 'propName' property
     */
    export function setAllProp<E, K extends keyof E>(ary: E[] | ArrayLike<E> | null | undefined, propName: K, propValue: E[K]): void {
        if (ary == null || propName == null) { return; }
        for (var i = ary.length - 1; i > -1; i--) {
            ary[i][propName] = propValue;
        }
    }


    /**
     * @returns the input array, sorted in numeric order (ascending by default, with second parameter flag to sort descending)
     */
    export function sortNumeric(ary: number[], descending: boolean = false): number[] {
        if (descending === false) {
            ary.sort((a, b) => a - b);
        }
        else {
            ary.sort((a, b) => b - a);
        }
        return ary;
    }


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
    export function splice<E>(origAry: E[] | null | undefined, insertAry: E[] | null | undefined, index: number, deleteCount: number = 0, copyToNewAry?: boolean): E[] {
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

        var tmp: E[];

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


    /** Swap two elements in an array
     * For example: Arrays.swap(["A", "B", "C", "D"], 1, 2)
     * returns: ["A", "C", "B", "D"]
     *
     * @param ary the array of elements
     * @param i1 the first index of the two indexes to swap
     * @param i2 the second index of the two indexes to swap
     */
    export function swap<E>(ary: E[], i1: number, i2: number): E[] {
        var tmp = ary[i2];
        ary[i2] = ary[i1];
        ary[i1] = tmp;
        return ary;
    }


    /** Convert an array to an object with properties based on a property from each object.
     * For example: Arrays.toMap([{ s: "A", t: 0 }, { s: "A", t: 1 }, { s: "B", t: 1 }, { s: "C", t: 2 }], "s")
     * returns: {
     *   A: { s: "A", t: 1 },
     *   B: { s: "B", t: 1 },
     *   C: { s: "C", t: 2 }
     * }
     * @param ary the array to convert
     * @param prop the name of number or string property in each object to use as the key/property name
     * @param [throwIfDuplicates] (default: true), throw an error if a duplicate prop is found while mapping the array to object properties
     * @returns an object with keys based on the 'prop' value from each object in the 'ary'
     */
    export function toMap<T, P extends { [K in keyof T]: T[K] extends number ? K : never }[keyof T]>(ary: T[] | ArrayLike<T> | null | undefined, prop: P, throwIfDuplicates?: boolean): { [id: number]: T };
    export function toMap<T, P extends { [K in keyof T]: T[K] extends string ? K : never }[keyof T]>(ary: T[] | ArrayLike<T> | null | undefined, prop: P, throwIfDuplicates?: boolean): { [id: string]: T };
    export function toMap<T, P extends keyof T>(ary: T[] | ArrayLike<T> | null | undefined, prop: P, throwIfDuplicates = true): { [id: string]: T } {
        if (ary == null) { return {}; }
        return (<(value: T[], func: (map: { [id: string]: T }, itm: T) => { [id: string]: T }, initial: { [id: string]: T }) => { [id: string]: T }><any>Array.prototype.reduce.call)(<T[]>ary, (map: { [id: string]: T }, itm: T) => {
            var key = <string><any>itm[prop];
            if (throwIfDuplicates && key in map) {
                throw new Error("duplicate toMap() key mapping found for '" + key + "', existing value: '" + map[key] + "', duplicate value: '" + itm + "'");
            }
            map[key] = itm;
            return map;
        }, <{ [id: string]: T }>{});
    }


    /** Group an array into a map of arrays grouped by a property name.
     * For example: Arrays.groupBy([{ k: "A", v: 10 }, { k: "A", v: 12 }, { k: "B", v: 15 }, { k: "C", v: 24 }, { k: "C", v: 42 }], "k")
     * returns: {
     *   A: [{ k: "A", v: 10 }, { k: "A", v: 12 }],
     *   B: [{ k: "B", v: 15 }],
     *   C: [{ k: "C", v: 24 }, { k: "C", v: 42 }]
     * }
     * @param ary the array of items
     * @param funcOrProp a property name or function which returns a string to map 'ary' items to the key to group them by
     */
    export function groupBy<T>(ary: T[], funcOrProp: (keyof T) | ((item: T, index: number, ary: T[]) => string)): { [key: string]: T[] } {
        if(typeof funcOrProp === "function") {
            return ary.reduce((map, item, idx, ary) => {
                var key = funcOrProp(item, idx, ary);
                var bucket = map[key] || (map[key] = []);
                bucket.push(item);
                return map;
            }, <{ [key: string]: T[] }>{});
        }
        else {
            return ary.reduce((map, item) => {
                var key = <string><any>item[funcOrProp];
                var bucket = map[key] || (map[key] = []);
                bucket.push(item);
                return map;
            }, <{ [key: string]: T[] }>{});
        }
    }


    /** Return elements that exist in two arrays.
     * For example: Arrays.union([1, 2, 3, 4, 5, "A"], [1, 2, 4, "A"])
     * returns: [1, 2, 4, "A"]
     *
     * @param ary1 the first array
     * @param ary2 the second array
     * @returns an array of shared elements between 'ary1' and 'ary2'
     */
    export function union<E>(ary1: E[] | null | undefined, ary2: E[] | null | undefined): E[] {
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

        var results: E[] = [];
        for (var i = 0, size = ary1.length; i < size; i++) {
            var idx = ary2.indexOf(ary1[i]);
            if (idx > -1) {
                results.push(ary1[i]);
            }
        }
        return results;
    }


    /** Find the maximum value in an array of numbers
     * @param ary the array of numbers to search
     */
    export function max(ary: ArrayLike<number | null | undefined>): number {
        var max = Number.NEGATIVE_INFINITY;
        for (var i = 0, size = ary.length; i < size; i++) {
            var val = ary[i];
            max = val != null && val > max ? val : max;
        }
        return max;
    }


    /** Find the maximum value in an array of numbers
     * @param ary the array of numbers to search
     */
    export function maxValueIndex(ary: ArrayLike<number | null | undefined>): number {
        var max = Number.NEGATIVE_INFINITY;
        var maxI = -1;
        for (var i = 0, size = ary.length; i < size; i++) {
            var val = ary[i];
            if (val != null && val > max) {
                max = val;
                maxI = i;
            }
        }
        return maxI;
    }


    /** Find the minimum value in an array of numbers
     * @param ary the array of numbers to search
     */
    export function min(ary: ArrayLike<number | null | undefined>): number {
        var min = Number.POSITIVE_INFINITY;
        for (var i = 0, size = ary.length; i < size; i++) {
            var val = ary[i];
            min = val != null && val < min ? val : min;
        }
        return min;
    }


    /** Find the minimum value in an array of numbers
     * @param ary the array of numbers to search
     */
    export function minValueIndex(ary: ArrayLike<number | null | undefined>): number {
        var min = Number.POSITIVE_INFINITY;
        var minI = -1;
        for (var i = 0, size = ary.length; i < size; i++) {
            var val = ary[i];
            if (val != null && val < min) {
                min = val;
                minI = i;
            }
        }
        return minI;
    }


    /** Sum the values of an array
     * @param ary an array of numeric convertable values to sum; null, infinite, and NaN values in the array are treated as zero.
     * If the array is null, 0 is returned.
     * @param infinityToZero optional (default: false) flag to convert NEGATIVE_INFINITY and POSITIVE_INFINITY values to 0
     * @returns the sum of the values in 'ary'
     */
    export function sum(ary: (number | null)[] | ArrayLike<number | null>, infinityToZero?: boolean): number {
        if (ary == null) { return 0; }
        var sum = 0;
        for (var i = ary.length - 1; i > -1; i--) {
            var val = ary[i];
            val = (val == null || isNaN(val) || (infinityToZero && (val === Infinity || val === Number.NEGATIVE_INFINITY || val === Number.POSITIVE_INFINITY))) ? 0 : val;
            sum += val;
        }
        return sum;
    }

}

export = Arrays;

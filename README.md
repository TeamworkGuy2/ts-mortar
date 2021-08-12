TS Mortar
==============

Dependencies:
none

Utility functions for common TypeScript string, array, object, and enum operations.
Similar to `lodash` or `underscore`, these functions are the result of needs I've encountered in Javascript/TypeScript projects over the last few years.
See the `/test` directory for example usage of the functions.

### Arrays
Includes functions for manipulating an array like a list:
* addAll(), addAllTransform()
* hasAny(), isOneItem()
* binarySearch()
* containsAll(), containsAny()
* diff()
* distinct()
* fastRemove(), fastRemoveIndex()
* filterSplit()
* first(), firstIndex()
* last(), lastIndex()
* map(), mapFilter(), mapFilterNotNull()
* removeAll()
* removeIndex()
* removeValue()
* sortNumeric()
* swap()
* toMap()
* groupBy()
* union()
* max(), min(), sum()
Comparison:
* equal()
* looseEqual()
* unique()
* diff()
* filterSplit()
Object searching:
* firstProp()
* pluck()
* indexOfProp(), lastIndexOfProp()
* setAllProp()

### Functions
Wrap functions to provide additional functionality, such as checking if a function is null before calling it, catching errors thrown by a function, timing how long a function takes to run, etc.:
* applyFunc()
* callFunc()
* createFuncTimer()
* tryCatch()
* lazyField()
* partial()

### EnumCreator
Create TypeScript enum objects similar to Java enums:
* initEnumClass()

### Numbers
Focused around converting numbers to and from a user displayable format:
* isNumeric()
* isNullOrZero()
* toNumber()
* roundTo()
* toFixed()
* format()

### Objects
Copying objects and getting/checking/transforming properties:
* assign(), assignNonUndefined()
* clone(), cloneDeep(), cloneDeepNonUndefined()
* extendPrototype(), extendToStatic()
* hasMatchingProps(), hasNonNullProps(), ...
* invert()
* map()
* toArray()
* values()

### Strings
Basic string validation, trimming, truncating, and replacing:
* truncate()
* padStart(), padEnd()
* removeLeading(), removeTrailing()
* isNullOrEmpty(), isNullOrWhiteSpace()
* isCharAtDigit(), isCharAtLowerCase(), isCharAtUpperCase()
* replaceAll()
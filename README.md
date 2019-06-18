TS Mortar
==============

Dependencies:
none

Utility functions for common TypeScript string, array, object, and enum operations.
Similar to `lodash` or `underscore`, these functions are the result of needs I've encountered in Javascript/TypeScript projects over the last few years.
See the `/test` directory for example usage of the functions.

### Arrays
Includes functions for manipulating an array like a list:
* addAll()
* removeIndex()
* removeValue()
* clear()
* containsAll()
* hasAny()
Comparison:
* looseEqual()
* unique()
* diff()
* filterSplit()
Object searching:
* findProp()
* findAllProp()
* indexOfProp()
* setAllProp()

### Functions
Wrap functions to provide additional functionality, such as checking if a function is null before calling it, catching errors thrown by a function, timing how long a function takes to run, etc.:
* applyFunc()
* callFunc()
* createFuncTimer()
* tryCatch()
* lazyGetter()

### EnumCreator
Create TypeScript enum objects similar to Java enums:
* initEnumClass()

### Numbers
Focused around converting numbers to and from a user displayable format:
* isNumeric()
* isNullOrZero()
* roundTo()
* format()

### Objects
Copying objects and getting/checking/transforming properties:
* assign()
* clone()
* extend()
* hasMatchingProps(), hasNonNullProps(), ...
* invert()
* map()
* toArray()
* values()

### Strings
Basic string validation, trimming, truncating, and replacing:
* truncate()
* padLeft(), padRight()
* trimLeading(), trimTrailing()
* isNullOrEmpty(), isNullOrWhiteSpace()
* isCharAtDigit(), isCharAtLowerCase(), isCharAtUpperCase()
* replaceAll()
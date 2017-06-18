TS Mortar
==============

Dependencies:
none

Utility functions for common TypeScript string, array, object, and enum operations.
Similar to underscore or lodash, these functions are the product of needs I've encountered in Javascript/TypeScript projects over the last few years.
See the /test directory for example usage of the functions in this project.

### Arrays
Includes functions for manipulating an array like a list (i.e. addAll(), removeIndex(), removeValue(), clear(), containsAll()),
comparisons (i.e. looseEqual(), unique(), diff(), filterSplit()),
and object searching (i.e. findProp(), findAllProp(), indexOfProp(), setAllProp()).

### Functions
applyFunc(), callFunc(), createFuncTimer(), tryCatch(), lazyGetter() which take functions and wrap them to provide additional functionality, such as checking if a function is null before calling it, catching errors thrown by a function, timing how long a function takes to run, etc.

### Numbers
isNumeric(), isNullOrZero(), roundTo(), format(); centered around converting numbers to and from a user displayable format.

### Objects
assign(), clone(), extend(), has*Props(), values(), map() for copying objects and getting/checking/transforming properties.

### Strings
clamp(), padLeft/Right(), trimLeading/Trailing(), isNullOrEmpty(), isNullOrWhiteSpace(), isCharAtDigit/LowerCase/UpperCase(), and replaceAll() which are fairly self explanatory.
TS Mortar
==============

Utility functions for common TypeScript primitive, array, date-time, enum, and event listener operations. 
Similar to underscore or lodash, these functions are the product of needs I've encountered in Javascript/TypeScript over the last few years. 
See the /test directory for example usage of the functions in this project. 

Dependencies:
None

####date-time/
conversion of unix epoch timestamps to javascript 'Date' objects and back, as well as conversion to various string representations. 

####events/
event listener lists (synchronous and asynchronous), event queue for buffering multiple events before firing them to listeners, and singular event handler that waits for a single event before informing listeners and informing all subsequently attached listeners immediately (similar to jquery.ready(...)). 

####promises/
utility for creating and managing 'Q' type promises. 

####utils/
simplify array, function, number, object, string, and enum operations. 
Arrays - includes functions for manipulating an array like a list (i.e. addAll, removeIndex, removeValue, clear, containsAll), comparisons (i.e. looseEqual, unique, diff, filterSplit), and object searching (i.e. findProp, findAllProp, indexOfProp, setAllProp). 
Functions - applyFunc(), callFunc(), createFuncTimer(), tryCatch(), lazyGetter() which take functions and and wrap them to provide additional functionality, such as checking if a function is null before calling it, catching errors thrown by a function, timing how long a function takes to run, etc. 
Numbers - isNumeric(), isNullOrZero(), roundTo(), format() mostly for converting numbers to and from a user displayable format. 
Objects - assign(), clone(), extend(), has*Props(), values() for copying objects and getting/checking properties. 
Strings - clamp(), padLeft/Right(), trimLeading/Trailing(), isNullOrEmpty(), isNullOrWhiteSpace(), isCharAtDigit/LowerCase/UpperCase(), and replaceAll() which are fairly self explanatory. 
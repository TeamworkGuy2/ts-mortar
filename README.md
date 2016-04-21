TS Mortar
==============

Dependencies:
Q.js (if using Defer.ts)

Utility functions for common TypeScript primitive, array, date-time, enum, and event listener operations. 
Similar to underscore or lodash, these functions are the product of needs I've encountered in Javascript/TypeScript over the last few years. 
See the /test directory for example usage of the functions in this project. 

####date-time
Conversion of unix epoch timestamps to javascript 'Date' objects and back.  As well as conversion to/from .NET style JSON timestamps (i.e. /Date(1234567890-0000)/) and various other string representations. 

####events
Lists for event listeners (synchronous and asynchronous). 
Event queue for buffering multiple events before firing them to listeners. 
Singular event handler that waits for a single event before informing listeners and informing all subsequently attached listeners immediately (similar to jquery.ready(...)). 

####promises
Utility for creating and managing 'Q' type promises. 

####utils
Simplify array, function, number, object, string, and enum operations:

Arrays - includes functions for manipulating an array like a list (i.e. addAll, removeIndex, removeValue, clear, containsAll), comparisons (i.e. looseEqual, unique, diff, filterSplit), and object searching (i.e. findProp, findAllProp, indexOfProp, setAllProp). 

Functions - applyFunc(), callFunc(), createFuncTimer(), tryCatch(), lazyGetter() which take functions and wrap them to provide additional functionality, such as checking if a function is null before calling it, catching errors thrown by a function, timing how long a function takes to run, etc. 

Numbers - isNumeric(), isNullOrZero(), roundTo(), format(); centered around converting numbers to and from a user displayable format. 

Objects - assign(), clone(), extend(), has*Props(), values(), map() for copying objects and getting/checking/transforming properties. 

Strings - clamp(), padLeft/Right(), trimLeading/Trailing(), isNullOrEmpty(), isNullOrWhiteSpace(), isCharAtDigit/LowerCase/UpperCase(), and replaceAll() which are fairly self explanatory. 
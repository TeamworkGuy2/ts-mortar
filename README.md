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

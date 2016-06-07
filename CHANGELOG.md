# Change Log
All notable changes to this project will be documented in this file.
This project does its best to adhere to [Semantic Versioning](http://semver.org/).


--------
### [0.9.0](N/A) - 2016-06-07
#### Added
* Functions.partial() as a general replacement for wrap*Arg() functions

#### Changed
* Added Functions.lazyField return function optional 'refetch' parameter

#### Removed
* Functions wrap1Arg(), wrap2Arg(), wrap3Arg(), use Functions.partial() instead
* Functions lazyGetter1Arg() and lazyGetter2Arg() in favor of properly scoping your cached data, since it's not intuitive to have a function which ignores it's input parameters on subsequent calls


--------
### [0.8.1](https://github.com/TeamworkGuy2/ts-mortar/commit/24479bd30f9d0d2ed4c67df51107899ace781d4c) - 2016-05-31
#### Added
* Arrays.removeAll()

#### Changed
* Remove {@code } blocks in documentation, since this is a javadoc style and Visual Studio doesn't parse it leading to ugle documentation preview snippets

#### Fixed
* Added missing Q.d.ts reference to events.d.ts now that reference imported by qunit-tests.ts no longer exists


--------
### [0.8.0](https://github.com/TeamworkGuy2/ts-mortar/commit/eb599a718b133e2c691266416f499c06b3b099c8) - 2016-05-29
#### Changed
* Renamed Arrays.diff() -> diffParts()
* Renamed Arrays.looseDiff() -> diff()
* Switched unit testing library from qunit to chai and mocha


--------
### [0.7.3](https://github.com/TeamworkGuy2/ts-mortar/commit/dffab43dd890b7ca23b136b45cfdccc5377d3794) - 2016-05-27
#### Changed
* EnumCreator.initEnumClass() 'memberVisitor' parameter can optionally return null/void
* Renamed a few classes internally to match their file names


--------
### [0.7.2](https://github.com/TeamworkGuy2/ts-mortar/commit/650307f4e70c17c6820bc348e51e922f448a3dc6) - 2016-05-26
#### Changed
* EnumCreator.initEnumClass() return signature improved and added optional memberVisitor parameter
* Renamed EnumCreator EnumConstantImpl -> EnumMemberImpl


--------
### [0.7.1](https://github.com/TeamworkGuy2/ts-mortar/commit/4e27b557c432b8d646cca0201c512d1852a964e0) - 2016-05-25
#### Changed
* EnumCreator refactored to support an easier way of creating enums


--------
### [0.7.0](https://github.com/TeamworkGuy2/ts-mortar/commit/705e3fef1e5ebc922b6142b6a1d057aa259d3c15) - 2016-05-24
#### Added
* Added Array.containsAny()

#### Changed
* Defer and tspromises.d.ts have moved to the new ts-promise-tasks library
* Renamed EventListenerListImpl -> EventListenerList
* Renamed EventQueueImpl -> EventQueue

#### Removed
* Defer and tspromises.d.ts have moved to the new ts-promise-tasks library


--------
### [0.6.0](https://github.com/TeamworkGuy2/ts-mortar/commit/89016d26dcd0e0ddb4ce6db10046c9d8907c2c6f) - 2016-05-06
#### Changed
* Added Objects.clone() support for Date and primitives
* Arrays.clear() now uses ES5 'ary.length = 0' syntax

#### Removed
* Removed Objects.getProp() since it serves little purpose


--------
### [0.5.5](https://github.com/TeamworkGuy2/ts-mortar/commit/d95891b90b1ec577613f0fb737739136e06ccd4b) - 2016-04-27
#### Changed
* Fixed Objects.cloneDeep() bug copying strings


--------
### [0.5.4](https://github.com/TeamworkGuy2/ts-mortar/commit/f321270ec08a763dce3bfd6414217d42943bacea) - 2016-04-21
#### Changed
* Objects.map() 'mapFunc' callback arguments changed from (value) to (key, value)
* Objects.map() 'mapFunc' callback can now return undefined to skip properties


--------
### [0.5.3](https://github.com/TeamworkGuy2/ts-mortar/commit/dcdd7531087a69701eaca049a74d494d4ccca306) - 2016-04-20
#### Added
* Arrays.map() - to transform an array
* Objects.toArray() - converts each of the properties in an object to a value using a mapping function and returns them as an array

#### Changed
* Renamed Objects cloneMap() -> map(), map now returns null when 'source' is null rather than throwing an error


--------
### [0.5.2](https://github.com/TeamworkGuy2/ts-mortar/commit/6ef1d72ce358649816330f640563588c6ba691a6) - 2016-04-19
#### Added
* Objects.cloneDeep() support for Date type


--------
### [0.5.1](https://github.com/TeamworkGuy2/ts-mortar/commit/ba0f8f82fad3e6f718c9d23cfaeddbe77f08f17b) - 2016-04-18
#### Changed
* Improved Objects.cloneMap() overloaded virtual TypeScript signatures


--------
### [0.5.0](https://github.com/TeamworkGuy2/ts-mortar/commit/0e15ae5d209215062be0bc69e167b776fbe521b0) - 2016-04-18
#### Added
* Objects.cloneMap() similar to assign() or clone(), but designed to copy maps (containing properties all of the same type) using a property clone function

#### Removed
* Objects.coalesce() too general and found to rarely be used this way in practice


--------
### [0.4.5](https://github.com/TeamworkGuy2/ts-mortar/commit/6e75bea9a62e32ac36bec27de103f7d3d2beaa67) - 2016-04-16
#### Added
A CHANGELOG.md covering all previous releases after being reminded about the need for change logs from http://keepachangelog.com/

#### Changed
* Arrays.splice() 'copyToNewAry' optional parameter, corner case optimization for insertions at the beginning of an array, and clearer documentation example


--------
### [0.4.4](https://github.com/TeamworkGuy2/ts-mortar/commit/3e5494a5b41943458c11a2ac9b92ff43de448b7c) - 2016-04-15
#### Added
* Arrays firstIndex() which is used by first(), lastIndex() which is used by last(), and maxValueIndex() and minValueIndex() to augment max() and min(), and test cases

#### Changed
* Added Objects.assign() TypeScript overloads to return a type more specific than 'any' when possible


--------
### [0.4.3](https://github.com/TeamworkGuy2/ts-mortar/commit/936fd7bfef9542125c583b3807527186d37267b6) - 2016-04-14
#### Fixed
* Arrays.unique() was sorting the input array when it didn't need to, and since the input array wasn't copied before sorting, it was modifying the caller's original array


--------
### [0.4.2](https://github.com/TeamworkGuy2/ts-mortar/commit/4679b42aeaf06a9e287be9cd11127a8af4a9afb2) - 2016-04-05
#### Changed
* Flattened the project folder so it wasn't inside a sub-folder of the project root and moved .d.ts definition files to separate definitions library


--------
### [0.4.1](https://github.com/TeamworkGuy2/ts-mortar/commit/059609f1bbe734d673d4d5145dedc919682e77fd) - 2016-04-04
#### Added
* Arrays.equal() and test cases

#### Changed
* Simplified some of the DateTimes test cases' names

#### Removed
* Old .js test files that were forgotten after test files were renamed with *Test suffix


--------
### [0.4.0](https://github.com/TeamworkGuy2/ts-mortar/commit/92a3fddc387e29d4a65739fdd1837c14a54b4042) - 2016-03-29
#### Added
* Arrays max() and min() for numeric arrays

#### Changed
Renamed Arrays functions:
* getAllProp() -> pluck()
* findAllProp() -> findMatchingProps()
* findOneByProp() -> firstProp() and removed duplicate findProp() which had less optional parameters to customize behavior
* findOne() -> first() and removed duplicate first() which had less optional parameters to customize behavior


--------
### [0.3.10](https://github.com/TeamworkGuy2/ts-mortar/commit/b684268593e2dcbb915a85b5190c042983f0815a) - 2016-03-19
#### Added
* Objects.invert() and test cases


--------
### [0.3.9](https://github.com/TeamworkGuy2/ts-mortar/commit/46eda81694cd4c72cbcb149b9a9b07695b45d234) - 2016-02-17
#### Added
* Functions wrap1Arg(), wrap2Arg(), and wrap3Arg() functions that creates a function that calls another function with baked in arguments


--------
### [0.3.8](https://github.com/TeamworkGuy2/ts-mortar/commit/6e686931104e0a44e47cfb631f8e0d6b29bd89d6) - 2016-01-30
#### Added
* Arrays isOneItem() and getIfOneItem() and test cases


--------
### [0.3.7](https://github.com/TeamworkGuy2/ts-mortar/commit/dfe7b80c56a802a9f254a144f46df0a719fa41c7) - 2016-01-22
#### Fixed
* Objects.extend() to support get and set properties using Object.defineProperty()


--------
### [0.3.6](https://github.com/TeamworkGuy2/ts-mortar/commit/5f2d79c145be136ed13f8c784cc116c5f819ed28) - 2015-12-22
#### Added
* Arrays.swap() and test cases


--------
### [0.3.5](https://github.com/TeamworkGuy2/ts-mortar/commit/1bc4dab8b8218aa8a4de25ac1e109421ba79e098) - 2015-12-18
#### Added
* EnumCreator test cases
* Added Objects.extend() 'deepExtend' flag

#### Changed
* Renamed test files to all file names follow the *Test suffix convention
* Arrays.hasItems() uses type guard return type
* Changed Objects.extendToStatic() 'allowChildToOverride' flag default value from true -> false

#### Fixed
* Fixed Objects.extend() bug that wasn't obeying the 'allowChildToOverride' flag
* Added EnumCreator flag to throw an error if an enum constant is missing


--------
### [0.3.4](https://github.com/TeamworkGuy2/ts-mortar/commit/810f3cf9858565f7139b1e374dd6909de07b1d4a) - 2015-12-11
#### Changed
* Added optional 'keys' (string[]) parameters to clone(), assign(), and assignAll() to only assign or clone certain properties from the source object


--------
### [0.3.3](https://github.com/TeamworkGuy2/ts-mortar/commit/ad8aa03b2482e242ea1b4915dcb56693a28cdd92) - 2015-12-10
#### Added
* Added Objects assign() and assignAll() for copying properties from one object to another, clone() and cloneDeep() to copy objects, and test cases


--------
### [0.3.2](https://github.com/TeamworkGuy2/ts-mortar/commit/911d5a062599b07131b484bc46c22201ac31b8a0) - 2015-11-25
#### Added
* Strings.clamp() to chop string to a max length and test cases

#### Changed
Added comments back to compiled .js files


--------
### [0.3.1](https://github.com/TeamworkGuy2/ts-mortar/commit/448a09cf467a7aae79770383dd04b3668dc3b666) - 2015-11-13
#### Changed
Renamed /tsDefinitions/ -> /definitions/ folder for .d.ts files

#### Removed
Did not commit '.d.ts' files, since these are just files copied from the [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) project


--------
### [0.3.0](https://github.com/TeamworkGuy2/ts-mortar/commit/92b2220139720dff4812b58a16aa0646afb9d1fd#diff-b9cfc7f2cdf78a7f4b91a753d10865a2) - 2015-11-13
#### Changed
* Renamed Arrays spliceArray() -> splice()


--------
### [0.2.0](https://github.com/TeamworkGuy2/ts-mortar/commit/58395f4304afa2a6d5763aef8952d90ca0d41ba5#diff-b9cfc7f2cdf78a7f4b91a753d10865a2) - 2015-11-10
#### Added
Simple event handlers in new /events/ sub folder, including:
* AsyncEventListenerList.ts - a wrapper for a ListenerList that stores asynchronous listeners and contains a fireEvent() function that handles calling asynchronous listeners
* EventListenerListImpl.ts - a list of listeners with functions for adding and removing listeners and firing events
* EventQueueImpl.ts - allows events to be added (internally queued) and then fired immediately or at a later time
* SigularEventHandler.ts - similar to jquery.read(), only fires once, listeners added before the event, get called when the event occurs; listeners added after the event, get called immediately
* events.d.ts - interface definitions for EventQueue and ListenerList


--------
### [0.1.1](https://github.com/TeamworkGuy2/ts-mortar/commit/4838a0fbf3bc0d74bd249330245333a7a46ce89a) - 2015-11-10
#### Changed
* Narrowed Objects.values() parameter types


--------
### [0.1.0](https://github.com/TeamworkGuy2/ts-mortar/commit/68b049e306cbbd78f62d5217830ed59b59f5d988#diff-b9cfc7f2cdf78a7f4b91a753d10865a2) - 2015-11-7
#### Added
* qunit tests for utils/Objects and date-time/DateTimes

#### Changed
* Widened Objects values() and valuesNotNull() parameter types
* Changed DateTimes and nested classes to modules (since they're helper functions and should never be instantiated)
* Renamed DateTimes toDotNetJsonTimestamp() -> toDotNetJson()

#### Removed
* Objects.orNull() because it's so simple to type 'value != null ? value : null' or even 'value || null'


--------
### [0.0.3](https://github.com/TeamworkGuy2/ts-mortar/commit/06f6c81d10fc376982f771e88d8307c0fd4b99fb) - 2015-11-6
#### Changed
Added EnumCreator.initEnumClass() strongly typed function parameters

#### Removed
Old unused Dates.js file that was accidential commited


--------
### [0.0.2](https://github.com/TeamworkGuy2/ts-mortar/commit/39401de4a5793baaf063e31a5a088de06c7a7ad9) - 2015-11-6
#### Added
* DateTimes.ts: parseDotNetJson(), toDotNetJsonTimestamp(), getDayMinutes(), toDisplayDate(), toDisplayDateTime(), dayDiff(), currentTimezoneOffsetMillis(), now(), toDate(), parseDotNetJson(), toDotNetJson(), toUtcDotNetJson(), getDayMinutes(), toDisplayDate(), toDisplayDateTime()
* Defer.ts: newDefer(), newPromiseResolved(), newPromiseRejected(), when1(), when2(), when3(), when4(), when(), runActionForAll(), runActionForAllInSeries(), chainTo(), chainToWith(), createCachedDeferredTask(), createCachedPromiseTask()
* Arrays filterSplit() and toBiFilterResult()
* tspromises.d.ts

#### Changed
Renamed project folder from TsMortar -> ts-mortar


--------
### [0.0.1](https://github.com/TeamworkGuy2/ts-mortar/commit/02a1f2dc9e4c3aedff32822a9a6e568b068572de) - 2015-11-05
#### Added
Initial commit including:
* Arrays.ts: addAll(), addAllTransform(), asArray(), binarySearch(), concat(), containsAll(), clear(), diff(), fastRemove(), fastRemoveIndex(), findAllProp(), findProp(), findOne(), findOneByProp(), first(), getAllProp(), hasItems(), indexOfProp(), last(), lastIndexOfProp(), looseDiff(), looseEqual(), mapFilter(), mapFilterNotNull(), removeValue(), removeIndex(), setAllProp(), sortNumeric(), spliceArray(), union(), unique()
* EnumCreator.ts: isInstance(), parse(), values(), name(), toString(), initEnumConst(), initEnumClass()
* Functions.ts: applyFunc(), callFunc(), isFunction(), tryCatch(), lazyField(), lazyGetter1Arg(), lazyGetter2Arg(), createFuncTimer()
* Numbers.ts: isNumeric(), toNumber(), isNullOrZero(), getNullableNumeric(), roundTo(), getNullableNumericPercent(), orZero(), format(), formatNumeric()
* Objects.ts: values(), valuesNotNull(), hasAnyNonFalseyProps(), hasAnyNonNullProps(), hasNonNullProps(), hasMatchingProps(), coalesce(), orNull(), getProp(), getProps(), orEmptyString(), extend(), extendToStatic()
* Strings.ts: endsWith(), isNullOrEmpty(), isNullOrWhiteSpace(), isCharAtDigit(), isDigit(), isCharAtUpperCase(), isCharAtLowerCase(), looseEqual(), padZeroLeft(), padLeft(), padRight(), removeLeading(), removeTrailing(), replaceAll()
* qunit tests for many of these functions
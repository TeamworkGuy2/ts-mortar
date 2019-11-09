# Change Log
All notable changes to this project will be documented in this file.
This project does its best to adhere to [Semantic Versioning](http://semver.org/).


--------
### [0.19.1](N/A) - 2019-11-9
#### Changed
* Adjusted `Arrays.toMap()` code to compile in other projects when `ts-mortar` is included as a library


--------
### [0.19.0](https://github.com/TeamworkGuy2/ts-mortar/commit/e9b007c46ca7389494199db01d53b3005f67a7f4) - 2019-11-8
#### Added
* `Arrays.toMap()` which maps an array to an object/map using a specific property of each object as the key
* Added optional `distinct` parameter to `Arrays.pluck()`

#### Changed
* Renamed `Arrays.unique()` -> `Arrays.distinct()`


--------
### [0.18.2](https://github.com/TeamworkGuy2/ts-mortar/commit/4f273897a2a4974d8f7ffb8b7f992cfdc76d9d66) - 2019-11-08
#### Changed
* Update to TypeScript 3.7


--------
### [0.18.1](https://github.com/TeamworkGuy2/ts-mortar/commit/55218d9aa824f5e94cd24a9041c78794bc86dd58) - 2019-08-09
#### Added
* Added `Numbers.toFixed()` implementation that correctly rounds (JavaScript `Number.toFixed()` doesn't round certain decimal values ending with '5' correctly)

#### Fixed
* `Numbers.roundTo()` bug with certain decimal values ending with '5' (using new `toFixed()` implementation)
* `Numbers.format()` and `Numbers.formatNumeric()` to use the new `toFixed()` implementation


--------
### [0.18.0](https://github.com/TeamworkGuy2/ts-mortar/commit/28a295247e29fb092c72efb0deba4290e9a41a63) - 2019-06-17
#### Changed
* Renamed `Arrays.hasItems()` -> `hasAny()`
* Renamed `Strings.clamp()` -> `truncate()`
* Unit tests cleanup
* Update to TypeScript 3.5


--------
### [0.17.0](https://github.com/TeamworkGuy2/ts-mortar/commit/9a8801a165ece68bf58e0931aed697bb93f3951c) - 2019-05-17
#### Added
* `Arrays.diffPartsCustomEquality()` for custom array symmetric difference calculating 

#### Changed
* `Arrays.diff()` has an additional optional 'equal' function parameter to allow for custom equality when comparing arrays
* Arrays changed several '[]' parameter types to 'ArrayLike<...>'

#### Removed
* `Arrays.copy()` since `.slice()` is preferred and faster in most JS environments

#### Fixed
* `Arrays.splice()` bug when removing items without inserting any


--------
### [0.16.1](https://github.com/TeamworkGuy2/ts-mortar/commit/bd77df72b1c01c893a19a113de655255aba72949) - 2019-03-18
#### Changed
* `Objects.valuesNotNull()` parameter types improved to match `Objects.values()`


--------
### [0.16.0](https://github.com/TeamworkGuy2/ts-mortar/commit/6759cb37e97246aa5f6b610e4d683bf6aac56a47) - 2019-03-13
#### Changed
* Renamed `Objects.extend()` -> `Objects.extendPrototype()`
* `Strings.padStart()` and `Strings.padEnd()` now use `String.prototype.repeat` internally which may not be available on older platforms without a polyfill. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat#Polyfill

#### Removed
* Removed `Objects.getProps()`, use `Objects.values()` instead
* Removed `Numbers.getNullableNumeric()` and `Numbers.getNullableNumericPercent()` since they designed for use with jquery and this library is designed for simple, platform/library agnostic use.
* Removed `Strings.endsWith()` since it contained bugs with empty strings and strings containing the search string multiple times (not just at the end). Use JS built-in `String.prototype.endsWith` or a polyfill on older platforms, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith#Polyfill

#### Fixed
* `Strings.isDigit()` no longer returns true for empty strings since `parseFloat("")` returns `NaN`


--------
### [0.15.11](https://github.com/TeamworkGuy2/ts-mortar/commit/24a0f729125cb9989ef54dc5650cace9f51f3292) - 2019-01-30
#### Changed
* Documentation better matches jsdoc syntax

#### Fixed
* Fix `Arrays.splice()` not copying input array properly when `copyToNewAry` is `true`


--------
### [0.15.10](https://github.com/TeamworkGuy2/ts-mortar/commit/1707970b4a36e9a00593c9912ab7e29d55d26b37) - 2018-12-29
#### Changed
* Update to TypeScript 3.2 and fix compile errors
* Update dev dependencies and @types

#### Fixed
* Fix `Arrays.splice()` not handling null 'origAry' and 'insertAry' parameters


--------
### [0.15.9](https://github.com/TeamworkGuy2/ts-mortar/commit/9fd8584c7b8b6f641a82ce94334e7f9cb401cbff) - 2018-11-05
#### Fixed
* Fix `Functions.lazyField()` issue with initializer functions which return null


--------
### [0.15.8](https://github.com/TeamworkGuy2/ts-mortar/commit/d0a9b09c2c38cea760cb40218caea1c262a18f90) - 2018-10-14
#### Changed
* Update to TypeScript 3.1
* Update dev dependencies and @types
* Enable `tsconfig.json` `strict` and fix compile errors
* Removed compiled bin tarball in favor of git tags


--------
### [0.15.7](https://github.com/TeamworkGuy2/ts-mortar/commit/8114985744285d59a673f2bc1330cb79f8e0c234) - 2018-04-09
#### Changed
* Added release tarball and npm script `build-package` to package.json referencing external process to generate tarball


--------
### [0.15.6](https://github.com/TeamworkGuy2/ts-mortar/commit/c20bc5791b1f80017e99f2539ddac3e111c1b6d2) - 2018-04-02
#### Changed
* Update tsconfig.json with `noImplicitReturns: true` and `forceConsistentCasingInFileNames: true`


--------
### [0.15.5](https://github.com/TeamworkGuy2/ts-mortar/commit/920e04f133d2f3fca2928fe388b6ff7ed413cb1f) - 2018-03-29
#### Changed
* Update to TypeScript 2.8
* Added optional `propName` parameter to `Arrays.unique()`


--------
### [0.15.4](https://github.com/TeamworkGuy2/ts-mortar/commit/054f9f69a8e611e0550208ae27eff802243bc001) - 2018-03-01
#### Changed
* Added `offset` parameter to `Arrays.indexOfProp()` to allow searching the array starting at an offset.  Same behavior as Array<T>.indexOf(T, number).


--------
### [0.15.3](https://github.com/TeamworkGuy2/ts-mortar/commit/d847a9889457b86711d317e80b992cf2554f5d2e) - 2018-02-28
#### Changed
* Update to TypeScript 2.7
* Update dependencies: mocha, @types/chai, @types/mocha, @types/node
* Enable tsconfig.json `noImplicitAny`


--------
### [0.15.2](https://github.com/TeamworkGuy2/ts-mortar/commit/6ecf83301db6ca33c543f3f4eb5e570301f7f4f7) - 2018-01-08
#### Changed
* Updated README.md

#### Fixed
* Fix issue with Strings.clamp() handling empty and whitespace strings


--------
### [0.15.1](https://github.com/TeamworkGuy2/ts-mortar/commit/adf992694ae2e525fe5978792f8aa1a4faa47bbc) - 2017-11-16
#### Fixed
* Fixed some minor issues with TypeScript null types depending on compiler version


--------
### [0.15.0](https://github.com/TeamworkGuy2/ts-mortar/commit/d049a904703969f4df91952d267d589a93425d4c) - 2017-10-28
#### Changed
* Added `strictNullChecks` to `tsconfig.json` and updated code to handle null types

#### Removed
* `String.padZeroLeft(str, len)` since `padLeft(str, len, '0')` is the same number of characters


--------
### [0.14.3](https://github.com/TeamworkGuy2/ts-mortar/commit/670e443745d02e709cdd2d0c324fb56059b11563) - 2017-08-18
#### Changed
* `Numbers.isNumeric()` return type changed back to `boolean` from `n is number` since that was incorrect
* `Numbers.getNullableNumeric()` accepts a 2nd, optional, `decimalPlaces` parameter
* Updated Numbers unit tests


--------
### [0.14.2](https://github.com/TeamworkGuy2/ts-mortar/commit/69a237fc55a63146e1c0f628b3f64f0075b3b2eb) - 2017-08-05
#### Changed
* Update to TypeScript 2.4


--------
### [0.14.1](https://github.com/TeamworkGuy2/ts-mortar/commit/87f81f1fc16fd0921dcb099442a7421298b8fde4) - 2017-06-18
#### Changed
* Improved Objects.assignAll() type definition


--------
### [0.14.0](https://github.com/TeamworkGuy2/ts-mortar/commit/6d234b9f29a3e8503975ffbb0f64611388626cbb) - 2017-06-18
#### Changed
* Tightened parameter types
* Updated some documentation

#### Removed
* Removed Objects.orEmptyString() since it doesn't save much typing
* Removed Arrays.ArrayLike<T> interface (since it's now native to the TypeScript ES6 lib.d.ts)
* Removed Arrays interface: ForEachFunc<T>, FilterFunc<T>, MapFunc<T, R> (since these tend to obfuscate function signatures, it's preferred to manually write these types were needed)


--------
### [0.13.2](https://github.com/TeamworkGuy2/ts-mortar/commit/de2bb7286550ae317fb9c8440400646d6eef59d5) - 2017-05-08
#### Changed
* Updated to TypeScript 2.3.0 and @types definitions


--------
### [0.13.1](https://github.com/TeamworkGuy2/ts-mortar/commit/b4da708a69cfbb1ab30d8440f5e73246939e0a83) - 2017-04-05
#### Added
* Added Arrays.sum()


--------
### [0.13.0](https://github.com/TeamworkGuy2/ts-mortar/commit/578fa707ce5408c719fe5c35ec2d067fc881e34a) - 2017-03-21
#### Changed
* Renamed Strings padZeroLeft() -> padZeroStart(), padLeft() -> padStart(), and padRight() -> padEnd() to align with new JS spec

#### Fixed
* String pad*() issue where non-string value could be returned if its string representation length was greater than or equal to the 'targetLen' length


--------
### [0.12.1](https://github.com/TeamworkGuy2/ts-mortar/commit/734626d660af137b4035f8e3f7898f24a8f90e47) - 2017-03-02
#### Added
* Arrays.count() and cleaned up ArraysTest cases


--------
### [0.12.0](https://github.com/TeamworkGuy2/ts-mortar/commit/3d8e979f9909faf3ba4af1b4045d90925e8efe31) - 2017-01-22
Major changes to use new TypeScript 2.0 features
#### Changed
* hasMatchingProperties() passes a second parameter, the property name, to the 'filter' function parameter
* Stronger parameter types (mostly `keyof` changes) for:
  * Arrays: binarySearch(), findMatchingProps(), firstProp(), pluck(), hasItems(), indexOfProp(), lastIndexOfProp(), setAllProp()
  * Objects: hasAnyNonFalseyProps(), hasAnyNonNullProps(), hasNonNullProps(), hasMatchingProps(), clone(), map(), toArray()


--------
### [0.11.1](https://github.com/TeamworkGuy2/ts-mortar/commit/a5917701fe457a92b06a8b7f23f5e1c2a5f040c3) - 2016-12-21
#### Changed
Minor changes for TypeScript 2.0 compatibility


--------
### [0.11.0](https://github.com/TeamworkGuy2/ts-mortar/commit/0844ee286c3261a14dd5c85908b0919c0ad7118f) - 2016-09-19
#### Changed
* Updated 'q' and 'mocha' dependencies to latest versions

#### Removed
* Moved events/ to separate [ts-event-handlers-lite](https://github.com/TeamworkGuy2/ts-event-handlers-lite) library


--------
### [0.10.2](https://github.com/TeamworkGuy2/ts-mortar/commit/1ad592bb8ff59ad31a74cdcb19199aa2ff7b1d11) - 2016-09-19
#### Changed
* Adjusted padLeft() and padRight() corner case to skip unnecessarily working with an empty array
* Refactored Strings unit tests


--------
### [0.10.1](https://github.com/TeamworkGuy2/ts-mortar/commit/e9945dcf10af13f3dfeb5f72864913fdac03c01e) - 2016-09-17
#### Changed
* Added some (by default) redudant type casts so this library can work with ts-date-times if the built in Date class/methods are setup to return TimestampUtc instead of number


--------
### [0.10.0](https://github.com/TeamworkGuy2/ts-mortar/commit/f6b40e23c7430cc977f0d7fc5a622191ec1d471e) - 2016-08-28
#### Removed
* Removed DateTimes - moved to new [ts-date-times](https://github.com/TeamworkGuy2/ts-date-times) library


--------
### [0.9.2](https://github.com/TeamworkGuy2/ts-mortar/commit/6d9bc41c118cfa3b14219954ce721cc52643d20c) - 2016-08-23
#### Added
* Objects cloneNonUndefined() and assignNonUndefined()

#### Changed
* Objects.clone() now supports an optional 'assigner' function parameter to allow the caller to override the default 'assign' implementation
* Updated definition file paths to match DefinitelyTyped


--------
### [0.9.1](https://github.com/TeamworkGuy2/ts-mortar/commit/c80dd5346831cf48e162ee14ba9f6e04b858d9d5) - 2016-08-08
#### Added
* Added enum-creator.d.ts with EnumType and EnumMember interfaces

#### Changed
* Moved EnumType and EnumMember interfaces from EnumCreator to enum-creator.d.ts


--------
### [0.9.0](https://github.com/TeamworkGuy2/ts-mortar/commit/0618b26f04bfd93d2004ae9008fb348f44fe55f4) - 2016-06-07
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
* Renamed EventListenerListImpl -> EventListenerList
* Renamed EventQueueImpl -> EventQueue

#### Removed
* Defer and tspromises.d.ts have moved to the new [ts-promises](https://github.com/TeamworkGuy2/ts-promises) library


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
# Arrays

Array methods can be overridden on prototypes.

Array methods can be overridden on instances.

## Minor

- `#clear`
-- Empties the array in place.

- `#compact`
-- Returns a new array with all `undefined` values removed.

- `#empty`
-- Returns `true` if *self* has no elements, `false` otherwise.

- `#sample`
-- Returns a random value from the array. `undefined` if the array is empty.

- `#size`
-- Returns the length of the array.

- `#uniq`
-- Returns a new array with all duplicate values removed.

## Major

- `#assoc(key)`
-- Returns the first object in the array who has a property matching the key given.

```
[{a: 1}, {b: 2}, {c: 3, b: 4}].assoc('b')
>> {b: 2}
```

- `#cycle(n, callback, after)`
-- Iterates *n* times, iterating on each element in *self* passing the element, the element's index, and the current iteration number to the *callback* function. Returns *after*, or the return value of invoking *after* if it is a function.

- `#delete(value)`
-- Removes all values that are strictly equal to *value* from the array. Modifies the original array. Returns the last value, or `null` if no values match.

- `#drop()`
-- is an alias of `Array.protoype.slice()`

- `#fetch(index, substitute)`
-- Finds element at given index - index can be negative to start from the end of the array. Returns the index, unless the index is `undefined`, then the substitute is returned.

```JavaScript
[1,2].fetch(1)
>> 2
[1, 2].fetch(5, 'foo')
>> 'foo'
```

- `#reject(test)`
-- Returns a new array containing with the elements that matched the *test* removed.

```JavaScript
[1, '2', 3].reject(function (e) {return typeof e === 'number'});
>> ['2']
```

- `#select`
-- is an alias of `Array.prototype.filter()`

- `#take(n)`
-- Returns a new array containing the first *n* elements of the original array.

```JavaScript
[1, 2, 3, 4].take(2)
>> [1, 2]
```

- `#valuesAt(args*)`
-- Returns a new array containing each value from each suppiled index in the list of arguments. Out of bounds indices give `undefined`.

```JavaScript
[1, 2, 3].valuesAt(0, 2, 10)
>> [1, 3, undefined]
```

- `#zip()`
-- Returns an array of arrays that is the same length as the original array. Each array contains the values of the original arrays' values at each index.

```JavaScript
[1,2].zip(['a', 'b',], ['x', 'y',], ['shorter'])
>> [ [ 1, 'a', 'x', 'shorter' ], [ 2, 'b', 'y', undefined ] ]
```

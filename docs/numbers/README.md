# Numbers

Number methods can be overridden on prototypes.

Number methods can **not** be overridden on instances.

## Minor

- `#abs`
-- Returns the absolute value.

- `#abs2`
-- Returns the value sqared.

- `#arg`
-- Returns PI if negative, `0` otherwise.

- `#ceil`
-- Returns the largest integer greater than or equal to *self*.

- `#even`
-- Returns `true` if number is even, `false` otherwise.

- `#finite`
-- Returns `true` if number is in the finite range, `false` otherwise.

- `#floor`
-- Returns the largest integer less than or equal to *self*.

- `#integer`
-- Returns `true` if value is an integer, `false` otherwise.

- `#next`
-- Returns *self* `+ 1` if *self* is an integer.

- `#nonzero`
-- Return *self* if value is not `0`, `false` otherwise.

- `#polar`
-- Returns an array containing the absolute value, and either PI if the value was negative, or `0` otherwise.

```JavaScript
(-5).polar
>> [5, 3.141592653589793]
```

- `#pred`
-- Returns *self* `- 1` if *self* is an integer.

## Major

- `#downto(limit, fn, after)`
-- Iterates the given function, passing in integer values from *self* down to and including limit.. Optional second parameter: if *after* is a function, the return value from `#times` is the return value of invoking that function. If *after* is anything else, that is the return value.

- `#times(fn, after)`
-- Loops `1`-*self* times, invoking `fn` each time. First parameter passed to `fn` is is the current loop number. Optional second parameter: if *after* is a function, the return value from `#times` is the return value of invoking that function. If *after* is anything else, that is the return value.

- `#upto(limit, fn, after)`
-- Iterates the given block, passing in integer values from *self* up to and including limit. Optional second parameter: if *after* is a function, the return value from `#times` is the return value of invoking that function. If *after* is anything else, that is the return value.
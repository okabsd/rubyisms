# Numbers

Number methods can be overridden on prototypes.
Number methods can **not** be overridden on instances.

## Minor

- `#abs`
-- Returns the absolute value.

- `#abs2`
-- Returns the value sqared.

- `#arg`
-- Returns PI if negative, 0 otherwise.

- `#ceil`
-- Reuturn the largest integer greater than or equal to *self*.

- `#finite`
-- Returns true if number is in the finite range, false otherwise.

- `#floor`
-- Returns the largest integer less than or equal to *self*.

- `#integer`
-- Returns true if value is an integer, false otherwise.

- `#nonzero`
-- Return *self* if 

- `#polar`
-- Returns an array containing the absolute value, and either PI if the value was negative, or 0 otherwise.

```JavaScript
(-5).polar
>> [5, 3.141592653589793]
```


## Major
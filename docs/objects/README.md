# Objects

Object methods can be overridden on prototypes.

Object methods can be overridden on instances.

Object methods extend to all prototypes.

## Minor

- `#array`
-- Returns `true` if *self* is an array, `false` otherwise.

- `#bool`
-- Returns `true` if *self* is a boolean, `false` otherwise.

- `#empty`
-- Returns `true` if *self* has no own properties, `false` otherwise. Returns undefined on non-objects. *Note: **Array** and **String** have their own `#empty` methods.*

- `#func`
-- Returns `true` if *self* is a function, `false` otherwise.

- `#numeric`
-- Returns `true` if *self* is a numeric value, `false` otherwise. `NaN` is *not* numeric, `Infinity` is.

- `#object`
-- Returns `true` if *self* is an object.

- `#size`
-- For objects, returns the number of *own* properties.
-- Size returns a value specific to each type. See individual documentation.

- `#string`
-- Returns `true` if *self* is a string value, `false` otherwise.

- `#type`
-- Returns a string representation of *self's* type.


## Major

- `#eql(value)`
-- Returns `true` if *self* strictly equals the supplied argument, `false` otherise.
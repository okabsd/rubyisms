# Booleans

Boolean methods can be overridden on prototypes.
Boolean methods can **not** be overridden on instances.

## Minor

- `#not`
-- Returns the inverse boolean value.

```JavaScript
true.not
>> false
false.not
>> true
```

- `#size`
-- Returns `1` if `true`, `0` if `false`

## Major
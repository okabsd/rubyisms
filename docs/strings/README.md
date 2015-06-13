# Strings

String methods can be overridden on prototypes.
String methods can **not** be overridden on instances.

## Minor

- `#capitalize`
-- Returns a copy of the string with the first character in uppercase.

- `#chars`
-- Returns an array of all characters in the string.

- `#chop`
-- Returns a new string with the last character removed.

- `#chr`
-- Returns the first character in the string.

- `#downcase`
-- Alias of `String.prototype.toLowerCase()`.

- `#empty`
-- Returns `true` if string length is `0`, `false` otherwise

- `#reverse`
-- Returns a new string with the characters in reverse order.

- `#size`
-- Returns the length of the string.

- `#swapcase`
-- Returns a new string with lowercase character turned uppercase, and uppercase characters turned lowercase.

- `#upcase`
-- Alias of `String.prototype.toUpperCase()`.

## Major

- `#prepend(val)`
-- Returns a new string with *val* added to the beginning of the string.
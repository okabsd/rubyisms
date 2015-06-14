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
-- Returns string with all character to lowercase.

- `#empty`
-- Returns `true` if string length is `0`, `false` otherwise

- `#reverse`
-- Returns a new string with the characters in reverse order.

- `#size`
-- Returns the length of the string.

- `#swapcase`
-- Returns a new string with lowercase character turned uppercase, and uppercase characters turned lowercase.

- `#upcase`
-- Returns string with all characters to uppercase;

## Major

- `#each(fn, after)`
-- Iterates through the string. *fn* is passed the current character, and the index. Optional second parameter: if *after* is a function, the return value from `#each` is the return value of invoking that function. If *after* is anything else, that is the return value.

- `#prepend(val)`
-- Returns a new string with *val* added to the beginning of the string.
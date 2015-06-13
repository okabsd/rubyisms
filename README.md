<p align="center">
  <a href="https://www.npmjs.com/package/rubyisms">
    <img src="http://i.imgur.com/Gx7OFGO.png" />
  </a>
</p>

# Rubyisms

**Ruby style ES5 prototype extensions**

## Info

A highly experimental set of prototype extensions for native types in ES5 JavaScript.

## Install

Using [npm](https://www.npmjs.com/).

    npm install rubyisms

## Documentation

~~Full~~ list of methods [here](https://github.com/Oka-/rubyisms/tree/master/docs).

## Issues

### `Object.prototype`

Rubyisms defines properties on `Object.prototype`. A side effect is the creation of globally scoped *constants*. The following should be treated as reserved keywords in the global scope, and are not writable.

- `array`
- `bool`
- `func`
- `numeric`
- `object`
- `size`
- `type`

*Everything* created will contain these as prototype properties. To override these properties on objects you must define them during construction, or explicitly define them with `Object.defineProperty`.

No good.

```JavaScript
var o = {};
o.size = 5 // Will not write
o.size // 0

function Constructor () {
	this.size = 5; // Will not write
}

new Constructor().size // 0

```

Better.

```JavaScript
var o = {size: 5};
o.size // 5

function Constructor () {
	Object.defineProperty(this, 'size', {
		value: 5,
		writable: true
	});
}

new Constructor().size // 5

```

### `.type`

Return values from calling `.type` on the global object will differ. In V8 (Chrome, Node), the return string is `'global'`, whereas in other browsers it is `'window'`.
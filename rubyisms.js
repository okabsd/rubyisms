// Colin 'Oka' Hall-Coates
// http://oka.io <yo@oka.io>
// MIT, 2016

;(function (G) {
'use strict';

// Prototypes
var
ArrayPrototype    = Array.prototype,
BooleanPrototype  = Boolean.prototype,
FunctionPrototype = Function.prototype,
NumberPrototype   = Number.prototype,
ObjectPrototype   = Object.prototype,
StringPrototype   = String.prototype;

// Types
var
ArrayType     = '[object Array]',
BooleanType   = '[object Boolean]',
FunctionType  = '[object Function]',
NullType      = '[object Null]',
NumberType    = '[object Number]',
ObjectType    = '[object Object]',
StringType    = '[object String]',
UndefinedType = '[object Undefined]';

// Regular Expressions
var
SymbolWithCombiningMarks = /([\0-\u02FF\u0370-\u1AAF\u1B00-\u1DBF\u1E00-\u20CF\u2100-\uD7FF\uE000-\uFE1F\uFE30-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])([\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]+)/g,
SurrogatePair = /([\uD800-\uDBFF])([\uDC00-\uDFFF])/g,
CRLF = /\r\n/;

// Utilities
var
toString = ObjectPrototype.toString;

/* jshint -W040 */
function define (property, value) {
  var isObject = (toString.call(this) === ObjectType);

  Object.defineProperty(this, property, {
    value: value,
    writable: true,
    enumerable: isObject,
    configurable: true
  });
}
/* jshint +W040 */

function strap (property, method) {
  return { get: method, set: function (value) {
    define.call(this, property, value);
  }, configurable: true };
}

function minor (prototype, object, callback) {
  Object.keys(object).forEach(function (key) {
    if (!prototype.hasOwnProperty(key)) {
      Object.defineProperty(prototype, key, strap(key, object[key]));
      if (callback) callback(key);
    }
  });
}

function major (prototype, object, callback) {
  Object.keys(object).forEach(function (key) {
    if (!prototype.hasOwnProperty(key)) {
      Object.defineProperty(prototype, key, {
        value: object[key],
        writable: true,
        configurable: true
      });
      if (callback) callback(key);
    }
  });
}

minor(ArrayPrototype, {
  clear: function () {
    while (this.length > 0) this.pop();
    return this;
  },
  compact: function () {
    var output = [],
        length = this.length,
        index = 0,
        current;

    for (; index < length; index++) {
      current = this[index];
      if (typeof current !== 'undefined') output.push(current);
    }

    return output;
  },
  empty: function () {
    return this.length < 1;
  },
  first: function () {
    return this[0];
  },
  last: function () {
    return this[this.length - 1];
  },
  sample: function () {
    return this[Math.floor(Math.random() * this.length)];
  },
  uniq: (function () {
    return (function () {
      var strings = {},
          booleans = {},
          numbers = {},
          undef = {},
          objects = [],
          output = [],
          pushFlag, objectCount, objectLength,
          item, type, length, index;

      length = this.length;
      index = 0;

      for (; index < length; index++) {
        item = this[index];
        type = toString.call(item);
        pushFlag = true;
        if (type === StringType && !strings.hasOwnProperty(item)) {
          strings[item] = true; output.push(item);
        } else if (type === BooleanType && !booleans.hasOwnProperty(item)) {
          booleans[item] = true; output.push(item);
        } else if (type === NumberType && !numbers.hasOwnProperty(item)) {
          numbers[item] = true; output.push(item);
        } else if (type === ObjectType ||
                   type === FunctionType ||
                   type === ArrayType) {
          objs:
          for (objectCount = 0, objectLength = objects.length;
            objectCount < objectLength; objectCount++) {
            if (objects[objectCount] === item) {
              pushFlag = false;
              break objs;
            }
          }
          if (pushFlag) {
            objects.push(item);
            output.push(item);
          }
        } else if ((type === UndefinedType || type === NullType) &&
                    !undef.hasOwnProperty(item)) {
          undef[item] = true; output.push(item);
        }
      }

      return output;
    });
  }())
});

minor(BooleanPrototype, {
  not: function () {
    return !this;
  }
});

minor(FunctionPrototype, {
  clone: function () {
    return this.bind(null);
  }
});

minor(NumberPrototype, {
  abs: function () {
    return Math.abs(this);
  },
  abs2: function () {
    return this * this;
  },
  arg: function () {
    return (this < 0 ? Math.PI : 0);
  },
  ceil: function () {
    return Math.ceil(this);
  },
  even: function () {
    return this.toFixed() == this && this % 2 === 0;
  },
  finite: function () {
    return isFinite(this);
  },
  floor: function () {
    return Math.floor(this);
  },
  integer: function () {
    return this.toFixed() == this && this !== Infinity;
  },
  next: function () {
    if (this.toFixed() != this || this === Infinity)
      throw new TypeError('Self must be integer');

    return this + 1;
  },
  nonzero: function () {
    return this !== 0 ? this : null;
  },
  odd: function () {
    return this.toFixed() == this && this % 2 !== 0;
  },
  polar: function () {
    return (isFinite(this) &&
      [Math.abs(this), (this < 0 ? Math.PI : 0)]) ||
        undefined;
  },
  pred: function () {
    if (this.toFixed() != this || this === Infinity)
      throw new TypeError('Self must be integer');

    return this - 1;
  },
  round: function () {
    return Math.round(this);
  },
  zero: function () {
    return this === 0;
  }
});

minor(ObjectPrototype, {
  array: function () {
    return toString.call(this) === ArrayType;
  },
  bool: function () {
    return toString.call(this) === BooleanType;
  },
  empty: function () {
    if (toString.call(this) === ObjectType)
      return Object.keys(this).length < 1;
  },
  func: function () {
    return toString.call(this) === FunctionType;
  },
  numeric: function () {
    return (toString.call(this) === NumberType) && (this === this);
  },
  object: function () {
    return toString.call(this) === ObjectType;
  },
  size: function () {
    var type = toString.call(this);

    if (
      type === ArrayType ||
      type === StringType ||
      type === FunctionType
    ) return this.length;
    else if (type === ObjectType) return Object.keys(this).length;
    else if (type === BooleanType) return (this ? 1 : 0);
    else if (type === NumberType && this === this) return this;
  },
  string: function () {
    return toString.call(this) === StringType;
  },
  type: function () {
    var type = toString.call(this).match(/\w+(?=\])/)[0].toLowerCase();
    return (type === 'number' && this !== this ? 'NaN' : type);
  }
}, function (key) {
  // Unset globals
  delete G[key];
});

minor(StringPrototype, {
  capitalize: function () {
    return this.charAt(0).toUpperCase() + this.substring(1);
  },
  chars: function () {
    var output = [],
        length = this.length,
        index = 0,
        current;

    for (; index < length; index++) {
      current = this.substr(index, 2);

      if (
        SurrogatePair.test(current) ||
        SymbolWithCombiningMarks.test(current)
      ) {
        output.push(current);
        index++;
      } else output.push(this.substr(index, 1));
    }

    return output;
  },
  chop: function () {
    var length = this.length,
        end = this.substr(length - 2, 2);

    return (
      CRLF.test(end) ||
      SurrogatePair.test(end) ||
      SymbolWithCombiningMarks.test(end)
    ) ? this.substr(0, length - 2) :
        this.substring(0, length - 1);
  },
  chr: function () {
    var front = this.substring(0, 2);

    return (SurrogatePair.test(front) ||
        SymbolWithCombiningMarks.test(front)) ?
        front : this.charAt(0);
  },
  downcase: function () {
    return this.toLowerCase();
  },
  empty: function () {
    return this.length < 1;
  },
  reverse: function esrever () {
    // Credit Mathias Bynens, github.com/mathiasbynens/esrever
    // Revised for Rubyisms
    var output = '',
        string,
        index;

    string = this
      .replace(SymbolWithCombiningMarks, function (_, $1, $2) {
        return esrever.call($2) + $1;
      })
      .replace(SurrogatePair, '$2$1');

    index = string.length;

    while (index--) output += string.charAt(index);

    return output;
  },
  swapcase: function () {
    var output = '',
        length = this.length,
        index = 0,
        current, up;

    for (; index < length; index++) {
      current = this[index];
      up = current.toUpperCase();
      output += (current === up ? current.toLowerCase() : up);
    }
    return output;
  },
  upcase: function () {
    return this.toUpperCase();
  }
});

major(ArrayPrototype, {
  assoc: function (key) {
    var length = this.length,
        index = 0,
        current;

    for (; index < length; index++) {
      current = this[index];

      if (toString.call(current) !== ObjectType) continue;
      if (current.hasOwnProperty(key)) return current;
    }
  },
  at: function (index) {
    if (!index)
      index = 0;
    else if (index < 0)
      index = this.length + index;

    return this[index];
  },
  count: function (obtest, usefunc) {
    var argc = arguments.length,
        count, index, length, element;

    if (argc < 1) throw new Error('1 argument expected, got: ' + argc);

    count = index = 0;
    length = this.length;
    usefunc = (typeof obtest === 'function') &&
      (typeof usefunc === 'undefined' ? true : usefunc);

    for (; index < length; index++) {
      element = this[index];

      if (
        (usefunc && obtest.call(this, element, index)) ||
        (!usefunc && element === obtest)
      ) count++;
    }

    return count;
  },
  cycle: function (count, callback, after) {
    var argc = arguments.length,
        cycle, index, length;

    if (argc < 2)
      throw new Error('cycle requires 2 arguments, ' + argc + ' given');
    else if (typeof callback !== 'function')
      throw new TypeError('Expected function');

    length = this.length;

    for (cycle = 1; cycle <= count; cycle++) {
      for (index = 0; index < length; index++) {
        callback.call(this, this[index], index, cycle);
      }
    }

    return (typeof after === 'function' ? after.call(this) : after);
  },
  delete: function (value) {
    var argc = arguments.length,
        index, current, last;

    if (argc < 1) throw new Error('No value given');

    index = this.length;
    last = null;

    while (index--) {
      current = this[index];

      if (current === value) {
        this.splice(index, 1);
        last = current;
      }
    }

    return last;
  },
  drop: ArrayPrototype.slice,
  fetch: function (index, substitute) {
    var length = this.length,
        value;

    if (typeof index !== 'number' || !isFinite(index))
      throw new TypeError('Expected number');
    else if (Math.abs(index) >= length && typeof substitute === 'undefined')
      throw new RangeError('Index out of bounds');

    if (index < 0)
      index = length + index;

    value = this[index];

    return (typeof value !== 'undefined' ? value : substitute);
  },
  reject: function (test) {
    var output, length,
        element, index;

    if (typeof test !== 'function')
      throw new TypeError('Excpected function');

    output = [];
    index = 0;
    length = this.length;

    for (; index < length; index++) {
      element = this[index];
      if (!test.call(this, element, index)) output.push(this[index]);
    }

    return output;
  },
  select: ArrayPrototype.filter,
  take: function (length) {
    return this.slice().splice(0, length);
  },
  valuesAt: function () {
    var argc = arguments.length,
        length = this.length,
        output = [],
        index = 0,
        position;

    if (length) for (; index < argc; index++) {
      position = arguments[index];

      if (position < 0)
        position = length + position;

      output.push(this[position]);
    }

    return output;
  },
  zip: function () {
    var argc = arguments.length,
        length = this.length,
        output = [],
        index = 0,
        tempArray, argIndex;

    for (; index < length; index++) {
      tempArray = [this[index]];

      for (argIndex = 0; argIndex < argc; argIndex++)
        tempArray.push(arguments[argIndex][index]);

      output.push(tempArray);
    }

    return output;
  }
});

major(BooleanPrototype, {});

major(FunctionPrototype, {});

major(NumberPrototype, {
  downto: function (end, callback, after) {
    var start = this;

    if (toString.call(end) !== NumberType || end.toFixed() != end)
      throw new TypeError('Integer value required');
    else if (start != start.toFixed() || start === Infinity)
      throw new TypeError('Self is not an integer');
    else if (typeof callback !== 'function')
      throw new TypeError('Expected function');

    for (; start >= end; start--) callback.call(this, start);

    return (typeof after === 'function' ? after.call(this) : after);
  },
  times: function (callback, after) {
    var start = 1,
        end = this;

    if (typeof callback !== 'function')
      throw new TypeError('Expected function');

    for (; start <= end; start++) callback.call(this, start);

    return (typeof after === 'function' ? after.call(this) : after);
  },
  upto: function (end, callback, after) {
    var start = this;

    if (toString.call(end) !== NumberType || end.toFixed() != end)
      throw new TypeError('Integer value required');
    else if (start != start.toFixed() || start === Infinity)
      throw new TypeError('Self is not an integer');
    else if (typeof callback !== 'function')
      throw new TypeError('Expected function');

    for (; start <= end; start++) callback.call(this, start);

    return (typeof after === 'function' ? after.call(this) : after);
  }
});

major(ObjectPrototype, {
  each: function (callback, after) {
    var keys, length, index, property;

    if (toString.call(this) !== ObjectType)
      return;
    else if (typeof callback !== 'function')
      throw new TypeError('Expected function.');

    keys = Object.keys(this);
    length = keys.length;
    index = 0;

    for (; index < length; index++) {
      property = keys[index];
      callback.call(this, property, this[property]);
    }

    return (typeof after === 'function' ? after.call(this) : after);
  },
  eql: function (object) {
    return this === object;
  },
  fetch: function (key, substitute) {
    if (toString.call(this) !== ObjectType)
      return;
    else if (arguments.length < 1)
      throw new Error('No value given');

    if (this.hasOwnProperty(key)) return this[key];

    return (typeof substitute === 'function' ?
      substitute.call(this, key) : substitute);
  }
});

major(StringPrototype, {
  each: function (callback, after) {
    var length,
        index;

    if (typeof callback !== 'function')
      throw new TypeError('Expected function');

    length = this.length;
    index = 0;

    for (; index < length; index++) {
      callback.call(this, this.charAt(index), index);
    }

    return (typeof after === 'function' ? after.call(this) : after);
  },
  prepend: function (object) {
    return object + this;
  }
});

}(this));

// Colin 'Oka' Hall-Coates
// http://oka.io <yo@oka.io>
// MIT, 2015

;(function (G) {
'use strict';

var _bin = {
  regex: {
    symbolWithCombiningMarks: /([\0-\u02FF\u0370-\u1AAF\u1B00-\u1DBF\u1E00-\u20CF\u2100-\uD7FF\uE000-\uFE1F\uFE30-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])([\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]+)/g,
    surrogatePair: /([\uD800-\uDBFF])([\uDC00-\uDFFF])/g
  },
  types: {
    arr  : '[object Array]',
    bool : '[object Boolean]',
    func : '[object Function]',
    nul  : '[object Null]',
    num  : '[object Number]',
    obj  : '[object Object]',
    str  : '[object String]',
    und  : '[object Undefined]'
  }
};

/* jshint -W040 */
function define (s, v) {
  var type = Object.prototype.toString.call(this),
      isObject = (type === _bin.types.obj);

  Object.defineProperty(this, s, {
    value: v,
    writable: true,
    enumerable: isObject,
    configurable: true
  });
}
/* jshint +W040 */

function strap (g, s) {
  return { get: g, set: function (v) {
    define.call(this, s, v);
  }, configurable: true };
}

function minor (prototype, o, callback) {
  for (var k in o) {
    if (o.hasOwnProperty(k) && !prototype.hasOwnProperty(k)) {
      Object.defineProperty(prototype, k, strap(o[k], k));
      if (callback) callback.call(null, k);
    }
  }
}

function major (prototype, o, callback) {
  for (var k in o) {
    if (o.hasOwnProperty(k) && !prototype.hasOwnProperty(k)) {
      Object.defineProperty(prototype, k, {
        value: o[k],
        writable: true,
        configurable: true
      });
      if (callback) callback.call(null, k);
    }
  }
}

minor(Array.prototype, {
  clear: function () {
    while (this.length > 0) this.pop();
    return this;
  },
  compact: function () {
    var output = [], current;

    for (var i = 0, length = this.length; i < length; i++) {
      current = this[i];
      if (typeof current !== 'undefined') output.push(current);
    }

    return output;
  },
  empty: function () {
    return this.length < 1;
  },
  sample: function () {
    return this[Math.floor(Math.random() * this.length)];
  },
  uniq: (function () {
    var arr  = _bin.types.arr,
        bool = _bin.types.bool,
        func = _bin.types.func,
        nul  = _bin.types.nul,
        num  = _bin.types.num,
        obj  = _bin.types.obj,
        str  = _bin.types.str,
        und  = _bin.types.und;

    return (function () {
      var s = {}, b = {}, n = {}, u = {}, o = [], r = [], i, c, p, item, type;

      for (i = 0; i < this.length; i++) {
        item = this[i];
        type = Object.prototype.toString.call(item);
        p = true;
        if (type === str && !s.hasOwnProperty(item)) {
          s[item] = true; r.push(item);
        } else if (type === bool && !b.hasOwnProperty(item)) {
          b[item] = true; r.push(item);
        } else if (type === num && !n.hasOwnProperty(item)) {
          n[item] = true; r.push(item);
        } else if (type === obj || type === func || type === arr) {
          objs:
          for (c = 0; c < o.length; c++) {
            if (o[c] === item) {
              p = false;
              break objs;
            }
          }
          if (p) {
            o.push(item);
            r.push(item);
          }
        } else if ((type === und || type === nul) && !u.hasOwnProperty(item)) {
          u[item] = true; r.push(item);
        }
      }

      return r;
    });
  }())
});

minor(Boolean.prototype, {
  not: function () {
    return !this;
  }
});

minor(Function.prototype, {
  clone: function () {
    return this.bind(null);
  }
});

minor(Number.prototype, {
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
    if (this.toFixed() != this || this === Infinity) {
      throw new TypeError('Self must be integer');
    }

    return this + 1;
  },
  nonzero: function () {
    return (this !== 0 ? this: null);
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
    if (this.toFixed() != this || this === Infinity) {
      throw new TypeError('Self must be integer');
    }

    return this - 1;
  },
  round: function () {
    return Math.round(this);
  },
  zero: function () {
    return this === 0;
  }
});

minor(Object.prototype, {
  array: function () {
    return Object.prototype.toString.call(this) === _bin.types.arr;
  },
  bool: function () {
    return Object.prototype.toString.call(this) === _bin.types.bool;
  },
  empty: function () {
    if (Object.prototype.toString.call(this) === _bin.types.obj) {
      return Object.keys(this).length < 1;
    }
  },
  func: function () {
    return Object.prototype.toString.call(this) === _bin.types.func;
  },
  numeric: function () {
    return (Object.prototype.toString.call(this) === _bin.types.num &&
      this === this);
  },
  object: function () {
    return Object.prototype.toString.call(this) === _bin.types.obj;
  },
  size: function () {
    var type = Object.prototype.toString.call(this);

    if (
      type === _bin.types.arr ||
      type === _bin.types.str ||
      type === _bin.types.func
    ) return this.length;
    else if (type === _bin.types.obj) return Object.keys(this).length;
    else if (type === _bin.types.bool) return (this ? 1 : 0);
    else if (type === _bin.types.num && this === this) return this;
  },
  string: function () {
    return Object.prototype.toString.call(this) === _bin.types.str;
  },
  type: function () {
    var type = Object.prototype.toString.call(this).match(/\w+(?=\])/)[0].toLowerCase();
    return (type === 'number' && this !== this ? 'NaN' : type);
  }
}, function (key) {
  // Unset globals
  //delete G[key];
});

minor(String.prototype, {
  capitalize: function () {
    return this.charAt(0).toUpperCase() + this.substring(1);
  },
  chars: function () {
    var output = [], current;

    for (var index = 0, length = this.length; index < length; index++) {
      current = this.substr(index, 2);

      if (
        _bin.regex.surrogatePair.test(current) ||
        _bin.regex.symbolWithCombiningMarks.test(current)
      ) {
        output.push(current);
        index++;
      } else {
        output.push(this.substr(index, 1));
      }
    }
    return output;
  },
  chop: function () {
    var length = this.length,
        end = this.substr(length - 2, 2);

    if (_bin.regex.surrogatePair.test(end) ||
        _bin.regex.symbolWithCombiningMarks.test(end)) {
      return this.substr(0, length - 2);
    } else {
      return this.substring(0, length - 1);
    }
  },
  chr: function () {
    var front = this.substring(0, 2);

    if (_bin.regex.surrogatePair.test(front) ||
        _bin.regex.symbolWithCombiningMarks.test(front)) {
      return front;
    } else {
      return this.charAt(0);
    }
  },
  downcase: function () {
    return this.toLowerCase();
  },
  empty: function () {
    return this.length < 1;
  },
  reverse: (function () {
    // Credit Mathias Bynens, github.com/mathiasbynens/esrever
    function rev (string) {
      var index, output = '';

      string = string
        .replace(_bin.regex.symbolWithCombiningMarks, function ($0, $1, $2) {
          return rev($2) + $1;
        })
        .replace(_bin.regex.surrogatePair, '$2$1');

      index = string.length;

      while (index--) output += string.charAt(index);

      return output;
    }

    return (function () {
      return rev(this);
    });
  }()),
  swapcase: function () {
    var current, up, output = '';

    for (var index = 0, length = this.length; index < length; index++) {
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

major(Array.prototype, {
  assoc: function (key) {
    var current;

    for (var index = 0, length = this.length; index < length; index++) {
      current = this[index];

      if (Object.prototype.toString.call(current) !== _bin.types.obj) continue;
      if (current.hasOwnProperty(key)) return current;
    }
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
  drop: Array.prototype.slice,
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
  select: Array.prototype.filter,
  take: function (length) {
    return this.slice().splice(0, length);
  },
  valuesAt: function () {
    var argc = arguments.length,
        length = this.length,
        output = [],
        index = 0,
        position;

    if (length) {
      for (; index < argc; index++) {
        position = arguments[index];

        if (position < 0) {
          position = length + position;
        }

        output.push(this[position]);
      }
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

      for (argIndex = 0; argIndex < argc; argIndex++) {
        tempArray.push(arguments[argIndex][index]);
      }

      output.push(tempArray);
    }

    return output;
  }
});

major(Boolean.prototype, {});

major(Function.prototype, {});

major(Number.prototype, {
  downto: function (n, fn, after) {
    var type = Object.prototype.toString.call(n);
    if (type !== _bin.types.num || n.toFixed() != n) {
      throw new TypeError('Integer value required');
    }
    if (this.toFixed() != this || this === Infinity) {
      throw new TypeError('Self is not an integer');
    }
    if (typeof fn !== 'function') throw new TypeError('Expected function');
    for (var i = this; i >= n; i--) {
      fn.call(this, i);
    }
    return (typeof after === 'function'? after.call(this) : after);
  },
  times: function (fn, after) {
    if (typeof fn !== 'function') throw new TypeError('Expected function');
    for (var i = 1; i <= this; i++) {
      fn.call(this, i);
    }
    return (typeof after === 'function'? after.call(this) : after);
  },
  upto: function (n, fn, after) {
    var type = Object.prototype.toString.call(n);
    if (type !== _bin.types.num || n.toFixed() != n) {
      throw new TypeError('Integer value required');
    }
    if (this.toFixed() != this || this === Infinity) {
      throw new TypeError('Self is not an integer');
    }
    if (typeof fn !== 'function') throw new TypeError('Expected function');
    for (var i = this; i <= n; i++) {
      fn.call(this, i);
    }
    return (typeof after === 'function'? after.call(this) : after);
  }
});

major(Object.prototype, {
  each: function (fn, after) {
    if (Object.prototype.toString.call(this) !== _bin.types.obj) return;
    if (typeof fn !== 'function') throw new TypeError('Expected function.');
    for (var k in this) {
      if (this.hasOwnProperty(k)) {
        fn.call(this, k, this[k]);
      }
    }
    return (typeof after === 'function'? after.call(this) : after);
  },
  eql: function (o) {
    return this === o;
  },
  fetch: function (v, r) {
    var type = Object.prototype.toString.call(this),
        args = Array.prototype.slice.call(arguments);
    if (type !== _bin.types.obj) return;
    if (args.length < 1) throw new Error('No value given');

    if (this.hasOwnProperty(v)) return this[v];

    return (typeof r === 'function' ? r.call(this, v) : r);
  }
});

major(String.prototype, {
  each: function (fn, after) {
    if (typeof fn !== 'function') throw new TypeError('Expected function');
    for (var i = 0, length = this.length; i < length; i++) {
      fn.call(this, this[i], i);
    }
    return (typeof after === 'function'? after.call(this) : after);
  },
  prepend: function (o) {
    return o + this;
  }
});

}(this));

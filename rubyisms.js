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
    var type = Object.prototype.toString.call(this);
    if (type === _bin.types.obj) {
      return Object.keys(this).length < 1;
    }
  },
  func: function () {
    return Object.prototype.toString.call(this) === _bin.types.func;
  },
  numeric: function () {
    return Object.prototype.toString.call(this) === _bin.types.num && this === this;
  },
  object: function () {
    return Object.prototype.toString.call(this) === _bin.types.obj;
  },
  size: function () {
    var type = Object.prototype.toString.call(this);
    if (type === _bin.types.arr ||
        type === _bin.types.str ||
        type === _bin.types.func) return this.length;
    else if (type === _bin.types.obj) return Object.keys(this).length;
    else if (type === _bin.types.bool) return (this ? 1 : 0);
    else if (type === _bin.types.num && this === this) return this;
  },
  string: function () {
    return Object.prototype.toString.call(this) === _bin.types.str;
  },
  type: function () {
    var t = Object.prototype.toString.call(this).match(/\w+(?=\])/)[0].toLowerCase();
    return (t === 'number' && this !== this ? 'NaN' : t);
  }
}, function (key) {
  // Unset globals
  delete G[key];
});

minor(String.prototype, {
  capitalize: function () {
    return this.substring(0, 1).toUpperCase() + this.substring(1);
  },
  chars: function () {
    var i, c, len = this.length, r = [];
    for (i = 0; i < len; i++) {
      c = this.substr(i, 2);
      if (_bin.regex.surrogatePair.test(c) ||
        _bin.regex.symbolWithCombiningMarks.test(c)) {
        r.push(c);
        i++;
      } else {
        r.push(this.substr(i, 1));
      }
    }
    return r;
  },
  chop: function () {
    var c = this.substr(this.length - 2, 2);

    if (_bin.regex.surrogatePair.test(c) ||
        _bin.regex.symbolWithCombiningMarks.test(c)) {
      return this.substr(0, this.length - 2);
    } else {
      return this.substring(0, this.length - 1);
    }
  },
  chr: function () {
    var c = this.substring(0, 2);
    if (_bin.regex.surrogatePair.test(c) ||
        _bin.regex.symbolWithCombiningMarks.test(c)) {
      return c;
    } else {
      return c.substring(0, 1);
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
    function rev (s) {
      s = s.replace(_bin.regex.symbolWithCombiningMarks, function($0, $1, $2) {
          return rev($2) + $1;
        }).replace(_bin.regex.surrogatePair, '$2$1');
      var o = '', i = s.length;
      while (i--) o += s.charAt(i);
      return o;
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
    for (var i = 0; i < this.length; i++) {
      if (Object.prototype.toString.call(this[i]) !== _bin.types.obj) continue;
      if (this[i].hasOwnProperty(key)) return this[i];
    }
  },
  count: function (vfn, f) {
    var args = Array.prototype.slice.call(arguments).length;
    if (args < 1) throw new Error('1 argument expected, got: ' + args);
    var c = 0, i = 0, t = ((typeof f === 'undefined' ? true : f) &&
                            typeof vfn === 'function');
    for (i; i < this.length; i++) {
      if ((t && vfn.call(this, this[i], i)) || (!t && this[i] === vfn)) c++;
    }
    return c;
  },
  cycle: function (n, fn, after) {
    var args = Array.prototype.slice.call(arguments).length;
    if (args < 2) {
      throw new Error('cycle requires 2 arguments, ' + args + ' given');
    }
    if (typeof fn !== 'function') throw new TypeError('Expected function');

    for (var i = 1; i <= n; i++) {
      for (var j = 0; j < this.length; j++) {
        fn.call(this, this[j], j, i);
      }
    }

    return (typeof after === 'function' ? after.call(this) : after);
  },
  delete: function (v) {
    var args = Array.prototype.slice.call(arguments);
    if (args.length < 1) throw new Error('No value given');

    var i = 0, last = null;

    while (i < this.length) {
      if (this[i] === v) {
        last = this[i];
        this.splice(i, 1);
      } else {
        i++;
      }
    }

    return last;
  },
  drop: Array.prototype.slice,
  fetch: function(n, d) {
    if (typeof n !== 'number' || !isFinite(n)) throw new TypeError('Expected number');
    if (Math.abs(n) > this.length - 1 && typeof d === 'undefined') throw new RangeError('Index out of bounds');
    if (n < 0) n = this.length + n;
    return (typeof this[n] !== 'undefined' ? this[n] : d);
  },
  reject: function (f) {
    var a = [], i;
    for (i = 0; i < this.length; i++) {
      if (!f.call(null, this[i], i)) a.push(this[i]);
    }
    return a;
  },
  select: Array.prototype.filter,
  take: function (n) {
    return this.slice().splice(0, n);
  },
  valuesAt: function () {
    var a = Array.prototype.slice.call(arguments),
        o = [], i;

    for (i = 0; i < a.length; i++) {
      if (typeof a[i] !== 'number' || !isFinite(a[i])) throw new TypeError('Expected index');
      if (a[i] < 0) a[i] = this.length + a[i];
      o.push(this[a[i]]);
    }

    return o;
  },
  zip: function() {
    var a = Array.prototype.slice.call(arguments),
        o = [], i, j, q;

    for (i = 0; i < this.length; i++) {
      q = [this[i]];
      for(j = 0; j < a.length; j++) {
        q.push(a[j][i]);
      }
      o.push(q);
    }

    return o;
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
  each: function(fn, after) {
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

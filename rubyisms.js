// Colin 'Oka' Hall-Coates
// http://oka.io <yo@oka.io>
// MIT, 2015

;(function (G) {
'use strict';
    
function define(s, v) {
  var type = Object.prototype.toString.call(this),
      isObject = (type === '[object Object]');

  delete this[s]; 
  Object.defineProperty(this, s, {
    value: v,
    writable: true,
    enumerable: isObject,
    configurable: true
  });
}

function strap(g, s) {
  return {get: g, set: function (v) {
    define.call(this, s, v);
  }, configurable: true};
}

function minor(prototype, o, callback) {
  for (var k in o) {
    if (o.hasOwnProperty(k) && !prototype.hasOwnProperty(k)) {
      Object.defineProperty(prototype, k, strap(o[k], k));
      if (callback) callback.call(null, k);
    }
  }
}

function major(prototype, o, callback) {
  for (var k in o) {
    if (!prototype.hasOwnProperty(k)) {
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
    while (this.length > 0) this.pop(); return this;
  },
  compact: function () {
    var o = [], i;
    for (i = 0; i < this.length; i++) {
      if(typeof this[i] !== 'undefined') o.push(this[i]);
    }
    return o;
  },
  empty: function () {
    return this.length < 1;
  },
  sample: function () {
    return this[Math.floor(Math.random() * this.length)];
  },
  uniq: function () {
    var s = {}, b = {}, n = {}, u = {}, o = {}, r = [], c = 0, p, i, k, item, type;
  
    for (i = 0; i < this.length; i++) {
      item = this[i];
      type = Object.prototype.toString.call(item);
      p = true;
      if (type === '[object String]' && !s.hasOwnProperty(item)) {
        s[item] = true; r.push(item);
      } else if (type === '[object Boolean]' && !b.hasOwnProperty(item)) {
        b[item] = true; r.push(item);
      } else if (type === '[object Number]' && !n.hasOwnProperty(item)) {
        n[item] = true; r.push(item);
      } else if (type === '[object Object]' ||
                 type === '[object Function]' ||
                 type === '[object Array]') {
        obj:
        for (k in o) {
          if (o.hasOwnProperty(k) && item === o[k]) {
            p = false;
            break obj;
          }
        }
        if (p) {
          o[c] = item;
          r.push(item);
          c++;
        }
      } else if ((type === '[object Undefined]' ||
                  type === '[object Null]') &&
                  !u.hasOwnProperty(item)) {
        u[item] = true; r.push(item);
      }
    }
    
    return r;
  }
});

minor(Boolean.prototype, {
  not: function () {
    return !this;
  }
});

minor(Function.prototype, {
  clone: function () {
    return this.bind();
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
    return Object.prototype.toString.call(this) === '[object Array]';
  },
  bool: function () {
    return Object.prototype.toString.call(this) === '[object Boolean]';
  },
  empty: function () {
    var type = Object.prototype.toString.call(this);
    if (type === '[object Object]') {
      return Object.keys(this).length < 1;
    }
  },
  func: function () {
    return Object.prototype.toString.call(this) === '[object Function]';
  },
  numeric: function () {
    return Object.prototype.toString.call(this) === '[object Number]' && this === this;
  },
  object: function () {
    return Object.prototype.toString.call(this) === '[object Object]';
  },
  size: function () {
    var type = Object.prototype.toString.call(this);
    if (type === '[object Array]' ||
        type === '[object String]' ||
        type === '[object Function]') return this.length;
    else if (type === '[object Object]') return Object.keys(this).length;
    else if (type === '[object Boolean]') return (this ? 1 : 0);
    else if (type === '[object Number]' && this === this) return this;
  },
  string: function () {
    return Object.prototype.toString.call(this) === '[object String]';
  },
  type: function () {
    var t = Object.prototype.toString.call(this).match(/\w+(?=\])/)[0].toLowerCase();
    return (t === 'number' && this !== this ? 'NaN' : t);
  }
}, function (key) {
  // Unset globals
  G[key] = undefined;
});

minor(String.prototype, {
  capitalize: function () {
    return this.substring(0, 1).toUpperCase() + this.substring(1);
  },
  chars: function () {
    return this.split('');
  },
  chop: function () {
    return this.slice(0, this.length - 1);
  },
  chr: function () {
    return this.substring(0, 1);
  },
  downcase: function () {
    return this.toLowerCase();
  },
  empty: function () {
    return this.length < 1;
  },
  reverse: function () {
    var r = '', i = this.length - 1, e;
    for (e = 0; i >= e; i--) r += this[i];
    return r;
  },
  swapcase: function () {
    var s = '', i, c;
    for (i = 0; i < this.length; i++) {
      c = this[i].toUpperCase();
      if (c === this[i]) c = this[i].toLowerCase();
      s += c;
    }
    return s;
  },
  upcase: function () {
    return this.toUpperCase();
  }
});

major(Array.prototype, {
  assoc: function (key) {
    for (var i = 0; i < this.length; i++) {
      if (Object.prototype.toString.call(this[i]) !== '[object Object]') continue;
      if (this[i].hasOwnProperty(key)) return this[i];
    }
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
    if (type !== '[object Number]' || n.toFixed() != n) {
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
    if (type !== '[object Number]' || n.toFixed() != n) {
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
    var type = Object.prototype.toString.call(this);
    if (type !== '[object Object]') return;
    if (typeof fn !== 'function') throw new TypeError('Expected function');
    for (var k in this) {
      if (this.hasOwnProperty(k)) {
        fn.call(this, k, this[k]);
      }
    }
    return (typeof after === 'function'? after.call(this) : after);
  },
  eql: function (o) {
    return this === o;
  }
});

major(String.prototype, {
  each: function (fn, after) {
    if (typeof fn !== 'function') throw new TypeError('Expected function');
    for (var i = 0; i < this.length; i++) {
      fn.call(this, this[i], i);
    }
    return (typeof after === 'function'? after.call(this) : after);
  },
  prepend: function (o) {
    return o + this;
  }
});

}((typeof window !== 'undefined' ? window : global)));
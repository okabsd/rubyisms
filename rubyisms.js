// Colin 'Oka' Hall-Coates
// http://oka.io <yo@oka.io>
// MIT, 2015

;(function (G) {
'use strict';
    
function define(s, v) {
  var type = Object.prototype.toString.call(this),
      isObject = (type === '[object Object]'),
      isSafe = (isObject ||
                type === '[object Function]' ||
                type === '[object Array]' ||
                type === '[object global]' ||
                type === '[object window]');

  if (!this.hasOwnProperty(s) && isSafe) {
    Object.defineProperty(this, s, {
      value: v,
      writable: true,
      enumerable: isObject,
      configurable: true
    });
  } else {
    throw new TypeError('Can not override minor method: ' + s);
  }
}

function strap(g, s) {
  return {get: g, set: function (v) {
    define.call(this, s, v);
  }};
}

function minor(prototype, o) {
  for (var k in o) {
    if (prototype.hasOwnProperty(k)) delete o[k];
    else o[k] = strap(o[k], k);
  }
  Object.defineProperties(prototype, o);
}

function major(prototype, o) {
  for (var k in o) {
    if (prototype.hasOwnProperty(k)) continue;
    else {
      Object.defineProperty(prototype, k, {
        value: o[k],
        writable: true,
        configurable: true
      });
    }
  }
}

minor(Array.prototype, {
  clear: function () {
    while (this.length > 0) this.pop(); return this;
  },
  compact: function () {
    return this.filter(function (e) {
      return (typeof e !== 'undefined');
    });
  },
  sample: function () {
    return this[Math.floor(Math.random() * this.length)];
  },
  uniq: function () {
    var c = {};
    return this.filter(function (e) {
      return (c.hasOwnProperty(e) ? false : c[e] = true);
    });
  }
});

minor(Boolean.prototype, {
  not: function () {
    return !this;
  }
});

minor(Function.prototype, {});

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
  finite: function () {
    return isFinite(this);
  },
  floor: function () {
    return Math.floor(this);
  },
  integer: function () {
    return this.toFixed() == this && this !== Infinity;
  },
  nonzero: function () {
    return (this !== 0 ? this: null);
  },
  polar: function () {
    return (isFinite(this) && 
    [Math.abs(this), (this < 0 ? Math.PI : 0)]) || 
    undefined;
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
    if (Array.isArray(this) || 
      typeof this === 'string' || 
      typeof this === 'function') return this.length;
    else if (typeof this === 'object') return Object.keys(this).length;
    else if (typeof this === 'number' && this === this) return this;
  },
  string: function () {
    return Object.prototype.toString.call(this) === '[object String]';
  },
  type: function () {
    var t = Object.prototype.toString.call(this).match(/\w+(?=\])/)[0].toLowerCase();
    return (t === 'number' && this !== this ? 'NaN' : t);
  }
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
        s = this,
        o = [];

    a.forEach(function (e) {
      if (typeof e !== 'number' || !isFinite(e)) throw new TypeError('Expected index');
      if (e < 0) e = s.length + e;
      o.push(s[e]);
    });

    return o;
  },
  zip: function() {
    var a = Array.prototype.slice.call(arguments),
        o = [];

    this.forEach(function(e, i) {
      var q = [e];

      a.forEach(function(e) {
        if (!Array.isArray(e)) throw new TypeError('Expected type array');
        q.push(e[i]);
      });

      o.push(q);
    });

    return o;
  }
});

major(Boolean.prototype, {});

major(Function.prototype, {});

major(Number.prototype, {});

major(Object.prototype, {
  eql: function (o) {
    return this === o;
  }
});

major(String.prototype, {
  prepend: function (o) {
    return o + this;
  }
});

// Unset
G.array = undefined;
G.bool = undefined;
G.func = undefined;
G.numeric = undefined
G.size = undefined;
G.string = undefined;
G.type = undefined;

}((typeof window !== 'undefined' ? window : global)));
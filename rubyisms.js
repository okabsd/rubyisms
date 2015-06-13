// Colin 'Oka' Hall-Coates
// http://oka.io
// MIT, 2015

;(function ($) {
'use strict';

var def = Object.defineProperties,
    AP = Array.prototype,
    BP = Boolean.prototype,
    FP = Function.prototype,
    NP = Number.prototype,
    OP = Object.prototype,
    SP = String.prototype;
    

function $(g, s) {return {get: g, set: s};}

// Minor methods

def(AP, {
  clear: $(function () {
    while (this.length > 0) this.pop(); return this;
  }),
  compact: $(function () {
    return this.filter(function (e) {
      return (typeof e !== 'undefined');
    });
  }),
  sample: $(function () {
    return this[Math.floor(Math.random() * this.length)];
  }),
  uniq: $(function () {
    var c = {};
    return this.filter(function (e) {
      return (c.hasOwnProperty(e) ? false : c[e] = true);
    });
  }),
});

def(BP, {
  not: $(function () {
    return !this;
  })
});

def(FP, {});

def(NP, {
  abs: $(function () {
    return Math.abs(this);
  }),
  abs2: $(function () {
    return this * this;
  }),
  arg: $(function () {
    return (this < 0 ? Math.PI : 0);
  }),
  ceil: $(function () {
    return Math.ceil(this);
  }),
  finite: $(function () {
    return isFinite(this);
  }),
  floor: $(function () {
    return Math.floor(this);
  }),
  integer: $(function () {
    return this.toFixed() == this && this !== Infinity;
  }),
  nonzero: $(function () {
    return (this !== 0 ? this: null);
  }),
  polar: $(function () {
    return (isFinite(this) && 
    [Math.abs(this), (this < 0 ? Math.PI : 0)]) || 
    undefined;
  }),
  round: $(function () {
    return Math.round(this);
  }),
  zero: $(function () {
    return this === 0;
  })
});

def(OP, {
  array: $(function () {
    return OP.toString.call(this) === '[object Array]';
  }),
  bool: $(function () {
    return OP.toString.call(this) === '[object Boolean]';
  }),
  func: $(function () {
    return OP.toString.call(this) === '[object Function]';
  }),
  numeric: $(function () {
    return OP.toString.call(this) === '[object Number]' && this === this;
  }),
  object: $(function () {
    return OP.toString.call(this) === '[object Object]';
  }),
  size: $(function () {
    if (Array.isArray(this) || 
      typeof this === 'string' || 
      typeof this === 'function') return this.length;
    else if (typeof this === 'object') return Object.keys(this).length;
    else if (typeof this === 'number' && this === this) return this;
  }),
  string: $(function () {
    return OP.toString.call(this) === '[object String]';
  }),
  type: $(function () {
    var t = OP.toString.call(this).match(/\w+(?=\])/)[0].toLowerCase();
    return (t === 'number' && this !== this ? 'NaN' : t);
  })
});

def(SP, {
  capitalize: $(function () {
    return this.substring(0, 1).toUpperCase() + this.substring(1);
  }),
  chars: $(function () {
    return this.split('');
  }),
  chop: $(function () {
    return this.slice(0, this.length - 1);
  }),
  chr: $(function () {
    return this.substring(0, 1);
  }),
  downcase: $(function () {
    return this.toLowerCase();
  }),
  empty: $(function () {
    return this.length < 1;
  }),
  reverse: $(function () {
    var r = '', i = this.length - 1, e;
    for (e = 0; i >= e; i--) r += this[i];
    return r;
  }),
  swapcase: $(function () {
    var s = '', i, c;
    for (i = 0; i < this.length; i++) {
      c = this[i].toUpperCase();
      if (c === this[i]) c = this[i].toLowerCase();
      s += c;
    }
    return s;
  }),
  upcase: $(function () {
    return this.toUpperCase();
  })
});

// Major methods

var _Array = {
  _p: AP,
  assoc: function (key) {
    for (var i = 0; i < this.length; i++) {
      if (OP.toString.call(this[i]) !== '[object Object]') continue;
      if (this[i].hasOwnProperty(key)) return this[i];
    }
  },
  drop: AP.slice,
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
  select: AP.filter,
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
};

var _Boolean = {
  _p: BP
};

var _Function = {
  _p: FP
};

var _Number = {
  _p: NP
};

var _Object = {
  _p: OP,
  eql: function (o) {
    return this === o;
  }
};

var _String = {
  _p: SP,
  prepend: function (o) {
    return o + this;
  }
};

function buildPrototypes(e) {
  for (var k in e) {
    if (k === '_p') continue;
    if (e.hasOwnProperty(k)) e._p[k] = (e._p[k] || e[k]);
  }
}

[_Array, _Boolean, _Function, _Number, _Object, _String].forEach(buildPrototypes);

}());
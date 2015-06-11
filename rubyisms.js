// Colin 'Oka' Hall-Coates
// http://oka.io
// MIT, 2015

;(function ($) {
'use strict';

var def = Object.defineProperties,
    OP = Object.prototype,
    AP = Array.prototype,
    SP = String.prototype,
    NP = Number.prototype;

function $(g, s) {return {get: g, set: s};}
    
def(SP, {
  capitalize: $(function () {
    return this.substring(0, 1).toUpperCase() + this.substring(1);
  }),
  chars: $(function () {
    return this.split('');
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
  upcase: $(function () {
    return this.toUpperCase();
  })
});

def(AP, {
  clear: $(function () {
    while (this.length > 0) this.pop(); return this;
  }),
  compact: $(function () {
    return this.filter(function (e) {
      return (typeof e !== 'undefined');
    });
  }),
  uniq: $(function () {
    var c = {};
    return this.filter(function (e) {
      return (c.hasOwnProperty(e) ? false : c[e] = true);
    });
  }),
});

def(OP, {
  array: $(function () {
    return Array.isArray(this);
  }),
  bool: $(function () {
    return typeof this === 'boolean';
  }),
  numeric: $(function () {
    return typeof this === 'number' && this === this;
  }),
  object: $(function () {
    return !Array.isArray(this) && typeof this === 'object';
  }),
  size: $(function () {
    if (Array.isArray(this) || typeof this === 'string') return this.length;
    else if (typeof this === 'object') return Object.keys(this).length;
  }),
  string: $(function () {
    return typeof this === 'string';
  })
});

def(NP, {
  abs: $(function () {
    return Math.abs(this);
  }),
  finite: $(function () {
    return isFinite(this);
  }),
  floor: $(function () {
    return Math.floor(this);
  }),
  integer: $(function () {
    return this.toFixed() == this;
  }),
  polar: $(function () {
    return [Math.abs(this), (this > 0 ? 0 : Math.PI)];
  })
});

var _String = {
  _p: SP,
  eql: function (o) {
    return this === o;
  },
  prepend: function (o) {
    return o + this;
  }
};

var _Array = {
  _p: AP,
  drop: AP.slice,
  fetch: function(n, d) {
    if (typeof n !== 'number' || !isFinite(n)) throw new TypeError('Expected number');
    if (Math.abs(n) > this.length - 1 && typeof d === 'undefined') throw new RangeError('Index out of bounds');
    if (n < 0) n = this.length + n;
    return (typeof this[n] !== 'undefined' ? this[n] : d);
  },
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

var _Object = {
  _p: OP
};

var _Number = {
  _p: NP,
  eql: function (o) {
    return this === o;
  }
};

function buildPrototypes(e) {
  for (var k in e) {
    if (k === '_p') continue;
    if (e.hasOwnProperty(k)) e._p[k] = (e._p[k] || e[k]);
  }
}

[_String, _Array, _Object, _Number].forEach(buildPrototypes);

}());
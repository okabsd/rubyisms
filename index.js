// Colin 'Oka' Hall-Coates
// http://oka.io
// MIT, 2015

;(function () {
'use strict';

var def = Object.defineProperties,
    OP = Object.prototype,
    AP = Array.prototype,
    SP = String.prototype,
    NP = Number.prototype;
    
// Getters
def(SP, {
  capitalize: {
    get: function () {
      return this.substring(0, 1).toUpperCase() + this.substring(1);
    }
  },
  chars: {
    get: function () {
      return this.split('');
    }
  },
  chr: {
    get: function () {
      return this.substring(0, 1);
    }
  },
  downcase: {
    get: function () {
      return this.toLowerCase();
    }
  },
  empty: {
    get: function () {
      return this.length < 1;
    }
  },
  reverse: {
    get: function () {
      var r = '', i = this.length - 1, e;
      for (e = 0; i >= e; i--) r += this[i];
      return r;
    }
  },
  upcase: {
    get: function () {
      return this.toUpperCase();
    }
  }
});

def(AP, {
  clear: {
    get: function () {
      while (this.length > 0) this.pop();
      return this;
    }
  },
  compact: {
    get: function () {
      return this.filter(function (e) {
        return (typeof e !== 'undefined');
      });
    }
  },
  uniq: {
    get: function () {
      var c = {};
      return this.filter(function (e) {
        return (c.hasOwnProperty(e) ? false : c[e] = true);
      });
    }
  }
});

def(OP, {});
def(NP, {});

}());
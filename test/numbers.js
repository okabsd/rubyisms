/* globals describe, it */
/* jshint -W030 */

var
chai   = require('chai'),
assert = chai.assert,
expect = chai.expect;

chai.should();

require('../');

describe('Numbers::MinorMethods', function () {
  var zero = 0,
      one = 1,
      neg = -5,
      negf = -3.5,
      pos = 7,
      posf = 12.4,
      even = 10,
      odd = 11;

  describe('#abs', function () {
    it('should return the absolute value of the number', function () {
      expect(neg.abs).to.equal(5);
      expect(pos.abs).to.equal(7);
      expect(negf.abs).to.equal(3.5);
      expect(posf.abs).to.equal(12.4);
    });
  });

  describe('#abs2', function () {
    it('should return the value of the number squared', function () {
      expect(zero.abs2).to.equal(0);
      expect(one.abs2).to.equal(1);
      expect(neg.abs2).to.equal(25);
      expect(pos.abs2).to.equal(49);
    });
  });

  describe('#arg', function () {
    it('should return PI if negative, 0 otherwise', function () {
      expect(zero.arg).to.equal(0);
      expect(pos.arg).to.equal(0);
      expect(neg.arg).to.equal(Math.PI);
      expect(negf.arg).to.equal(Math.PI);
    });
  });

  describe('#ceil', function () {
    it('should return the largest integer greater than or equal to self', function () {
      expect(zero.ceil).to.equal(0);
      expect(one.ceil).to.equal(1);
      expect(posf.ceil).to.equal(13);
      expect(negf.ceil).to.equal(-3);
    });
  });

  describe('#even', function () {
    it('should return true if value is even, false otherwise', function () {
      expect(even.even).to.be.true;
      expect(odd.even).to.be.false;
      expect(posf.even).to.be.false;
    });
  });

  describe('#finite', function () {
    it('should return true or false if number is finite', function () {
      expect(zero.finite).to.be.true;
      expect(one.finite).to.be.true;
      expect(neg.finite).to.be.true;
      expect(negf.finite).to.be.true;
      expect(pos.finite).to.be.true;
      expect(posf.finite).to.be.true;
      expect(NaN.finite).to.be.false;
      expect(Infinity.finite).to.be.false;
    });
  });

  describe('#floor', function () {
    it('should return the largest integer less than or equal self', function () {
      expect(zero.floor).to.equal(0);
      expect(one.floor).to.equal(1);
      expect(neg.floor).to.equal(-5);
      expect(negf.floor).to.equal(-4);
    });
  });

  describe('#integer', function () {
    it('should return true if number is integer, false otherwise', function () {
      expect(zero.integer).to.be.true;
      expect(one.integer).to.be.true;
      expect(negf.integer).to.be.false;
      expect(posf.integer).to.be.false;
      expect(NaN.integer).to.be.false;
      expect(Infinity.integer).to.be.false;
    });
  });

  describe('#next', function () {
    var i = 5,
        f = 5.5;
    it('should return self + 1, if self is integer value', function () {
      expect(i.next).to.equal(6);
    });

    it('should throw TypeError if self is not integer value', function () {
      expect(function () { return f.next; }).to.throw(TypeError);
      expect(function () { return NaN.next; }).to.throw(TypeError);
      expect(function () { return Infinity.next; }).to.throw(TypeError);
    });

    it('should not effect the original value', function () {
      i.should.equal(5);
    });
  });

  describe('#nonzero', function () {
    it('should return self if not 0, null otherwise', function () {
      expect(zero.nonzero).to.equal(null);
      expect(one.nonzero).to.equal(one);
      expect(negf.nonzero).to.equal(negf);
    });
  });

  describe('#odd', function () {
    it('should return true if value is odd, false otherwise', function () {
      expect(odd.odd).to.be.true;
      expect(even.odd).to.be.false;
      expect(posf.odd).to.be.false;
    });
  });

  describe('#polar', function () {
    it('should return [absolute value of number, (PI if negative, 0 otherwise)]', function () {
      assert.deepEqual(one.polar, [1, 0]);
    });

    it('should return undefined for infinite values', function () {
      expect(NaN.polar).to.equal(undefined);
      expect(Infinity.polar).to.equal(undefined);
    });
  });

  describe('#pred', function () {
    var i = 5,
        f = 5.5;
    it('should return self + 1, if self is integer value', function () {
      expect(i.pred).to.equal(4);
    });

    it('should throw TypeError if self is not integer value', function () {
      expect(function () { return f.pred; }).to.throw(TypeError);
      expect(function () { return NaN.pred;}).to.throw(TypeError);
      expect(function () { return Infinity.pred; }).to.throw(TypeError);
    });

    it('should not effect the original value', function () {
      i.should.equal(5);
    });
  });

  describe('#round', function () {
    it('should return the value rounded to the nearest integer', function () {
      expect(zero.round).to.equal(0);
      expect(one.round).to.equal(1);

      expect(negf.round).to.eql(-3);
      expect(posf.round).to.eql(12);
    });
  });

  describe('#zero', function () {
    it('should return true if value is zero, false otherwise', function () {
      expect(zero.zero).to.be.true;
      expect(one.zero).to.be.false;
      expect(pos.zero).to.be.false;
      expect(negf.zero).to.be.false;
      expect(NaN.zero).to.be.false;
      expect(Infinity.zero).to.be.false;
    });
  });
});

describe('Numbers::MajorMethods', function () {
  describe('#downto()', function () {
    var i = 20,
        l = 15;

    it('should loop from self to limit, invoking its callback function', function () {
      var out = [];
      i.downto(l, function (n) {
        out.push(n);
      });
      out.should.deep.equal([20, 19, 18, 17, 16, 15]);
    });

    it('should return second parameter', function () {
      expect(i.downto(l, function (i) {
        return i;
      }, 'hello!')).to.equal('hello!');
    });

    it('should invoke and return second parameter if function', function () {
      expect(i.downto(l, function (i) {
        return i;
      }, function () {
        return 'hello!';
      })).to.equal('hello!');
    });

    it('should not affect own value', function () {
      i.should.equal(20);
    });

    it('should not effect limit value', function () {
      l.should.equal(15);
    });
  });

  describe('#times()', function () {
    var i = 5;

    it('should loop n times invoking its callback function', function () {
      var out = [];
      i.times(function (i) {
          out.push(i);
        });
      out.should.deep.equal([1, 2, 3, 4, 5]);
    });

    it('should return second parameter', function () {
      expect(i.times(function (i) {
        return i;
      }, 'hello!')).to.equal('hello!');
    });

    it('should invoke and return second parameter if function', function () {
      expect(i.times(function (i) {
        return i;
      }, function () {
        return 'hello!';
      })).to.equal('hello!');
    });

    it('should not affect own value', function () {
      i.should.equal(5);
    });
  });

  describe('#upto()', function () {
    var i = 5,
        l = 10;

    it('should loop from self to limit, invoking its callback function', function () {
      var out = [];
      i.upto(l, function (n) {
        out.push(n);
      });
      out.should.deep.equal([5, 6, 7, 8, 9, 10]);
    });

    it('should return second parameter', function () {
      expect(i.upto(l, function (i) {
        return i;
      }, 'hello!')).to.equal('hello!');
    });

    it('should invoke and return second parameter if function', function () {
      expect(i.upto(l, function (i) {
        return i;
      }, function () {
        return 'hello!';
      })).to.equal('hello!');
    });

    it('should not affect own value', function () {
      i.should.equal(5);
    });

    it('should not effect limit value', function () {
      l.should.equal(10);
    });
  });
});

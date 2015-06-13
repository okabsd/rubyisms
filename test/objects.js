var chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

require('../');

describe('Objects', function () {
  // Minor methods
  var a = [1, 'bar', 3, undefined, 5],
      b = true,
      f = function (one, two) {},
      n = 5,
      o = {a: 1, b: 2},
      s = 'foo';

  describe('#array', function () {
    it('should return true if object is array, false otherwise', function () {
      expect(a.array).to.be.true;
      expect(b.array).to.be.false;
      expect(f.array).to.be.false;
      expect(n.array).to.be.false;
      expect(o.array).to.be.false;
      expect(s.array).to.be.false;
    });
  });

  describe('#bool', function () {
    it('should return true if object is boolean, false otherwise', function () {
      expect(a.bool).to.be.false;
      expect(b.bool).to.be.true;
      expect(f.bool).to.be.false;
      expect(n.bool).to.be.false;
      expect(o.bool).to.be.false;
      expect(s.bool).to.be.false;
    });
  });

  describe('#func', function () {
    it('should return true if object is function, false otherwise', function () {
      expect(a.func).to.be.false;
      expect(b.func).to.be.false;
      expect(f.func).to.be.true;
      expect(n.func).to.be.false;
      expect(o.func).to.be.false;
      expect(s.func).to.be.false;
    });
  });

  describe('#numeric', function () {
    it('should return true if object is numeric, false otherwise', function () {
      expect(a.numeric).to.be.false;
      expect(b.numeric).to.be.false;
      expect(f.numeric).to.be.false;
      expect(n.numeric).to.be.true;
      expect(o.numeric).to.be.false;
      expect(s.numeric).to.be.false;
      expect(NaN.numeric).to.be.false;
      expect(Infinity.numeric).to.be.true;
    });
  });

  describe('#object', function () {
    it('should return true if object is object, false otherwise', function () {
      expect(a.object).to.be.false;
      expect(b.object).to.be.false;
      expect(f.object).to.be.false;
      expect(n.object).to.be.false;
      expect(o.object).to.be.true;
      expect(s.object).to.be.false;
    });
  });

  describe('#size', function () {
    it('should return the length of strings and arrays', function () {
      expect(a.size).to.equal(5);
      expect(s.size).to.equal(3);
    });

    it('should return a numeric value for booleans', function () {
      expect(true.size).to.equal(1);
      expect(false.size).to.equal(0);
    })

    it('should return the number of arguments a function has defined', function () {
      expect(f.size).to.equal(2);
    });

    it('should return the length of an objects properties', function () {
      expect(o.size).to.equal(2)
    });

    it('should return a numeric value\'s value', function () {
      expect(n.size).to.equal(5);
      expect(NaN.size).to.equal(undefined);
      expect(Infinity.size).to.equal(Infinity);
    })
  });


  describe('#string', function () {
    it('should return true if object is string, false otherwise', function () {
      expect(a.string).to.be.false;
      expect(b.string).to.be.false;
      expect(f.string).to.be.false;
      expect(n.string).to.be.false;
      expect(o.string).to.be.false;
      expect(s.string).to.be.true;
      expect(new String('hello').string).to.be.true;
    });
  });

  describe('#type', function () {
    it('should return a type string', function () {
      expect(a.type).to.equal('array');
      expect(b.type).to.equal('boolean');
      expect(f.type).to.equal('function');
      expect(n.type).to.equal('number');
      expect(o.type).to.equal('object');
      expect(s.type).to.equal('string');
      expect(NaN.type).to.equal('NaN');
      expect(Infinity.type).to.equal('number');
    });
  });

  // Major methods

  describe('#eql()', function () {
    it('should compare objects strictly and return a boolean', function () {
      expect(a.eql(a)).to.be.true;
      expect(a.eql([1, 'bar', 3, undefined, 5])).to.be.false;

      expect(b.eql(b)).to.be.true;
      expect(b.eql(false)).to.be.false;

      expect(f.eql(f)).to.be.true;
      expect(f.eql(function () {})).to.be.false;

      expect(n.eql(n)).to.be.true;
      expect(n.eql(5)).to.be.true;
      expect(n.eql('5')).to.be.false;

      expect(o.eql(o)).to.be.true;
      expect(o.eql({a: 1, b: 2})).to.be.false;

      expect(s.eql(s)).to.be.true;
      expect(s.eql('foo')).to.be.true;
      expect(s.eql(new String('foo'))).to.be.false;
    });
  });
});
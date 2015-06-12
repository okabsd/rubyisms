var chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

require('../');

describe('Objects', function () {
  // Minor methods
  var a = [1, 'bar', 3, undefined],
      b = true,
      f = function () {},
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

    });
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

});
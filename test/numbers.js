var chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

require('../');

describe('Numbers', function () {
  // Minor methods

  var zero = 0,
      one = 1,
      neg = -5,
      negf = -3.5,
      pos = 7,
      posf = 12.4;

  describe('#abs', function () {
    it('should return the absolute value of the number', function () {
      expect(neg.abs).to.equal(5);
      expect(pos.abs).to.equal(7);
      expect(negf.abs).to.equal(3.5);
      expect(posf.abs).to.equal(12.4);
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

  describe('#polar', function () {
    it('should return [absolute value of number, (PI if negative, 0 otherwise)]', function () {
      assert.deepEqual(one.polar, [1, 0]);
    });

    it('should return undefined for infinite values', function () {
      expect(NaN.polar).to.equal(undefined);
      expect(Infinity.polar).to.equal(undefined);
    });
  });

  describe('#round', function () {
    it('should return the value rounded to the nearest integer', function () {
      expect(zero.round).to.equal(0);
      expect(one.round).to.equal(1);

      expect(negf.round).to.eql(-3)
      expect(posf.round).to.eql(12)
    });
  });

  // Major methods
});
var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

require('../../');

describe('Arrays', function () {
  describe('#clear', function () {
    it('should empty the array in place', function () {
      var foo = [1, 2, 3];
      assert.equal(foo.clear, foo);
      foo.should.have.length(0);
    });
  });

  describe('#compact', function () {
    it('should remove all undefined values', function () {
      var foo = [1, 2, undefined, 3];
          bar = foo.compact;

      bar.should.not.equal(foo);
      bar.should.not.contain(undefined);
      bar.should.have.length(3);
    });
  });

  describe('#uniq', function () {
    it('should remove all duplicate values', function () {
      var foo = [1, 2, 2, 3, 3],
          bar = foo.uniq;

      assert.deepEqual(bar, [1, 2, 3]);
      bar.should.have.length(3);
      bar.should.not.equal(foo);
    });
  });
});
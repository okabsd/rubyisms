var chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

require('../');

describe('Arrays', function () {
  // Minor methods

  describe('#clear', function () {
    it('should empty the array in place', function () {
      var foo = [1, 2, 3];

      assert.equal(foo.clear, foo);
      foo.should.have.length(0);
    });
  });

  describe('#compact', function () {
    var foo = [1, 2, undefined, 3];
        bar = foo.compact;

    it('should remove all undefined values', function () {
      bar.should.not.contain(undefined);
      bar.should.have.length(3);
    });

    it('should not alter the original array', function () {
      bar.should.not.equal(foo);
    });
  });

  describe('#uniq', function () {
    var foo = [1, 2, 2, 3, 3],
          bar = foo.uniq;

    it('should remove all duplicate values', function () {
      assert.deepEqual(bar, [1, 2, 3]);
    });

    it('should not alter the original array', function () {
      bar.should.not.equal(foo);
    });
  });

  // Major methods

  describe('#drop()', function () {
    var foo = [1, 2, 3],
        bar = foo.drop(2);

    it('should return a new array starting from the index', function () {
      assert.deepEqual(bar, [3]);
    });

    it('should not alter the original array', function () {
      expect(foo.drop).to.equal(foo.slice);
      bar.should.not.equal(foo);
    })
  });

  describe('#fetch()', function () {
    var foo = [1, 'baz', 3, undefined],
        bar = foo.fetch(3, 'test');

    it('should return value at given index', function () {
      expect(foo.fetch(2)).to.equal(3);
      expect(foo.fetch(-3)).to.equal('baz');
    });

    it('should return the substitute if given index is undefined, or out of bounds', function () {
      bar.should.equal('test');
      expect(foo.fetch(20, 'thing')).to.equal('thing');
    });

    it('should throw RangeError on out of bounds index, with no substitute', function () {
      expect(function () {foo.fetch(10)}).to.throw(RangeError);
      expect(function () {foo.fetch(-10)}).to.throw(RangeError);
    });

    it('should not alter the original array', function () {
      assert.deepEqual(foo, [1, 'baz', 3, undefined]);
    });
  });

  describe('#take()', function () {
    var foo = [1, 'baz', 3],
        bar = foo.take(2);

    it('should return the first n elements from the array', function () {
      assert.deepEqual(bar, [1, 'baz']);
    });

    it('should not alter the original array', function () {
      assert.deepEqual(foo, [1, 'baz', 3]);
    });
  });

  describe('#valuesAt()', function () {
    var foo = [1, 'baz', 3],
        bar = foo.valuesAt(0, 2);

    it('should return an array of values at each given index', function () {
      assert.deepEqual(bar, [1, 3]);
    });

    it('should not alter the original array', function () {
      assert.deepEqual(foo, [1, 'baz', 3]);
    });
  });

  describe('#zip()', function () {
    var foo = [1, 'baz', 3],
        bar = foo.zip([3, 2, 1], [5, 8]);

    it('should merge elements at each index of each given array', function () {
      assert.deepEqual(bar, [ [ 1, 3, 5 ], [ 'baz', 2, 8 ], [ 3, 1, undefined ] ]);
      assert.deepEqual(foo.zip(), [[1], ['baz'], [3]]);
    });

    it('should not alter the original array', function () {
      assert.deepEqual(foo, [1, 'baz', 3]);
    });
  });
});
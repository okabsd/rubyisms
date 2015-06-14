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

  describe('#empty', function () {
    var a1 = [],
        a2 = [1, 2, 3];

    it('should return true if array has no elements, false otherwise', function () {
      expect(a1.empty).to.be.true;
      expect(a2.empty).to.be.false;
    });

    it('should not alter the original array', function () {
      a1.should.deep.equal([]);
      a2.should.deep.equal([1, 2, 3]);
    });
  });

  describe('#sample', function () {
    var foo = ['a', 'b'],
        bar = foo.sample;

    it('should return a random value from the array', function () {
      expect(bar).to.be.a('string');
    });

    it('should not alter the original array', function () {
      assert.deepEqual(foo, ['a', 'b']);
    });
  });

  describe('#uniq', function () {
    var f = function () {},
    f2 = f,
    a = [], a2 = a,
    o = {}, o2 = o,
    foo = [f, f2, a, a2, o, o2, 1, 1, '5', '5', true, true, false, false],
    bar = foo.uniq;

    it('should work with array values', function () {
      var a3 = [];
      expect([a, a2, a3].uniq).to.deep.equal([a, a3]);
    });

    it('should work with function values', function () {
      var f3 = function () {};
      expect([f, f2, f3].uniq).to.deep.equal([f, f3]);
    });

    it('should work with object values', function () {
      var o3 = {};
      expect([o, o2, o3].uniq).to.deep.equal([o, o3]);
    });

    it('should work on boolean values', function () {
      expect([true, true, false, false].uniq).to.deep.equal([true, false]);
    })

    it('should work on string values', function () {
      var arr = ['one', 'two', 'two', 'one', 'three'];
      expect(arr.uniq).to.deep.equal(['one', 'two', 'three']);
    });

    it('should work on number values', function () {
      var arr = [1, 2, 2, 1, 3];
      expect(arr.uniq).to.deep.equal([1, 2, 3]);
    });

    it('should work on mixed values', function () {
      bar.should.deep.equal([f, a, o, 1, '5', true, false]);
    });

    it('should not alter the original array', function () {
      bar.should.not.equal(foo);
      foo.should.deep.equal([f, f2, a, a2, o, o2, 1, 1, '5', '5', true, true, false, false]);
    });
  });

  // Major methods

  describe('#assoc()', function () {
    var foo = [{a: 1}, 'bar', {b: 2}, {b: 4}],
        bar = foo.assoc('b');

    it('should return the first object that has the given property', function () {
      bar.should.equal(foo[2]);
    });

    it('should not alter the original array', function () {
      assert.deepEqual(foo, [{a: 1}, 'bar', {b: 2}, {b: 4}]);
    });
  });

  describe('#cycle()', function () {
    var a = [1, 2],
        o = [],
        c = 0;
        a.cycle(2, function (e, i, l) {
          c = l;
          o.push(e);
        });

    it('should iteration the given amount of times, invoking its callback', function () {
      c.should.equal(2);
    });

    it('should iterate through all of the array\'s elements each iteration', function () {
      o.should.deep.equal([1, 2, 1, 2]);
    });

    it('should not alter the original array', function () {
      a.should.deep.equal([1, 2]);
    })
  });

  describe('#delete()', function () {
    var a = [1, 2, 3, 3, 3],
        a2 = [1, 2];

    it('should return the last value removed, or null if no values removed', function () {
      expect(a.delete(3)).to.equal(3);
      expect(a2.delete(5)).to.equal(null);
    });

    it('should remove all instances of value given from self', function () {
      a.should.deep.equal([1, 2]);
    });

    it('should modify the original array', function () {
      a.should.not.deep.equal([1, 2, 3, 3, 3]);
    });
  });

  describe('#drop()', function () {
    var foo = [1, 2, 3],
        bar = foo.drop(2);

    it('should return a new array starting from the given index', function () {
      assert.deepEqual(bar, [3]);
    });

    it('should not alter the original array', function () {
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

  describe('#reject()', function () {
    var foo = [1, 'baz', 3],
        bar = foo.reject(function (e) {
          return typeof e === 'number';
        });

    it('should return an array of elements that fail a given test', function () {
      assert.deepEqual(bar, ['baz']);
    });

    it('should not alter the original array', function () {
      assert.deepEqual(foo, [1, 'baz', 3]);
    });
  });

  describe('#select()', function () {
    var foo = [].select,
        bar = [].filter;

    it('should be the same as #filter()', function () {
      foo.should.equal(bar);
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
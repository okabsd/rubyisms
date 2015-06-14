var chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

require('../');

describe('Functions', function () {
  // Minor methods

  describe('#clone', function () {
    var test = function () {
      return 'hello';
    },
    copy = test.clone;

    it('should return return a copy of the function', function () {
      expect(copy.call()).to.equal('hello');
      copy.should.not.equal(test);
    });

    it('should not effect the original', function () {
      expect(test.call()).to.equal('hello');
    });
  });

  // Major methods
});
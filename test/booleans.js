var chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

require('../');

describe('Booleans', function () {
  // Minor methods

  describe('#not', function () {
    it('should return the inverse value', function () {
      var t = true,
          f = false;

      expect(t.not).to.be.false;
      expect(f.not).to.be.true;
    })
  });

  // Major methods
});
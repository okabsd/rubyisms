/* globals describe, it */
/* jshint -W030 */

var
chai  = require('chai'),
// assert = chai.assert,
expect = chai.expect;

chai.should();

require('../');

describe('Booleans::MinorMethods', function () {
  describe('#not', function () {
    it('should return the inverse value', function () {
      var t = true,
          f = false;

      expect(t.not).to.be.false;
      expect(f.not).to.be.true;
    });
  });
});

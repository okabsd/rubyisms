/* globals describe, it */
/* jshint -W030 */

var
chai   = require('chai'),
// assert = chai.assert,
expect = chai.expect;

chai.should();

require('../');

describe('Functions::MinorMethods', function () {
  describe('#clone', function () {
    var test = function () {
      return 'hello';
    },
    copy = test.clone;

    it('should return return a copy of the function', function () {
      expect(copy.call()).to.equal('hello');
    });

    it('should not effect the original', function () {
      expect(test.call()).to.equal('hello');
      copy.should.not.equal(test);
    });
  });
});

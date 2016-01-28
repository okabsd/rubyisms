/* globals describe, it */
/* jshint -W030 */

var
chai   = require('chai'),
assert = chai.assert,
expect = chai.expect;

chai.should();

require('../');

describe('Strings::MinorMethods', function () {
  var oddity = '𝌆 bar mañana mañana';

  describe('#capitalize', function () {
    var foo = 'hello',
        bar = foo.capitalize;

    it('should return a string with the first character upcased', function () {
      bar.should.equal('Hello');
    });

    it('should not affect the original', function () {
      foo.should.equal('hello');
    });
  });

  describe('#chars', function () {
    var foo = 'hello',
        bar = foo.chars;

    it('should return an array of all characters in the string', function () {
      assert.deepEqual(bar, ['h', 'e', 'l', 'l', 'o']);
    });

    it('should work on non standard characters', function () {
      expect(oddity.chars.join('')).to.equal(oddity);
    });

    it('should not affect the original', function () {
      foo.should.equal('hello');
    });
  });

  describe('#chop', function () {
    var foo = 'hello',
        bar = foo.chop;

    it('should return a string with the last character removed', function () {
      bar.should.equal('hell');
      expect(''.chop).to.equal('');
    });

    it('should remove \\r\\n from the end of a string', function () {
      var qar = 'hello\r\n';

      expect(qar.chop).to.equal('hello');
    });

    it('should not affect the original', function () {
      foo.should.equal('hello');
    });
  });

  describe('#chr', function () {
    var foo = 'hello',
        bar = foo.chr;

    it('should return the first character in the string', function () {
      bar.should.equal('h');
    });

    it('should work on non standard characters', function () {
      expect(oddity.chr).to.eql('𝌆');
    });

    it('should not affect the original', function () {
      foo.should.equal('hello');
    });
  });

  describe('#downcase', function () {
    var foo = 'HELLO',
        bar = foo.downcase;

    it('should return a string with all character in lowercase', function () {
      bar.should.equal('hello');
    });

    it('should not affect the original', function () {
      foo.should.equal('HELLO');
    });
  });

  describe('#empty', function () {
    var foo = 'hello',
        faz = '',
        bar = foo.empty,
        baz = faz.empty;

    it('should return boolean value, true if string is empty, false if not', function () {
      bar.should.be.false;
      baz.should.be.true;
    });

    it('should not affect the original', function () {
      foo.should.equal('hello');
      faz.should.equal('');
    });
  });

  describe('#reverse', function () {
    var foo = 'hello',
        bar = foo.reverse;

    it('should return string with the characters in reverse order', function () {
      bar.should.equal('olleh');
    });

    it('should work on non standard characters', function () {
      expect(oddity.reverse.reverse).to.equal(oddity);
    });

    it('should not affect the original', function () {
      foo.should.equal('hello');
    });
  });

  describe('#swapcase', function () {
    var foo = 'HeLlO',
        bar = foo.swapcase;

    it('should return a string with each character swapped in case', function () {
      bar.should.equal('hElLo');
    });

    it('should not affect the original', function () {
      foo.should.equal('HeLlO');
    });
  });

  describe('#upcase', function () {
    var foo = 'hello',
        bar = foo.upcase;

    it('should return a string with all character in uppercase', function () {
      bar.should.equal('HELLO');
    });

    it('should not affect the original', function () {
      foo.should.equal('hello');
    });
  });

});

describe('Strings::MajorMethods', function () {
  describe('#each()', function () {
    var foo = 'hello',
        out = [];
        foo.each(function (e) {
          out.push(e);
        });

    it('should it iterate through the string', function () {
      expect(out.join('')).to.equal(foo);
      out.should.deep.equal(['h', 'e', 'l', 'l', 'o']);
    });

    it('should not affect the original', function () {
      foo.should.equal('hello');
    });
  });

  describe('#prepend()', function () {
    var foo = 'world',
        bar = foo.prepend('hello ');

    it('should return a string with given value appended to the beginning', function () {
      bar.should.equal('hello world');
    });

    it('should not affect the original', function () {
      foo.should.equal('world');
    });
  });
});

var chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

require('../');

describe('Strings', function () {
  // Minor methods

  describe('#capitalize', function () {
    var foo = 'hello',
        bar = foo.capitalize;

    it('should return a string with the first character upcased', function () {
      bar.should.equal('Hello');
    });

    it('should not affect the original', function () {
      foo.should.equal('hello');
    })
  });

  describe('#chars', function () {
    var foo = 'hello',
        bar = foo.chars;

    it('should return an array of all characters in the string', function () {
      assert.deepEqual(bar, ['h', 'e', 'l', 'l', 'o']);
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
    })

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

    it('should not affect the original', function () {
      foo.should.equal('hello');
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

  // Major methods
});
const Foo = require('../dist/foo.js').default;
const FooBar = require('../dist/foobar.js').default;

const chai = require('chai'),
      sinon = require('sinon'),
      sinonChai = require('sinon-chai');
chai.use(sinonChai);

const assert = chai.assert;

var foo = new Foo();

describe('Foo', function() {
  describe('#foo getter', function() {
    it('should return "Foo" by default', function() {
      assert.equal('Foo', foo.foo);
    });
  });

  describe('#foo setter', function() {
    it('should set foobar.foo to "fOo."', function() {
      foo.foo = "fOo.";
      assert.equal('fOo.', foo.foo);
    });
  });
});

var foobar = new FooBar();

describe('FooBar', function() {
  describe('#bar getter', function() {
    it('should return "Bar" by default', function() {
      assert.equal('Bar', foobar.bar);
    });
  });

  describe('#bar setter', function() {
    it('should set foobar.bar to "b4R"', function() {
      foobar.bar = "b4R";
      assert.equal('b4R', foobar.bar);
    });
  });

  describe('#foobar getter', function() {
    it('should return "Foob4R"', function() {
      assert.equal('Foob4R', foobar.foobar);
    });
  });
});

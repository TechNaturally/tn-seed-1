const assert = chai.assert;

describe('Foo', function() {
  describe('#foo getter', function() {
    it('should return "Foo" by default', function() {
      assert.equal('Foo', foobar.foo);
    });
  });

  describe('#foo setter', function() {
    it('should set foobar.foo to "fOo."', function() {
      foobar.foo = "fOo.";
      assert.equal('fOo.', foobar.foo);
    });
  });
});

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
    it('should return "fOo.b4R"', function() {
      assert.equal('fOo.b4R', foobar.foobar);
    });
  });
});

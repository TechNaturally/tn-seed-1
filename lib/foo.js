export default class {
  constructor(foo = 'Foo') {
    this.foo = foo;
  }
  get foo(){
    return this._foo;
  }
  set foo(foo){
    this._foo = foo;
  }
}

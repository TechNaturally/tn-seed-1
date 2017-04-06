import Foo from './foo.js'
export default class extends Foo {
	constructor(foo="Foo", bar="Bar"){
		super(foo);
		this.bar = bar;
	}

	get bar(){
		return this._bar;
	}
	set bar(bar){
		this._bar = bar;
	}

	get foobar(){
		return `${this.foo}${this.bar}`;
	}
}
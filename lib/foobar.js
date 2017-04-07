import Foo from './foo.js';
export default class extends Foo {
	constructor(canvasId, foo="Foo", bar="Bar"){
		super(foo);
		this.bar = bar;

		var canvas = document.getElementById(canvasId);
		if(canvas && paper){
			paper.setup(canvas);
			var circle = new paper.Path.Circle({
				center: paper.view.center,
				radius: 120,
				fillColor: 'red',
				strokeColor: 'black',
				strokeWidth: 120,
				dashArray: [12,9]
			});
		}
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

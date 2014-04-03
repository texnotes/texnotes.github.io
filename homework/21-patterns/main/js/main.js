//Полифилы, возможно будут полезны всем модулям
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function (fun /*, thisArg */
	) {
		"use strict";
		if (this === void 0 || this === null)
			throw new TypeError();
		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function")
			throw new TypeError();
		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t)
				fun.call(thisArg, t[i], i, t);
		}
	};
}

if (!Function.prototype.bind) {
	Function.prototype.bind = function (oThis) {
		if (typeof this !== "function") {
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}
		var aArgs = Array.prototype.slice.call(arguments, 1),
		fToBind = this,
		fNOP = function () {},
		fBound = function () {
			return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
		};
		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();
		return fBound;
	};
}

$(function () {
	'use strict';

	var justSlider = new Slider('.justSlider');

	makeZoomable($('.gallery-1'));
	makeZoomable($('.gallery-2'));
	
	makeStopwatch($('.container'));
});

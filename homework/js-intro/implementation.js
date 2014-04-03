'use strict';

function createCachable(func) {
	//возвращает новую функцию, которая возвращает результат вызова func и запоминает его, или возвращает уже запомненный результат для текущего аргумента.

	var arg = 0,
	mem = 0;
	var result;
	var fullF = func;

	return function (arg) {

		if (mem === arg) {
			return result;
		} else {
			mem = arg;
			result = fullF(arg);

			return result;
		}
	};

}

function createSummator(initialValue) {
	// Решил благодаря примеру:  http://stackoverflow.com/questions/947352/javascript-closure-and-data-visibility

	var counter = initialValue;
	if (counter === undefined)
		counter = 0;
	return {
		inc : function (incr) {
			if (incr < 1 || isNaN(incr))
				incr = 1;
			for (var i = 0; i < incr; i += 1) {
				counter += 1;
			}
			return counter;
		},

		dec : function (incr) {
			if (incr < 1 || isNaN(incr))
				incr = 1;
			for (var i = 0; i < incr; i += 1) {
				counter -= 1;
			}
			return counter;
		},

		get : function () {
			return counter;
		}

	}

}

function createKeeper() {

	var keeper = [];

	return {
		put : function (key, value) {
			for (var i = 0; i < keeper.length; i += 1) {
				if (keeper[i][0] === key) {
					keeper[i][1] = value;
					return;
				}
			}
			keeper.push([key, value]);
			return;
		},
		get : function (key) {
			for (var i = 0; i < keeper.length; i += 1) {
				if (keeper[i][0] === key) {
					return keeper[i][1];
				}
			}
			return null;
		}
	}
}

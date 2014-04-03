function Counter(value) { //Счетчик на прототипах. Конструктор

	'use strict';

	this.value = value || 0; //защита от создания нового объекта с undefined параметрами
}

//Методы в прототипе
Counter.prototype.inc = function (num) {
	this.value += (num === undefined ? 1 : num);
};

Counter.prototype.dec = function (num) {
	this.value -= (num === undefined ? 1 : num);
};

Counter.prototype.get = function () {
	return this.value;
};

// var myIncDec = new Counter();

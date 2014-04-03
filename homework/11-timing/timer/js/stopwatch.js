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

(function () {
	'use strict';

	/**
	 * Utils
	 */

	function addEvent(obj, event_name, handler) {
		var handler_wrapper = function (event) {
			event = event || window.event;
			if (!event.target && event.srcElement) {
				event.target = event.srcElement;
			}
			return handler.call(obj, event);
		};

		if (obj.addEventListener) {
			obj.addEventListener(event_name, handler_wrapper, false);
		} else if (obj.attachEvent) {
			obj.attachEvent('on' + event_name, handler_wrapper);
		}
		return handler_wrapper;
	}

	function hasClass(node, className) {
		var nodeClasses = node.className.split(' ');

		return nodeClasses.some(function (assignedClass) {
			return assignedClass === className;
		})
	}

	/**
	 * Stopwatch class
	 */

	function Stopwatch(node) { // Конструктор класса

		this.timerNode = node;
		this.timerRun = false;	 // Признак счета времени таймером
		this.timerStartDate = 0; // Начальное значение таймера

		addEvent(this.timerNode, 'click', this.start.bind(this));
		addEvent(this.timerNode.parentNode.parentNode.getElementsByClassName('btn-danger')[0], 'click', this.reset.bind(this));
		addEvent(this.timerNode.parentNode.getElementsByClassName('btn-info')[0], 'click', this.lap.bind(this));
		addEvent(this.timerNode.parentNode.parentNode.parentNode.getElementsByClassName("stopwatch-laps")[0], 'click', this.delegateCloseLap.bind(this));

	}

	Stopwatch.prototype.start = function () {  // Реакция на кнопку "Старт"

		if (!this.timerRun) {

			if (this.timerStartDate === 0)
				this.timerStartDate = Date.now();
			this.timerRun = true;
			this.timer = 0;
			this.timeDisplay();


		} else {

			this.timerRun = false;
		}
	};

	Stopwatch.prototype.timeDisplay = function () { // Отображение счетчика таймера

		var that = this;
		var end = Date.now();
		var elapsed = end - this.timerStartDate; // elapsed time in milliseconds

		var currentTimer1 = this.timerNode.parentNode.parentNode.parentNode.getElementsByClassName("stopwatch-current")[0];
		currentTimer1.innerHTML = msToTime(elapsed);


		clearTimeout(this.timer);					//	Рекурсивній вызов визуализации значения таймера 
		if (this.timerRun) {
			this.timer = setTimeout(function () {
					that.timeDisplay();
				}, 100);							// Чем больше интервал, через которій візіваем функцию, тем менее занят браузер и не так мигают числа 
		}

		function msToTime(duration) { // Помогло немного, т.к. сам сосредоточился на общей реализацией https://coderwall.com/p/wkdefg
			var milliseconds = parseInt(duration % 1000),
			seconds = parseInt((duration / 1000) % 60),
			minutes = parseInt((duration / (1000 * 60)) % 60),
			hours = parseInt((duration / (1000 * 60 * 60)) % 24);

			return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
		}

	};


	Stopwatch.prototype.delegateCloseLap = function (e) { // Удаляем ненужные запомненные счетчики 
		e = e || window.event;
		var target = e.target || e.srcElement;


		if (!hasClass(target, 'label-danger'))
			return;
		target.parentNode.remove();

	};

	Stopwatch.prototype.lap = function () { // Кнопка "Круг"

		var currentTimer1 = this.timerNode.parentNode.parentNode.parentNode.getElementsByClassName("stopwatch-current")[0];
		var currentTimer2 = this.timerNode.parentNode.parentNode.parentNode.getElementsByClassName("stopwatch-laps")[0];
		currentTimer2.innerHTML = '<div class="alert alert-info">' + currentTimer1.innerHTML + '<span class="label label-danger">×</span></div>' + currentTimer2.innerHTML;

	};

	Stopwatch.prototype.reset = function () { // Кнопка "Сброс"

		this.timerStartDate = Date.now();
		var currentTimer1 = this.timerNode.parentNode.parentNode.parentNode.getElementsByClassName("stopwatch-current")[0];
		currentTimer1.innerHTML = "00:00:00:000";
		if (!this.timerRun)
			this.timerStartDate = 0;

		var currentTimer2 = this.timerNode.parentNode.parentNode.parentNode.getElementsByClassName("stopwatch-laps")[0];
		currentTimer2.innerHTML = "";

	};

	function makeStopwatch(timerContainer) { // Создаем экземпляр класса для каждого таймера на странице
		[].forEach.call(timerContainer[0].getElementsByClassName('btn-primary'), function (node) {
			new Stopwatch(node);
		});
	}

	window.makeStopwatch = makeStopwatch;

}
	());
if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== "function") {
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}
		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function() {}, fBound = function() {
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
		var handler_wrapper = function(event) {
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
	 * My Worker Function
	 */
	
	
addEvent(this.timerNode.parentNode.parentNode.parentNode.getElementsByClassName("stopwatch-laps")[0], 'click', this.delegateCloseLap.bind(this));

Stopwatch.prototype.delegateCloseLap = function () {
	if (!hasClass(event.target, 'label-danger')) {
	return;
	}

	event.target.parentNode.remove();

};

});
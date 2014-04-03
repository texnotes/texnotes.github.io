function makeZoomable(node) {

	// CSS styles based on tutorial: http://stevedecoded.com/blog/simple-css-lightbox
	// Vertical alignment in article: http://habrahabr.ru/post/189696/

	// Add additional Div's to document (only once)
	if (!document.getElementById('underlay')) {

		var elemDiv = document.createElement('div');
		elemDiv.id = "underlay";
		document.body.appendChild(elemDiv);
		var elemDiv = document.createElement('div');
		elemDiv.id = "lightbox";
		var elemDiv2 = document.createElement('img');
		elemDiv2.id = "zoom_img";
		elemDiv.appendChild(elemDiv2);
		var elemDiv3 = document.createElement('a');
		elemDiv3.id = "zoom_link";
		elemDiv3.href = "javascript:void()\;";
		elemDiv3.innerHTML = 'Закрыть';
		elemDiv.appendChild(elemDiv3);
		document.body.appendChild(elemDiv);
	}

	var addEvent,
	removeEvent; //Adding an event handler as javascript.ru
	if (document.addEventListener) { //method is present?
		addEvent = function (elem, type, handler) {
			elem.addEventListener(type, handler, false);
		};
		removeEvent = function (elem, type, handler) {
			elem.removeEventListener(type, handler, false);
		};
	} else {
		addEvent = function (elem, type, handler) {
			elem.attachEvent("on" + type, handler);
		};
		removeEvent = function (elem, type, handler) {
			elem.detachEvent("on" + type, handler);
		};
	}

	//Disable lightBox
	addEvent(document.getElementById('zoom_link'), "click", function () {
		document.getElementById('underlay').style.display = 'none';
		document.getElementById('lightbox').style.display = 'none';
	});

	//Initialise lightBox Events
	for (var i = 0; i < node.childNodes.length; i++) {
		var child = node.childNodes[i]
			if (child.nodeType === 1)
				addEvent(child, "click", function (e) {
					document.getElementById('underlay').style.display = 'block';
					document.getElementById('lightbox').style.display = 'block';
					
					var caller = e.target || e.srcElement || window.event.target || window.event.srcElement;
					document.getElementById('zoom_img').src = caller.src.replace("small", "large");  // IE > 8 from: http://stackoverflow.com/questions/11524762/get-the-caller-of-the-event-from-attachevent
					// document.getElementById('zoom_img').src = this.src.replace("small", "large"); // Only IE > 9
				}); ;
	}

	//Solution for catching ESC-key
	document.onkeydown = function (evt) {
		evt = evt || window.event;
		if (evt.keyCode == 27 && document.getElementById('underlay').style.display !== 'none') {
			document.getElementById('underlay').style.display = 'none';
			document.getElementById('lightbox').style.display = 'none';
		}
	};

}

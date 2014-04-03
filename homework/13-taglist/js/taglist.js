(function () {
	'use strict';

//Полифил метода [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Compatibility)
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
//Полифил метода [arr.every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every#Compatibility)
if (!Array.prototype.every) {
	Array.prototype.every = function (fun /*, thisArg */
	) {
		'use strict';

		if (this === void 0 || this === null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== 'function')
			throw new TypeError();

		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t && !fun.call(thisArg, t[i], i, t))
				return false;
		}

		return true;
	};
}
//Полифил метода [arr.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Compatibility)
if (!Array.prototype.filter) {
	Array.prototype.filter = function (fun /*, thisArg */
	) {
		"use strict";

		if (this === void 0 || this === null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun != "function")
			throw new TypeError();

		var res = [];
		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for (var i = 0; i < len; i++) {
			if (i in t) {
				var val = t[i];

				// NOTE: Technically this should Object.defineProperty at
				//       the next index, as push can be affected by
				//       properties on Object.prototype and Array.prototype.
				//       But that method's new, and collisions should be
				//       rare, so use the more-compatible alternative.
				if (fun.call(thisArg, val, i, t))
					res.push(val);
			}
		}

		return res;
	};
}

//Utilities - small javascript functions-utilites for everyday use by [GitHub: Dmitry Podgorniy](https://github.com/podgorniy/javascript-toolbox)
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
		return (' ' + node.className + ' ').indexOf(' ' + className + ' ') !== -1;
	}

//В функции, используемой Дмитрием, есть особенность: 
//-если вставлять класс, туда где нет классов, то перед первым классом появляется пробел
//Оставил код, если будет время постараюсь исправить!
/****	function addClass(node, className) {
		var nodeClasses = node.className.split(' ');

		if (nodeClasses.every(function (assignedClass) {
				return assignedClass !== className;
			})) {
			nodeClasses.push(className);
		}
		node.className = nodeClasses.join(' ');
	}****/
//Использовал решение Кантора [javascript.ru](http://javascript.ru/unsorted/top-10-functions#7-addclass-removeclass)
	function addClass(o, c){
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g")
    if (re.test(o.className)) return
    o.className = (o.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "")
}
 
	function removeClass(node, className) {
		node.className = node.className.split(' ').filter(function (assignedClass) {
				return assignedClass !== className;
			}).join(' ');
	}

//Класс виджита "Показ/Редактирование Тегов"
	function TagList(node, tags) { //Конструктор класса
		this.myTags = tags || []; //Теги переданые конструктору (предопределенные пользователем) 
		this.nodeID = null; //Привязка к разметке виджита (появится после вызова метода startTag)

		this.startTag(node); //Создаем разметочку для виджита
		//Навешиваем обработчики событий
		addEvent(this.nodeID.querySelector('a'), 'click', this.clickTagEdit.bind(this));
		addEvent(this.nodeID.querySelector('.btn.btn-info'), 'click', this.newTagBtn.bind(this));
		addEvent(this.nodeID.querySelector('.taglink'), 'click', this.deleteTag.bind(this));
		addEvent(this.nodeID.querySelector('.form-control'), 'keyup', this.newTagEnter.bind(this));
	}

//Метод - генерируем разметку для виджита	
	TagList.prototype.startTag = function (node) {
		var my_div = document.createElement('div');
		my_div.className = "taglist"; //Основной css-класс виджита

		var my_innerText = '<a href="#">Редактировать теги</a><div class="taglink">';//Создаем css-класс для тегов 
		if (this.myTags){
		for (var i = 0; i < this.myTags.length; i += 1) {
			my_innerText = my_innerText + '<span class="label label-primary">' + this.myTags[i] + '</span> ';
			}
		}
		my_innerText = my_innerText + '</div><div class="input-group"><input placeholder="Введите новый тег" autofocus="autofocus" class="form-control"><span class="input-group-btn"><button type="submit" class="btn btn-info">добавить</button></span></div>';
		my_div.innerHTML = my_innerText; //Разметка для поля ввода тега
		this.nodeID = node.appendChild(my_div);

		this.nodeID.querySelector('.input-group').style.display = 'none';//При инициализации разметки не показываем поле ввода тегов

	};
	
//Выбор режима виджита: показ/редактирование тегов 	
	TagList.prototype.clickTagEdit = function () {
		if (this.nodeID.querySelector('a').innerHTML === "Редактировать теги"){
			this.editTagYes();}
		else if (this.nodeID.querySelector('a').innerHTML === "Завершить редактирование"){
			this.editTagNo();}
	};

//Режима виджита: редактирование тегов   	
	TagList.prototype.editTagYes = function () { 
		this.nodeID.querySelector('.input-group').style.display = 'table';//Меняем внешний вид виджита  
		this.nodeID.querySelector('a').innerHTML = 'Завершить редактирование';
		//Отображаем теги, которые храним в DOM (добавляет разметку для редактирования)
		var tTags = this.nodeID.querySelectorAll('.label-primary');
		for (var i = 0; i < tTags.length; i += 1) {
			removeClass(tTags[i], 'label-primary');
			addClass(tTags[i], 'label-danger');
			tTags[i].innerHTML = tTags[i].innerHTML + '<span data-role="remove"></span>';
		}
	};

//Режима виджита: показ тегов 	
	TagList.prototype.editTagNo = function () {
		this.nodeID.querySelector('.input-group').style.display = 'none';//Меняем внешний вид виджита
		this.nodeID.querySelector('a').innerHTML = 'Редактировать теги';
		//Отображаем теги, которые храним в DOM (удаляет разметку для редактирования)
		var tTags = this.nodeID.querySelectorAll('.label-danger');
		for (var i = 0; i < tTags.length; i += 1) {
			removeClass(tTags[i], 'label-danger');
			addClass(tTags[i], 'label-primary');
			var strTag = tTags[i].innerHTML;
			strTag = strTag.replace('<SPAN data-role="remove"></SPAN>', '');
			if (strTag === tTags[i].innerHTML)
			strTag = strTag.replace('<span data-role="remove"></span>', '');
			tTags[i].innerHTML = strTag;
		}
	};	
	
//Метод getTagList, возвращающий список тегов (массив строк) - получилось очень не оптимально 
	TagList.prototype.getTagList = function () {
//Поскольку, это все-таки домашняя работа, оставил код, который отбросил
//из-за сильной привязки к DOM и его дерганью. Использовать переменную myTags разумнее 	
/****	var el = this.nodeID.querySelector('.taglink').innerHTML;
		//За счет очень упрощенной процедуры парсинга HTML, получили ограничение, что в теге не может быть символа '^'
		el = el.replace(/[ ]{2,}/g, ' '); //Удаляем повторяющиеся пробелы
		el = el.replace(/<[\/]{0,1}(span|SPAN)[^><]*>/g, "^");//Удаляем разметку HTML [аналогично](//http://ajaxination.wordpress.com/2010/08/10/javascript-using-regular-expression-to-remove-certain-tags-from-string/)
		el = el.replace(/[\^]{2,}/g, ''); //Удаляем повторяющиеся значки '^'
		el = el.replace(/(^\^)/, '');//Удаляем '^' вначале строки
		el = el.replace(/( \^)/g, '^');//Удаляем пробелы перед '^'
		var arrElm = el.split("^");****/
		return this.myTags;
	};

//Добавление нового тега по нажатию на кнопке ввода (валитдация данных не выполняется)
	TagList.prototype.newTagBtn = function () {
	var texInput = this.nodeID.querySelector('.form-control').value;
		if (!texInput) {return;} //Выход если поле ввода пустое
		var tagArray = this.getTagList();//Сравнение с уже введеными тегами 
		for (var i = 0; i < tagArray.length; i += 1) {
			if (texInput === tagArray[i]) {return;}
		}
		var el = document.createElement("span");//Добавляем тег в DOM
		addClass(el, 'label');
		addClass(el, 'label-danger');
		el.innerHTML = texInput + '<span data-role="remove"></span>';
		this.nodeID.querySelector('.taglink').appendChild(el);
		this.nodeID.querySelector('.taglink').innerHTML += ' ';//Добавляем пробел из-за кривой разметки (нужно поправить стили)
		this.nodeID.querySelector('.form-control').value = '';//Очищаем поле ввода

		this.myTags.push(texInput);//Добавляем введеное значение (не валитдируем) в массив тегов
		return this.myTags;
	};

//Обработчик ввода тега по нажатию на Enter	
	TagList.prototype.newTagEnter = function (event) {
		if (event.keyCode === 13) {this.newTagBtn();
		}
	};

//Реакция на удаление тега (используем делегирование)	
	TagList.prototype.deleteTag = function (event) {
		if (this.nodeID.querySelector('a').innerHTML === "Редактировать теги"){
			return;}//Выход, если не режим редактирования
		if (!hasClass(event.target, '')){
			return;}//Скользкая дорожка, но css специфические по подобию [проекта](http://timschlechter.github.io/bootstrap-tagsinput/examples/)
//Удаляем тег из DOM и массива myTegs
		var node = event.target.parentElement;
		if (node.parentNode) {
		var el = node.innerHTML;
		el=el.replace('<SPAN data-role="remove"></SPAN>','');
		el=el.replace('<span data-role="remove"></span>','');

		for (var i =0; i<this.myTags.length; i+=1){
		if (el===this.myTags[i]) {
			this.myTags.splice(i,1); 
				}
			}
			node.parentNode.removeChild(node);
		}
		return this.myTags;
	};

//Хелпер: создаем экземпляр класса для виджита и проброс метода в глобальную область видимости
	function makeTagList(tagListContainer, tags) {  
		return new TagList(tagListContainer, tags);
	}
	window.makeTagList = makeTagList;
}
	());

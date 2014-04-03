//Текущая версия скрипта не завершена. Он не сработает для нескольких слайдеров на странице.
//Для универсализации надо везде сделать привязку к "this.node". Не успел. 
//Много лишних комментариев в коде - для документации домашки. В реализе их следует убрать.  

//Много времени потратил на разметку. Спасибо всем за ответы на форуме!
//В разметке вижу один недостаток - не хватает одного пикселя внизу навигации:
//можно решить или уменьшением контейнера картинок или немного по другому сделать контейнер кнопок.
(function () {
	'use strict';

	var SLIDES_NUM = 4; //Для удобства нумерация с первого слайда.
	var NAVIGATION = '.controlsNav';
	var SLIDE_FRAME = '.sliderImg';

	function Slider(node) {
		this.node = $(node);
		this.currentSlide = 1; //Счетчик слайдов
		this.controlsNav = null;
		this.timer = null; //Идентификатор функции тайм-аута

		this.init();
	}

//При решении задачи помогли ресурсы (код не смотрел, только идеи для разметки):
// - задача "Карусель" [javascript.ru](http://learn.javascript.ru/task/karusel)
// - карусель на jQuery (идея с дополнительной картинкой) [HTMLforum](http://htmlforum.ru/index.php?showtopic=23096)
// - display: table-cell with multiple rows (equal height columns, multiple rows) [Stack Overflow](http://stackoverflow.com/questions/10595601/display-table-cell-with-multiple-rows-equal-height-columns-multiple-rows)
// - то, что вам никто не говорил о z-index [Хабрахабр](http://habrahabr.ru/post/166435/)
// - z-index в IE - решение с помощью CSS [Web-Gate](http://web-gate.org/blog/z-index-in-ie.html)
	Slider.prototype.cycleSlider = function () {//Автоматическое листание слайдов
//Для плавного скролинга в скрипте копируется первый рисунок в конец.
//Надо было так же сделать и для последнего для режима ручного переключения слайдов
		var that = this;
		var currentSlide = this.currentSlide;
		currentSlide += 1;

		if (currentSlide > SLIDES_NUM) {
			currentSlide = 1;
			this.currentSlide = currentSlide;
			$(SLIDE_FRAME).animate({"left" : "-=910px"}, 1000, "swing", function () {
			$(SLIDE_FRAME).css({"left" : 0});
			});
		} else {
			this.currentSlide = currentSlide;
			$(SLIDE_FRAME).animate({"left" : "-=910px"}, 1000, "swing");
		}
//В соответствии со слайдом включаем нужную кнопку. Немного запутался с добавлением класса (очевидно, это можно проще реализовать)
		var navPanel = $(NAVIGATION).children('.selected').removeClass('selected');
		var kids = $(NAVIGATION).children();
		kids[this.currentSlide - 1].className += ' selected';
		
		clearTimeout(this.timer); 
		this.timer = setTimeout(function () {//Рекурсивный вызов анимации
				that.cycleSlider();
			}, 2000); //Интервал желательно было бы передавать параметром, впрочем, как и скорость листания слайда
	}
//Для ручного выбора слайда - переход на n-слайдов вправо 
	Slider.prototype.moveSlideRight = function (num) {
		num = num || 1;
		var data = 910 * num;
		$(SLIDE_FRAME).animate({"left" : "+=" + data + "px"}, "slow");
	}
//Для ручного выбора слайда - переход на n-слайдов влево
	Slider.prototype.moveSlideLeft = function (num) {
		num = num || 1;
		var data = 910 * num;
		$(SLIDE_FRAME).animate({"left" : "-=" + data + "px"}, "slow");
	}
//Инициализация слайдера
	Slider.prototype.init = function () {
		var that = this;
//Для плавности показа добавляем псевдо-слайд дублирующий нулевой	
		var sliderImages = $(SLIDE_FRAME).find('img');
		if ((sliderImages[0].src) !== (sliderImages[(sliderImages.length - 1)].src)) { 
			var addPseudoImg = $(SLIDE_FRAME).children();
			$(SLIDE_FRAME).append("<li>" + addPseudoImg[0].innerHTML + "</li>");
		}
//Делегируем обработку нажатий на кнопки выбора слайда
		this.controlsNav = this.node.find(NAVIGATION);
		this.controlsNav.on('click', $.proxy(function (event) {
				var nextSlide;
				var clickBtn = $(event.target);
//Останов автослайдера и его запуск спустя интервал задержки
				clearTimeout(this.timer);//Останов авто-показа и навсякий случай сброс анимации
				$(SLIDE_FRAME).finish();
				this.timer = setTimeout(function () {//Запуск авто-слайдера. Для универсальности - интервал лучше передавать в переменной
						that.cycleSlider();
					}, 5000);

				if (clickBtn.hasClass('selected')) {
				return;
				}
//Определение номера слайда, куда надо перелистать
				switch (event.target.className) {
				case 'navSlide1':
					nextSlide = 1;
					break;
				case 'navSlide2':
					nextSlide = 2;
					break;
				case 'navSlide3':
					nextSlide = 3;
					break;
				case 'navSlide4':
					nextSlide = 4;
					break;
				default:
					return;
				}

				this.node.find('.selected').removeClass('selected');
				clickBtn.addClass('selected');
//Определение направления листания и количества перелистываемых слайдов, в зависимости от выбора пользователя
				if (this.currentSlide === nextSlide)
					return;
				else if (nextSlide > this.currentSlide) {//Можно оптимизировать этот "copy-paste" код
					var step = nextSlide - this.currentSlide;
					this.currentSlide = this.currentSlide + step;
					this.moveSlideLeft(step);

				} else if (nextSlide < this.currentSlide) {
					var step = this.currentSlide - nextSlide;
					this.currentSlide = this.currentSlide - step;
					this.moveSlideRight(step);
				}

			}, this));

		this.cycleSlider();
	}

	window.Slider = Slider;
}
	());

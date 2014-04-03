//Много времени потратил на разметку. Спасибо всем за ответы на форуме!
(function () {
	'use strict';

	var SLIDES_NUM = 4; //Для удобства нумерация с первого слайда.
	var NAVIGATION = '.controlsNav';
	var SLIDE_FRAME = '.sliderImg';

	function Slider(node) {
		this.node = $(node);
		this.currentSlide = 1; //Счетчик слайдов
		this.controlsNav = null;
		this.timer = null; 

		this.init();
	}

	Slider.prototype.cycleSlider = function () {
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
		var navPanel = $(NAVIGATION).children('.selected').removeClass('selected');
		var kids = $(NAVIGATION).children();
		kids[this.currentSlide - 1].className += ' selected';
		
		clearTimeout(this.timer); 
		this.timer = setTimeout(function () {
				that.cycleSlider();
			}, 2000); //Интервал желательно было бы передавать параметром
	}
	Slider.prototype.moveSlideRight = function (num) {
		num = num || 1;
		var data = 910 * num;
		$(SLIDE_FRAME).animate({"left" : "+=" + data + "px"}, "slow");
	}
	Slider.prototype.moveSlideLeft = function (num) {
		num = num || 1;
		var data = 910 * num;
		$(SLIDE_FRAME).animate({"left" : "-=" + data + "px"}, "slow");
	}
	Slider.prototype.init = function () {
		var that = this;

		var sliderImages = $(SLIDE_FRAME).find('img');//Для плавности показа добавляем псевдо-слайд дублирующий нулевой	
		if ((sliderImages[0].src) !== (sliderImages[(sliderImages.length - 1)].src)) { 
			var addPseudoImg = $(SLIDE_FRAME).children();
			$(SLIDE_FRAME).append("<li>" + addPseudoImg[0].innerHTML + "</li>");
		}
		this.controlsNav = this.node.find(NAVIGATION);
		this.controlsNav.on('click', $.proxy(function (event) {
				var nextSlide;
				var clickBtn = $(event.target);
				clearTimeout(this.timer);//Останов авто-показа и навсякий случай сброс анимации
				$(SLIDE_FRAME).finish();
				this.timer = setTimeout(function () {//Запуск авто-слайдера. Для универсальности - интервал лучше передавать в переменной
						that.cycleSlider();
					}, 5000);

				if (clickBtn.hasClass('selected')) {
				return;
				}
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
});

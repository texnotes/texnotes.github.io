(function ($) {
	'use strict';
	
	var TAB_SELECTOR = "ul";
	var TAB_CONTENT = ".tab-content";
	var TAB_CONTENT_SELECTOR = "div";
	var objTabable = null;
	
	function Tabable(el) {
		this.el = el;
		this.tabShown = 0;
		this.tabShownMAX = 0;
		this.init(TAB_SELECTOR);
	}

	Tabable.prototype.init = function (selector) {
		this.el.find("> "+selector).addClass("nav nav-tabs");//Инициализация классов табов
		this.el.find("> "+selector+" :first").addClass("active");
		this.tabShownMAX = this.el.find("> "+TAB_SELECTOR+" > *").length - 1;//Определение количества табов
		this.el.find("> "+TAB_CONTENT+" > "+TAB_CONTENT_SELECTOR+":first").addClass("active");//Инициализация контента табов
		this.el.trigger('tabable-init', selector);
		this.el.trigger('tabable-tab-shown', this.tabShown);
		//Обработчик события по нажатию на табы (делегирование)
		this.el.find("> "+selector).on('click', $.proxy(function(event) {
		var clickElm = $(event.target);
		if (clickElm.hasClass( 'nav' )) return;
		var selectedTab = clickElm.parent("li").index();
		if (selectedTab === this.tabShown) return;
		this.show(selectedTab);
		
		}, this));
	}

	Tabable.prototype.show = function(index) {
		if (index===this.tabShown || index > this.tabShownMAX || index < 0) return;
		//Установка активного таба (старый убирается автоматом - тот у которого был раньше класс active)
		this.el.find("> "+TAB_SELECTOR+" > .active").removeClass("active");
		this.el.find("> "+TAB_SELECTOR+" > *").eq(index).addClass("active");
		//Аналогично показывается контент для выбранного таба
		this.el.find("> "+TAB_CONTENT+" > .active").removeClass("active");
		this.el.find("> "+TAB_CONTENT+" > *").eq(index).addClass("active");
	
		this.tabShown = index;
		this.el.trigger('tabable-tab-shown', this.tabShown);
	}
	
	Tabable.prototype.destroy = function() {
		//Удаляем класс active для табов и контента
		this.el.find("> "+TAB_SELECTOR+" > .active").removeClass("active");
		this.el.find("> "+TAB_CONTENT+" > .active").removeClass("active");
		//Удаление классов для табов 
		this.el.find("> "+TAB_SELECTOR).removeClass("nav");
		this.el.find("> "+TAB_SELECTOR).removeClass("nav-tabs");
		//Отключаем обработчик события по клику на табе
		this.el.find("> "+TAB_SELECTOR).off("click");
		//Отключаем кастомные события
		$(document).off('tabable-init');
		$(document).off('tabable-tab-shown');
	}
	
	$.fn.tabable = function () {
		if (!objTabable) {
		objTabable = new Tabable(this);}
		return objTabable;
	}

	$(document).on('tabable-init', function (event, tabableWidget) {
		console.log('Widget tabable was initialized by ', tabableWidget);
	});
	
	$(document).on('tabable-tab-shown', function (event, tabShow) {
		console.log('Tab with index', tabShow, 'was shown')
	});
	
}(jQuery));

$(document).ready(function () {
	$('.tabable').tabable();
	//Тестирование методов плагина
	//$('.tabable').tabable().show(1);
	//$('.tabable').tabable().destroy();
});


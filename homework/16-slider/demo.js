(function ($) {
	'use strict';

$('head').append('<link rel="stylesheet" href="homework/16-slider/css/slider.css" type="text/css" />');

var html = 	'<h1>Слайдер</h1>'+
	'<p>Реализация класса Slider. Слайдер состоит из фиксированного количества слайдов (4шт), изображения имеют одинаковый заранее известный размер.'+
	'Переход между слайдами анимирован. При клике на плашку слева происходит переход к соответствующему слайдеру, соответствие определяется порядком. '+
	'Верхняя плашка - первый слайд, вторая сверху - второй, итд.</p> '+
	'<p>Сразу же после инициализации у слайдера включается режим автопрокрутки: показ следующего слайда каждые 2 секунды. '+
	'Если пользователь кликнул на одну из плашек, перейдя к слайду, автопрокрутка отключается. Автопрокрутка включается через 5 секунд после последнего клика пользователя по плашке.'+
	'Автопрокрутка циклическая: с последнего слайда происходит переход к первому. На странице можно разместить несколько слайдеров.</p>'+
	'<div class="justSlider">'+
'	<ul class="controlsNav">'+
'		<li class="navSlide1 selected"></li>'+	
'		<li class="navSlide2"></li>	'+
'		<li class="navSlide3"></li>	'+
'		<li class="navSlide4"></li>	'+
'	</ul>'+
'<div class="containerImg">'+
'		<ul class="sliderImg">'+
'		<li><img alt="" src="homework/16-slider/img/image1.jpg"></li>' +	
'		<li><img alt="" src="homework/16-slider/img/image2.jpg"></li>'	+
'		<li><img alt="" src="homework/16-slider/img/image3.jpg"></li>'	+
'		<li><img alt="" src="homework/16-slider/img/image4.jpg"></li>'	+
'	</ul></div>'+
'</div>';


var DEMO_FRAME = '#portfolio-demo';

$(DEMO_FRAME).append(html);

}(jQuery));	
	
		
	





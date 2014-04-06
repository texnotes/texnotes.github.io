(function ($) {
	'use strict';

$('head').append('<link rel="stylesheet" href="homework/13-taglist/css/main.css" type="text/css" />');

var html = 	'<div class="container">'+
'	<br />'+
'			<div class="row">'+
'			<div class="col-xs-6">'+
'			<h3>Тестирование класса "TagList".</h3>'+
'			<p><i>Пример инициализации:</i></p>'+
'			<p>var el = makeTagList(document.querySelector(".widget"),["Первый", "Второй", "Третий", "Последний"]);</p>'+
'			<p><i>Вызов функции, возвращающей теги: </i>el.getTagList();</p>'+
'			<p>В режиме редактирования можно добавлять и удалять теги. Добавлять уже существующие теги нельзя.</p>'+
'			<h4>Для теста создается два независимых виджита: <br />пустой и с предопределенными тегами</h4>'+
'	<div class="widget"></div>'+
'	</div>';


var DEMO_FRAME = '#portfolio-demo';

$(DEMO_FRAME).append(html);

}(jQuery));	
	
		
	





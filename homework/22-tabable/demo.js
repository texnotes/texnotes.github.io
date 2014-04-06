(function ($) {
	'use strict';

//$('head').append('<link rel="stylesheet" href="homework/09-zoomer/realise/css/zoomer.css" type="text/css" />');

var html = 	'<h1>Реализация плагина табов - "tabable"</h1>'+
'	<p>Настройки: селектор для табов "> ul > *", селектор для содержимого табов	"> div:first > *".'+
'	API: custom events:	tabable-tab-shown, tabable-init. Методы: show(index) - показать таб с индексом index. '+
'	Если индекс больше или меньше сущестувющего, ничего не предпренимать (custom событие не должно происходить).'+
'	destroy() - удалить плагин убрать вспомагательные класса плагина, обработчики событий, но ничего, '+
'	добавленного или не плагином не убирать пользователем.</p> '+
'	<div class="tabable" style="background-color:white">'+
'	<!-- Nav tabs -->'+
'	<ul>'+
'		<li><a href="#">Uno</a></li>'+
'		<li><a href="#">Tuo</a></li>'+
'		<li><a href="#">Tetra</a></li>'+
'	</ul>'+
'	<!-- Tab panes -->'+
'	<div class="tab-content">'+
'		<div class="tab-pane">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia, earum, ea deleniti dicta nam repellat. </div>'+
'		<div class="tab-pane">Quae expedita est ex ad et nobis laudantium reprehenderit soluta ratione accusamus voluptatem illo quas.</div>'+
'		<div class="tab-pane">Onsectetur adipisicing elit. Mollitia, earum, ea deleniti dicta.</div>'+
'	</div>'+
'</div>';

var DEMO_FRAME = '#portfolio-demo';

$(DEMO_FRAME).append(html);

}(jQuery));	
	
		
	





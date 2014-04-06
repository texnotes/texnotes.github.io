(function ($) {
	'use strict';

$('head').append('<link rel="stylesheet" href="homework/15-zoomer/css/zoomer.css" type="text/css" />');

var html = 	'<h1>Набор фоток номер один</h1>'+
'	<div class="gallery-1">'+
'		<img src="homework/15-zoomer/img/small/birds.jpg" alt="">'+
'		<img src="homework/15-zoomer/img/small/dog.jpg" alt="">'+
'	</div>'+
'	<h1>Набор фоток номер два</h1>'+
'	<div class="gallery-2">'+
'		<img src="homework/15-zoomer/img/small/goats.jpg" alt="">'+
'		<img src="homework/15-zoomer/img/small/hedgehog.jpg" alt="">'+
'		<img src="homework/15-zoomer/img/small/pigeon.jpg" alt="">'+
'	</div>';
	

var DEMO_FRAME = '#portfolio-demo';

$(DEMO_FRAME).append(html);

}(jQuery));	
	
		
	





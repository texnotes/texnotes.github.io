(function ($) {
	'use strict';

$('head').append('<link rel="stylesheet" href="homework/11-timing/timer/css/main.css" type="text/css" />');

var html = 	'<div class="container">'+
'			<div class="row">'+
'			<div class="col-xs-4">'+
'				<h2 class="stopwatch-current">00:00:00:000</h2>'+
'				<div class="stopwatch-laps">'+
'				</div>'+
'			</div>'+
'			<div class="col-xs-4 stopwatch-controls">'+
'				<div class="btn-group btn-group-lg">'+
'					<button class="btn btn-primary">Start</button>'+
'					<button class="btn btn-info">Lap</button>'+
'				</div>'+
'				<button class="btn btn-danger btn-sm">Reset</button>'+
'			</div>'+
'		</div>'+
'	</div>';


var DEMO_FRAME = '#portfolio-demo';

$(DEMO_FRAME).append(html);

}(jQuery));	
	
		
	





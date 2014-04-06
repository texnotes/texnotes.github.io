(function ($) {
	'use strict';

//$('head').append('<link rel="stylesheet" href="homework/09-zoomer/realise/css/zoomer.css" type="text/css" />');

var html = 	'<div class="container">'+
'		<h1>Форма сбора данных</h1>'+
'		<form role="form">'+
'			<div class="form-group required">'+
'				<label class="control-label" for="email">Почта (будет использована как логин)<sup>*</sup></label>'+
'				<input class="form-control" id="email" placeholder="Почта" type="text">'+
'				<div class="alert alert-danger" id= "alert-email" style = "display:none;">Важное сообщение</div>'+	
'			</div>'+
'			<div class="form-group required">'+
'				<label for="password">Пароль (постарайся придумать посложнее)<sup>*</sup></label>'+
'				<input class="form-control" id="password" placeholder="Пароль" type="password">'+
'			</div>'+
'			<div class="form-group">'+
'				<label for="city">Город проживания (указывать не обязательно)</label>'+
'				<input class="form-control" id="city" placeholder="Город" type="text">'+
'			</div>'+
'			<div class="form-group required">'+
'				<div class="checkbox">'+
'					<label>'+
'						<input id="checkbox" type="checkbox"> Согласен со <a href="/">всем</a>'+
'					</label>'+
'				</div>'+
'			</div>'+
'			<div class="form-group">'+
'				<button type="submit" class="btn btn-primary disabled">Отправить данные</button>'+
'			</div>'+
'		</form>'+
'	</div>';

var DEMO_FRAME = '#portfolio-demo';

$(DEMO_FRAME).append(html);

}(jQuery));	
	
		
	





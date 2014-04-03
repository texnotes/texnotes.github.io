(function () {
	'use strict';

	//Resouces:
	//[How to check if a user has scrolled to the bottom](http://stackoverflow.com/questions/3898130/how-to-check-if-a-user-has-scrolled-to-the-bottom)
	//[Window.onscroll](https://developer.mozilla.org/en-US/docs/Web/API/window.onscroll)
	//[Размеры и прокрутка для страницы](http://learn.javascript.ru/metrics-window
	
	//[XMLHTTPRequest: описание, применение, частые проблемы](http://xmlhttprequest.ru/)

	//[Топ-11 самых частых ошибок в JavaScript](http://habrahabr.ru/post/121803/)
	//[Польза от documentFragment](http://javascript.ru/optimize/documentfragment-0)
	
	var dataLoading = false;//Запущен ли процесс подгрузки данных 
	
	//Получение данных XMLHTTPRequest
		var xhr = new XMLHttpRequest();
		
		
			function myCallback() {
			if (xhr.readyState < 4) {
				return; //Данных пока нет
			}
			if (xhr.status !== 200) {
				//Ошибка HTTP данных точно не будет
				dataLoading = false;
				return;
			}
			//Даные есть
			dataLoading = false;
			
			var myResHTML = xhr.responseText;
			
	//Все-таки разобрался с document.createDocumentFragment(), 
	//но его поведение несовсем ожидаемое в документе множатся ID'шники #maincontent;
	//Осталось добавить поиск ссылки уже из подгружаемого контента.
	//Еще нужна проверка, что myResHTML уже есть (но работает и без нее).
	
			var fragment = document.createDocumentFragment();
			var fragment_div=document.createElement("div");
			fragment_div.innerHTML = myResHTML;
			
			var insertDoc = fragment_div.querySelector('#maincontent');
			var	mainDoc = document.querySelector('#maincontent');

			mainDoc.appendChild(insertDoc);

			}
			
		xhr.onreadystatechange = myCallback;
		
	//Поиск ссылки для подгрузки данных
	var mainContent = document.querySelector('#maincontent');
	var findPrev = mainContent.querySelectorAll('A');
	var readNextUrl;
	for (var i = 0; i < findPrev.length; i += 1) {
		if (findPrev[i].rel == 'prev') {
			readNextUrl = findPrev[i].href;
		}
	}
//Определение текущего конца страницы
	window.onscroll = scroll;
	function scroll() {
		//scroll event detected

		//Текущая прокрутка
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		//Размер видимой части окна
		var clientHeight = document.documentElement.clientHeight;
		//Высота с учетом прокрутки
		var scrollHeight = document.documentElement.scrollHeight;
		scrollHeight = Math.max(scrollHeight, clientHeight);

		if (scrollTop + clientHeight === scrollHeight) {

			if (!dataLoading) {
			dataLoading = true;
		
			xhr.open('GET', readNextUrl, true);
			xhr.send('');
			
				}		
			}
		}
});
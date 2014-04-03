(function () {
	'use strict';

	var CONFIG_FILE = 'config.json';

	function Portfolio(node) {

		this.node = $(node);
		this.config = null;
		this.listIndex = 0;

		//Загрузка файла с настройками
		$.getJSON(CONFIG_FILE, $.proxy(function (json) {
				this.config = json;

				this.init();
				return;
			}, this));

	}

	Portfolio.prototype.init = function () {

		$.each(this.config, function (index, value) {
	
		$('.pf-aside-list', this.node).append("<li>" + value.Homework + "</li>"); ;
		});
		$('.pf-aside-list :first-child', this.node).addClass('selected');

		$("#pf-loading").hide(); //Не привязан к основному контейнеру, фактически - псевдоэлемент
		this.node.show();

		
		$.get(this.config[0].Path+'/'+this.config[0].Files.Description, $.proxy(function (text) {

				//Перенести инициализацию плагина маркдауна в main.js
				var converter = new Markdown.Converter();
				var html = converter.makeHtml(text);
				$('.pf-article', this.node).append(html);

				return;
			}, this));

			
	
				$.get(this.config[0].Path+'/'+this.config[0].Files.Code[0], $.proxy(function (text) {

				$('.pf-article', this.node).append("<pre><code>"+text+"</code></pre>");
	
				if(hljs){ //Для IE8 не будет подсветки кода
				$('pre code',  this.node).each(function(i, e) {hljs.highlightBlock(e)});
						}
				return;
			}, this));


		//Выбор домашки (асинхронно) 
		$('.pf-aside-list', this.node).on('click', $.proxy(function(event) {

		var clickElm = $(event.target);
		if (clickElm.hasClass( 'selected' )) return;
		this.listIndex = clickElm.index( "li" );
		$('.pf-aside-list', this.node).find('.selected').removeClass('selected');
		clickElm.addClass('selected');

		//alert(this.config[this.listIndex].Path+'/'+this.config[this.listIndex].Files.Description);

		}, this));

			
	};

	
	
	
	window.Portfolio = Portfolio;

})();


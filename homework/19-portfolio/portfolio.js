(function () {
	'use strict';

	var CONFIG_FILE = '/config.json';

	function Portfolio(node) {

		this.node = $(node);
		this.config = null;

		//Загрузка файла с настройками
		$.get(CONFIG_FILE, $.proxy(function (json) {
				this.config = json;
				this.init();
				return;
			}, this));

	}

	Portfolio.prototype.init = function () {

		$.each(this.config, function (index, value) {
			$('.pf-aside-list', this.node).append("<li>" + value.Name + "</li>"); ;
		});
		$('.pf-aside-list :first-child', this.node).addClass('selected');

		$("#pf-loading").hide(); //Не привязан к основному контейнеру, фактически - псевдоэлемент
		this.node.show();

		//Путь взять из конфига

		$.get('/js-intro/about.md', $.proxy(function (text) {

				//Перенести инициализацию плагина маркдауна в main.js
				var converter = new Markdown.Converter();
				var html = converter.makeHtml(text);
				$('.pf-article', this.node).append(html);

				return;
			}, this));

			
					//Путь взять из конфига		
					$.get('/js-intro/ok-operators.js', $.proxy(function (text) {

				$('.pf-article', this.node).append("<pre><code>"+text+"</code></pre>");
				$('pre code',  this.node).each(function(i, e) {hljs.highlightBlock(e)});

				return;
			}, this));

			
	};

	window.Portfolio = Portfolio;

});


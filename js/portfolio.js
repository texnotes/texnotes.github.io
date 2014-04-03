(function () {
	'use strict';

	var CONFIG_FILE = 'config.json';

	function Portfolio(node) {

		this.node = $(node);
		this.config = null;
		this.listIndex = 0;

		var options = {
			bg : '#acf',

			// left target blank for global nanobar
			//	target: document.getElementById('myDivId'),

			// id for new nanobar
			id : 'mynano'
		};

		var nanobar = new Nanobar(options);

		// move bar
		nanobar.go(30); // size bar 30%


		//Загрузка файла с настройками
		$.getJSON(CONFIG_FILE, $.proxy(function (json) {
				this.config = json;

				this.init();
				nanobar.go(100); // size bar 100%

				this.adjustSize();

				$(window).on('resize', $.proxy(function (event) {
						this.adjustSize();

					}, this));

				return;
			}, this));

	}

	Portfolio.prototype.adjustSize = function () {
		var winHeight = $(window).height();
		var elmHeight = $('.pf-article.selected').height();
		if (elmHeight < winHeight)
			$('.pf-article.selected').height($(window).height() - 80);

		if ($('.pf-article.selected').height() < $('.pf-article.selected pre').height()) {
			$('.pf-article.selected').height($('.pf-article.selected pre').height());
		}

	};

	Portfolio.prototype.init = function () {

		$.each(this.config, function (index, value) {
			$('.pf-aside-list', this.node).append("<li>" + value.Homework + "</li>");
		});
		$('.pf-aside-list :first-child', this.node).addClass('selected');
		$("#pf-loading").hide(); //Не привязан к основному контейнеру, фактически - псевдоэлемент
		this.node.show();
		$('.pf-aside', this.node).mCustomScrollbar({
			scrollButtons : {
				enable : true
			},
			autoHideScrollbar : true,
			theme : "dark"
		});

		this.loadFiles();

		//Выбор домашки (асинхронно)
		$('.pf-aside-list', this.node).on('click', $.proxy(function (event) {

				var clickElm = $(event.target);
				if (clickElm.hasClass('selected'))
					return;
				this.listIndex = clickElm.index("li");
				$('.pf-aside-list', this.node).find('.selected').removeClass('selected');
				clickElm.addClass('selected');

				//		alert(this.config[this.listIndex].Path+'/'+this.config[this.listIndex].Files.Description);
				this.clearTabs();
				//this.generateTabs();
				this.loadFiles();
			}, this));

		//Обработчик события по нажатию на табы (делегирование)
		this.node.find(".pf-nav").on('click', $.proxy(function (event) {
				var clickElm = $(event.target);
				if (clickElm.hasClass('pf-nav') || clickElm.hasClass('selected'))
					return;
				var selectedTab = clickElm.index();
				this.node.find(".pf-nav > .selected").removeClass("selected");
				this.node.find(".pf-nav > span").eq(selectedTab).addClass("selected");

				this.node.find(".pf-content > .selected").removeClass("selected");
				this.node.find(".pf-content > div").eq(selectedTab).addClass("selected");

				this.adjustSize();

			}, this));

	};

	Portfolio.prototype.loadFiles = function () {
		var hwrkID = this.listIndex;
		var numCodeTabs = this.config[hwrkID].Files.Code.length;
		//Loading Markdown text
		var _hwrkID = hwrkID;

		var sources = [];

		sources[0] = this.config[hwrkID].Path + '/' + this.config[hwrkID].Files.Description;
		for (var i = 0; i < this.config[hwrkID].Files.Code.length; i += 1) {
			sources[i + 1] = this.config[hwrkID].Path + '/' + this.config[hwrkID].Files.Code[i];
		}
		//Generate Tabs
		this.generateTabs();
		this.adjustSize();

		$('.pf-article', this.node).eq(0).append("<p>Загрузка данных...</p>");
		$('.pf-article', this.node).addClass("csspinner duo no-overlay");

		//return;
		var deferreds = $.map(sources, function (src) { //Source: http://stackoverflow.com/questions/17595297/jquery-deferred-when-with-multiple-objects
				return $.get(src);
			});

		$.when.apply($, deferreds).then($.proxy(function () {

				this.clearTabs();
				this.generateTabs();

				var converter = new Markdown.Converter(); //Перенести инициализацию плагина маркдауна в main.js

				var html = converter.makeHtml(deferreds[0].responseText);
				$('.pf-article', this.node).eq(0).append(html);

				for (var i = 1; i < deferreds.length; i += 1) {

					var text = deferreds[i].responseText;

					if (this.config[hwrkID].Files.Code[i - 1] === "demo.js") {
					//	text = "_____________Демка))";
					//$('.pf-article', this.node).eq(i).append('<span class="runtime"><a href="javascript: makeZoomable(document.querySelector('+"'.gallery-2'"+')); void(0)">Запустить скрипт</a></span>');

						$('.pf-article', this.node).eq(i).append('<span id="portfolio-demo"></span>');
						$('.pf-article', this.node).eq(i).append('<script>'+text+'</script>');
					} else {
						text = text.replace(/</g,'&lt;').replace(/>/g,'&gt;');
						if (this.config[hwrkID].Files.Runtime && this.config[hwrkID].Files.Runtime[i - 1]) {
							$('.pf-article', this.node).eq(i).append('<span class="runtime"><a href="javascript: ' + this.config[hwrkID].Files.Runtime[i - 1] + ' void(0)">Запустить скрипт</a></span><pre><code>' + text + '</code></pre>');
						} else {

							$('.pf-article', this.node).eq(i).append('<pre><code class="language-javascript">' + text + '</code></pre>');

						}
					}

				}
//makeZoomable(document.querySelector('.gallery-1'));
if (this.config[hwrkID].Files.Code[0] === "demo.js") {
var initScript = this.config[hwrkID].Files.Runtime[0];
eval(initScript); // Dangerous!

}


				if (hljs) { //Для IE8 не будет подсветки кода
					$('pre code', this.node).each(function (i, e) {
						hljs.highlightBlock(e)
					});
				}

				this.adjustSize();

			}, this));

	};

	Portfolio.prototype.generateTabs = function () {

		var hwrkID = this.listIndex;
		var numCodeTabs = this.config[hwrkID].Files.Code.length;

		this.node.find(".pf-nav").append('<span class="pf-nav-about selected">Описание</span>');

		this.node.find(".pf-content").append('<div class="pf-article selected"></div>');

		var fileName;
		for (var i = 0; i < numCodeTabs; i += 1) {
			fileName = this.config[hwrkID].Files.Code[i];
			if (fileName === 'demo.js')
				fileName = "Демонстрация";
			this.node.find(".pf-nav").append('<span class="pf-nav-code">' + fileName + '</span>');

			this.node.find(".pf-content").append('<div class="pf-article"></div>');

		}

		return;

	};

	Portfolio.prototype.clearTabs = function () {

		this.node.find(".pf-nav > span").remove();

		this.node.find(".pf-content > div").remove();

		return;

	};

	window.Portfolio = Portfolio;

})();

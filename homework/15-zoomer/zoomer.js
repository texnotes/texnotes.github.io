function makeZoomable(node) {
	'use strict';
	
	var ZOOM_BTN_WIDTH = 42; //Ширина картинки закрытия "Х"

	$(document).ready(function () {//Перестраховка на случай, если еще не создан DOM

//Добавляем в DOM компоненты lightbox (только один раз)
		if (!$(".underlay").length) {
			var $newdiv1 = $('<div class="underlay"></div>');
			var $newdiv2 = $('<div class="lightbox"><img class="zoom_img" src="#"><img class="zoom_btn" src="homework/15-zoomer/img/close_button.png"></div>');
			$("body").append($newdiv1, $newdiv2);
//Навешиваем обработчик события на нажатие кнопки "Х"
			$('.zoom_btn').click(function () {
				closeLightbox();
			});
		}
//Дя всех изображений из узла node навешиваем обработчик события - клик мышки
		$(node).find('img').click(function () {
			var imageSrc = this.src.replace('small', 'large');//Меняем каталог превьющек на увеличенные изображения
			$('.underlay').show();
			$('.lightbox .zoom_img').attr("src", imageSrc);
//Колбэк для показа увеличиного изображения
			$('.lightbox').show(function () {
				$('.lightbox .zoom_btn').show();//Решает проблему с "прыжком" кнопки "Х" из предыдущей позиции
				zoomBtnPosition();
			});
		});
	});
//Обработчик события на изменение размера браузера
	$(window).resize(function () {
		zoomBtnPosition();
	});
//Скрытие lightbox
	function closeLightbox() {
		$('.lightbox .zoom_btn').hide();//Решает проблему с "прыжком" кнопки "Х" из предыдущей позиции
		$('.lightbox').hide();
		$('.underlay').hide();
	}
//Пересчет позиции кнопки "Х"
	function zoomBtnPosition() {
		var position = $('.lightbox .zoom_img').offset();
		position.left = position.left + $('.lightbox .zoom_img').width() - ZOOM_BTN_WIDTH;
		$('.lightbox .zoom_btn').offset(position);
	}
//Обработчик события нажатия на кнопку "Esc". Делегируем событие на весь документ
	$(document).keyup(function (e) {
		if (e.keyCode == 27) {
			if ($('.underlay')) {
				closeLightbox();
			}
		}
	});
}

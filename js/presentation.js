
var trip1 = new Trip([{
				sel : $(".pf-aside"),
				content : "JS-портфолио - это небольшой виджит,<br/> написанный на JavaScript.<br/>",
				position : "screen-center"
			}, {
				sel : $(".pf-about"),
				content : "Предназначен для тестировния и представления JS-кода.",
				position : "screen-center"
			}, {
				sel : $(".pf-about"),
				content : "Курсы JS, в рамках которых<br/> разработано портфолио",
				position : "w"
			}, {
				sel : $(".pf-aside ol"),
				content : "Блоки выбора<br/> JS-задания/проекта",
				expose : true,
				position : "e"
			}, {
				sel : $(".pf-nav :nth-child(1)"),
				content : "Аннотация для выбранного<br/> задания/проекта",
				position : "s"
			}
		], {
		delay : 3500,

		onTripEnd : function () {
			$(".pf-nav :nth-child(2)").click();
			/**/
			var trip2 = new Trip([{
							sel : $(".pf-nav :nth-child(2)"),
							content : "Отображение кода JS-скрипта",
							position : "s"
						}, {
							sel : $(".runtime"),
							content : "Опция: \"кнопка запуска скрипта\"",
							position : "e"
						}, {
							sel : $(".pf-aside :nth-child(8)"),
							content : "Перейдем к произвольному проекту",
							position : "e"
						}

					], {
					delay : 3500,

					onTripEnd : function () {
						$(".pf-aside :nth-child(8)").click();

						/**/
						var trip3 = new Trip([{
										sel : $(".pf-nav :nth-child(2)"),
										content : "Режим \"Демонстрация\" раскрывает<br/> функционал сложных скриптов",
										position : "s"
									}

								], {
								delay : 3500,

								onTripEnd : function () {

									$(".pf-nav :nth-child(2)").click();

									setTimeout(function () {

										/**/
										var trip4 = new Trip([{
														sel : $(".pf-aside"),
														content : "Спасибо за просмотр функционала JS-портфолио!",
														position : "screen-center"
													}, {
														sel : $(".pf-aside ol li:nth-child(1)"),
														content : "Вернемся в начало...",
														position : "e"
													}
												], {
												delay : 3500,

												onTripEnd : function () {

													$(".pf-aside ol li:nth-child(1)").click();

												}
											});
										trip4.start();

									}, 4000); // Через две секунды выскочит сообщение


								}
							});
						trip3.start();

					}
				});
			trip2.start();

		}
	});

$(".start-demo-index").on("click", function () {
	trip1.start();
});

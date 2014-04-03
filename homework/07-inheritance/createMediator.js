function createMediator() {
	'use strict';
	var keeper = []; //Хранилище пар [Имя подписки:Обработчик]
	return {
		subscribe : function (eventName, handler) { //Подписка на событие, события могут дублироваться
			keeper.push([eventName, handler]);
			return;
		},
		unsubscribe : function (eventName, handler) { //Отписаться от события
			if (handler === undefined) { //Если обработчик события не указан отписываемся от всех событий с именем eventName
				for (var i = 0; i < keeper.length; i += 1) {
					if (keeper[i][0] === eventName) {
						delete keeper[i][0];
						delete keeper[i][1];
					}
				}
			} else { //Убираем первое вхождение обработчика handler события eventName
				for (var i = 0; i < keeper.length; i += 1) {
					if ((keeper[i][0] === eventName) && (keeper[i][1] === handler)) {
						delete keeper[i][0];
						delete keeper[i][1];
						return;
					}
				}
			}
			return;
		},
		publish : function (eventName, data) { //Запуск всех событий eventName с передачей параметров обработчику handler(data)
			for (var i = 0; i < keeper.length; i += 1) {
				if (keeper[i][0] === eventName) {
					keeper[i][1](data);
				}
			}
			return;
		}
	}
}

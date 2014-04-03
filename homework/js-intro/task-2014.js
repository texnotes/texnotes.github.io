// С Новым 2014 Годом и Рождеством! 

// Дмитрий, большое спасибо за курсы по JavaScript!
// Очень понравилось это задание с "ключником". Вначале я не справился из-за 
// плохого понимания отличий массива и объекта и того, как с ними работать. 

function createKeeper() {
	'use strict';

	var keeper = [];

	return {
		put : function (key, value) {
			for (var i = 0; i < keeper.length; i += 1) {
				if (keeper[i][0] === key) {
					keeper[i][1] = value;
					return;
				}
			}
			keeper.push([key, value]);
			return;
		},
		get : function (key) {
			for (var i = 0; i < keeper.length; i += 1) {
				if (keeper[i][0] === key) {
					return keeper[i][1];
				}
			}
			return null;
		}
	}
}


// Твое объяснение много прояснило в понимании работы "функции-стрелка",
// но еще осталось небольшое непонимание, буду читать теорию..

function makeArmy() {

	var shooters = [];

	for (var i = 0; i < 10; i++) {

		(function (x) {
			shooters.push(function () {
				console.log(x);
			})
		})(i);
	}
	return shooters;

}

var army = makeArmy();

army[0](); // 0
army[1](); // 1






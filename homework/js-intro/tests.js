function contains(where, what) {
	// Если элементы массива what содержатся в массиве where, функция должна возвращать true иначе false.

	var ret = false;

	var test = false; // Флаг совпадения элементов массива
	var confirm = true; // Результат, с учетом возможного несовпадения where хотя бы c одним элементом из what

	for (var i = 0; i < what.length; i++) {
		for (var j = 0; j < where.length; j++) {

			if (where[j] === what[i]) {
				test = true;
			}

		}
		confirm = confirm && test;
		test = false;
	}

	ret = confirm;

	// Проверка на случай пустых множеств
	if (where.length === 0 && what.length === 0)
		ret = true;
	if (what == 0)
		ret = true;

	return ret;

}

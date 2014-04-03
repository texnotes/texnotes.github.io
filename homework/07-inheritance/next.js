function next(node) {
	//Возвращает следующий узел, не учитывая текстовые узлы и узлы комментариев
	if (node.nextElementSibling) {
		return node.nextElementSibling;
	} //Если поддерживает браузер

	var node_next = node.nextSibling; //Универсальный вариант (можно оптимизировать - оставить только одну переменную node)
	while (node_next && (node_next.nodeType === 3 || node_next.nodeType === 8)) {
		node_next = node_next.nextSibling;
	};

	return node_next;
}

function addClass(node, classToAdd) {
	//Класс не должен добавляться, если такой уже есть у элемента

	if (!node.className)
		node.className = node.className + classToAdd;
	else if ((node.className.indexOf(classToAdd) === -1)) //Можно оптимитзировать проверки на меньшее кол-во обращений к DOM

		node.className = node.className + " " + classToAdd;
	else if ((node.className.indexOf(classToAdd + "-") !== -1))
		node.className = node.className + " " + classToAdd; ;

}

// node.classList.add(classToAdd)); //Все проще, если поддерживает браузер функцию node.classList.add(classToAdd));

function createList(arr, textMainLabel, textSubLabel) {

	textMainLabel = textMainLabel || 'ul'; //Значения по умолчанию для элементов списка
	textSubLabel = textSubLabel || 'li';

	var extList = document.createElement(textMainLabel);
	var intList; //Создаем внешний контейнер - extList и переменную для вложений - intList

	for (var i = 0; i < arr.length; i += 1) {
		intList = document.createElement('li');
		if (typeof(arr[i]) === 'object') { //Не лучший вариант на проверку массива. Можно оптимизировать
			intList.appendChild(createList(arr[i], textMainLabel));
		} //Рекурсивно вызываем основную функцию для построения вложенных списков
		else {
			intList.innerHTML = arr[i]; //Пробовал innerText - в Firefox, странно, но не работает
		}
		extList.appendChild(intList);

	}

	return extList;

}

// createList(['мясо', ['рыба', 'овощи', 'овсянка'], 'минералка', 'пицца'], 'ol');
## ООП в Javascript: наследование ##

**1.** Реализовать counter на прототипах. Значение счетчика не нужно инкапсулировать. Методы вынести в прототип (файл: *counter.js*).

**2.** Написать функцию createMediator(), которая возвращает объект с тремя методами (файл: *createMediator.js*).

 - subscribe(eventName, handler) - подписка на событие. 
 - publish(eventName, data) - запуск события с названием eventName. 
 - unsubscribe(eventName, handler) - отписаться от события. 
<pre><code class="language=javascript">
     var m = createMediator();
 
	 m.publish('customEvent'); // Ничего не происходит
     var h2 = function(data) {console.log('handler 2', data)};
     m.subscribe('customEvent', function(data) {console.log('handler 1', data)});
     m.subscribe('anotherEvent', h2);
     m.publish('customEvent'); // в консоли 'handler 1', undefined
     m.publish('anotherEvent', {test: true}); // в консоли 'handler 2', {test: true}
     m.subscribe('customEvent', function() {console.log('handler 3')});
     m.publish('customEvent', {foo: "bar"}); // в консоли 'handler 1' {foo: "bar"}, 'handler 3'
     m.unsubscribe('customEvent');
     m.publish('customEvent'); // Ничего не происходит
</code></pre>
	 
## Введение в Document Object Model (DOM) ##
	
**1.** Реализовать функцию next(node), которая вернет следующий узел, не учитывая текстовые узлы и узлы комментариев (файл: *next.js*).

**2.** Реализовать функцию addClass(node, classToAdd). Класс не должен добавляться, если у элемента уже есть такой (файл: *next.js*).

 Пример применения для разметки: &lt;div class='main-column'>&lt;/div>

 *После вызова* // addClass(document.querySelector('.main-column'), 'main');

 *HTML станет таким:* &lt;div class='main-column main'>&lt;/div>

**3.** Релизовать функцию createList(listData, listContainer, itemContainer), возвращаюшую узел списка. Использовать innerHTML нельзя. Второй и третий аргументы не обязательные. Значения по умолчанию для них - ul и li. listData - массив. Может содержать как элементы (текст), так и массивы элементов. Вложенность - любая (файл: *next.js*).

Примеры возвращаемых узлов:
<pre><code class="language=html">
//	createList(['мясо', 'рыба']) /* ->
	&lt;ul>
		&lt;li>мясо&lt;/li>
		&lt;li>рыба&lt;/li>
	&lt;/ul>
	*/

//	createList(['мясо', ['яблоки', 'бананы']], 'ol') /*->
	&lt;ol>
		&lt;li>мясо&lt;/li>
		&lt;li>
			&lt;ol>
				&lt;li>яблоки&lt;/li>
				&lt;li>бананы&lt;/li>
			&lt;/ol>
		&lt;/li>
	&lt;/ol>
	*/
</code></pre>

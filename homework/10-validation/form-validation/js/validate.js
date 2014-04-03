var globalEmailList = ['author@mail.com', 'foo@mail.com', 'tester@mail.com'];

(function () {
	'use strict';

	/**
	 * Utils 
	 */

	function addEvent(obj, event_name, handler) {
		var handler_wrapper = function (event) {
			event = event || window.event;
			if (!event.target && event.srcElement) {
				event.target = event.srcElement;
			}
			return handler.call(obj, event);
		};

		if (obj.addEventListener) {
			obj.addEventListener(event_name, handler_wrapper, false);
		} else if (obj.attachEvent) {
			obj.attachEvent('on' + event_name, handler_wrapper);
		}
		return handler_wrapper;
	}

	function hasClass(node, className) {
		var nodeClasses = node.className.split(' ');

		return nodeClasses.some(function (assignedClass) {
			return assignedClass === className;
		})
	}

	function addClass(node, className) {
		var nodeClasses = node.className.split(' ');

		if (nodeClasses.every(function (assignedClass) {
				return assignedClass !== className;
			})) {
			nodeClasses.push(className);
		}
		node.className = nodeClasses.join(' ');
	}

	function removeClass(node, className) {
		node.className = node.className.split(' ').filter(function (assignedClass) {
				return assignedClass !== className;
			}).join(' ');
	}

	// Инициализация событий. В функциях переменная badWay - введена для предотвращения бесконечной рекурсии
	
	(function initEvents() {
		addEvent(document.getElementById('email'), 'change', validateEmail);
		addEvent(document.getElementById('checkbox'), 'change', validateСheckbox);
		addEvent(document.getElementsByTagName('form')[0], 'submit', submitForm);

		var timer; // Валитдацмя ввода пароля по мере ввода, но с учетом скорости набора
		document.getElementById('password').addEventListener('keyup', function () {
			clearTimeout(timer);
			timer = setTimeout(validatePassword.bind(this, this), 700);
		}, false)
	}
		());

	function validatePassword(badWay) {

		var PasswordBadRegExp = /[^A-Za-z0-9_-]/; //Проверка на запрещенные символы
		var PasswordRegExp = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[A-Za-z0-9_-]{5,}$/; //Пароль должен содержать хотя бы один символ и одну цифру и быть больше 5 и может опционально содержать подчеркивание и тире


		var testPassword = document.getElementById('password').value;
		var textLabel = document.getElementById('password').parentNode.getElementsByTagName('label')[0]

			if (testPassword.length < 5) {
				textLabel.innerHTML = "Пароль слишком короткий...";
				textLabel.style.color = 'red';
				return false;
			} else if (PasswordBadRegExp.test(testPassword)) {
				textLabel.innerHTML = "Пароль содержит запрещенные символы (разрешенные - латинские буквы, цифры, подчеркивание, минус)";
				textLabel.style.color = 'red'
				return false;
			} else if (PasswordRegExp.test(testPassword)) {
				textLabel.innerHTML = "Пароль достаточно сложный";
				textLabel.style.color = 'black';

				 //Можно ли включить кнопку отправки формы?
				 		var sendFormBtn = document.getElementsByClassName('btn-primary');
				 if (badWay!=='short' && document.getElementsByTagName('form')[0].checkbox.checked && validationForm() && validateEmail('short')){
			sendFormBtn[0].classList.remove('disabled');}
				return true;
			} else {
				textLabel.innerHTML = "Пароль (постарайся придумать посложнее)<sup>*</sup>";
				textLabel.style.color = 'red';
			}
			return false;
	}

	function validateEmail(badWay) {
	
		var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //E-mail по стандарту HTML5 (был близок, но времени не хватило на реализацию)

		var testEmail = document.getElementById('email').value;
		if (testEmail !== '' && emailRegExp.test(testEmail)) {

			for (var i = 0; i < globalEmailList.length; i += 1) {
				if (globalEmailList[i] === testEmail) {
					document.getElementById('alert-email').innerHTML = 'Учетная запись с таким адресом уже существует';
					document.getElementById('alert-email').style.display = 'block';
					return false;
				}
			}

			document.getElementById('alert-email').style.display = 'none';

 			    //Можно ли включить кнопку отправки формы?
				var sendFormBtn = document.getElementsByClassName('btn-primary');
				 if (badWay!=='short' && document.getElementsByTagName('form')[0].checkbox.checked && validationForm() && validatePassword('short')){
				sendFormBtn[0].classList.remove('disabled');}
			return true;
		} else {

			document.getElementById('alert-email').innerHTML = 'Введите корректный адрес';
			document.getElementById('alert-email').style.display = 'block';
			return false;
		}
	}

	function validateСheckbox() {
		var sendFormBtn = document.getElementsByClassName('btn-primary');

		if (document.getElementsByTagName('form')[0].checkbox.checked && validationForm() && validateEmail('short') && validatePassword('short')){
			sendFormBtn[0].classList.remove('disabled');
			return true;
			
		} else {

			sendFormBtn[0].classList.add('disabled');
			return false;
		}
	}

	function validationForm() { //Проверка на пустые обязательные поля в форме

		var sendFormReq = document.getElementsByClassName('required');
		for (var i = 0; i < sendFormReq.length - 1; i += 1) { // не учитываем checkbox

			if (sendFormReq[i].getElementsByTagName('input')[0].value === "")
				return false;
		}
		return true;
	}

	function submitForm(e) {
		var sendFormBtn = document.getElementsByClassName('btn-primary');

		// Проверка на ошибки при заполнении формы
		if (document.getElementsByTagName('form')[0].checkbox.checked && validationForm() && validateEmail('short') && validatePassword('short')){
			sendFormBtn[0].classList.remove('disabled');
		}
		
		var sendFormBtn = document.getElementsByClassName('btn-primary');
		// Если кнопка отправки неактивна, то не отправляем
		if (hasClass(sendFormBtn[0], 'disabled')) {
			e.preventDefault();
			return false;
		} else {

		// Отправка формы
			document.getElementsByTagName('form')[0].submit();

		}
		return true;
	}
}
	());

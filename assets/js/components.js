
COMPONENT('todo', function (self, config) {
	var container;
	var template = Tangular.compile(`<div class="ToDo">
																			<img src="assets/img/logo.png" alt="jComponent logo" class="Logo">
																			<h1 class="ToDo-Header">jComponent To Do</h1>
																			<div class="ToDo-Container">
																				<div class="ToDo-Content">{{}}</div>
																				<input type="text" autofocus>
																				<div class="ToDo-Add">+</div>
																			</div>
																		</div>`);
	var templateItem = Tangular.compile(`<div class="ToDoItem">
																					<p class="ToDoItem-Text">{{text}}</p>
																					<div class="ToDoItem-Delete" data-index="{{index}}">-
																					</div>
																				</div>`);

	self.make = function () {

		self.html(template());
		container = self.find('.ToDo-Content');
		console.log('self.make');

		self.event('click', '.ToDoItem-Delete', self.removeItem);
		self.event('click', '.ToDo-Add', self.addItem);
		self.event('keypress', 'input', self.addItem);
	};

	self.setter = function (value) {

		var items = [];

		value.forEach(function (item, index) {
			items.push(templateItem({ text: item, index: index }));
		});

		container.empty().append(items.join(''));
	};

	self.removeItem = function () {
		var index = $(this).data('index');
		var data = self.get();

		data.splice(index, 1);
		self.set(data);
	};

	self.addItem = function (e) {

		if (!(e.type === 'click' || (e.type === 'keypress' && e.which === 13)))
			return;

		var el = self.find('input');
		var value = el.val().trim();
		el.val('');

		if (!value)
			return;

		self.push(value);
	};

});

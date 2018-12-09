CSS(`
.ToDoItem {
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
     -webkit-box-pack: center;
     -ms-flex-pack: center;
     justify-content: center;
     -webkit-box-align: center;
     -ms-flex-align: center;
     align-items: center;
}
 .ToDoItem-Text {
     width: 90%;
     background-color: white;
     border: 1px solid lightgrey;
     -webkit-box-shadow: 1px 1px 1px lightgrey;
     box-shadow: 1px 1px 1px lightgrey;
     padding: 12px;
     margin-right: 10px;
}
 .ToDoItem-Delete {
     width: 30px;
     padding: 5px;
     height: 30px;
     cursor: pointer;
     background: #ff7373;
     border-radius: 10px;
     -webkit-box-shadow: 1px 1px 1px #c70202;
     box-shadow: 1px 1px 1px #c70202;
     color: white;
     font-size: 18px;
     margin-right: 5px;
}
 .ToDoItem-Delete:hover {
     -webkit-box-shadow: none;
     box-shadow: none;
     margin-top: 1px;
     margin-left: 1px;
}
 .ToDo {
     text-align: center;
     border: 1px solid white;
     width: 80vw;
     height: auto;
     -webkit-box-shadow: 2px 3px 15px rgba(0, 0, 0, 0.5);
     box-shadow: 2px 3px 15px rgba(0, 0, 0, 0.5);
     background: #f6f6f6;
     padding-bottom: 60px;
     margin: 40px auto;
}
 .ToDo-Header {
     color: black;
     font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
     font-weight: 400;
     text-transform: uppercase;
     margin: 70px auto 30px;
}
 .ToDo-Add {
     color: white;
     font-size: 2em;
     width: 0.5em;
     height: 0.5em;
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
     -webkit-box-pack: center;
     -ms-flex-pack: center;
     justify-content: center;
     -webkit-box-align: center;
     -ms-flex-align: center;
     align-items: center;
     padding: 15px;
     cursor: pointer;
     background: #73ff73;
     border-radius: 10px;
     -webkit-box-shadow: 1px 1px 1px #47a947;
     box-shadow: 1px 1px 1px #47a947;
     margin: 20px auto 0;
}
 .ToDo-Add:hover {
     -webkit-box-shadow: none;
     box-shadow: none;
     margin-top: 21px;
     margin-left: calc(auto + 1px);
}
 .ToDo-Container {
     width: 80%;
     margin: 0 auto;
}
`);

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

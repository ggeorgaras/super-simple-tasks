// Generated by CoffeeScript 1.3.3

$(document).ready(function() {
  var createToDo, generateHTML, getAllTodos, getId, getNames, initialize, markAllDone, markDone, setAllTodos, setNewTodo, showTodos;
  initialize = function() {
    var allTodos;
    allTodos = getAllTodos();
    showTodos(allTodos);
    return $("#new-todo").focus();
  };
  createToDo = function(name) {
    var todo;
    return todo = {
      isDone: false,
      name: name
    };
  };
  getAllTodos = function() {
    var allTodos;
    allTodos = localStorage.getItem("todo");
    allTodos = JSON.parse(allTodos) || [
      {
        "isDone": false,
        "name": "Do the laundry"
      }, {
        "isDone": false,
        "name": "Put out the rubbish"
      }, {
        "isDone": false,
        "name": "Follow @humphreybc on Twitter"
      }
    ];
    return allTodos;
  };
  setNewTodo = function() {
    var allTodos, name, newTodo;
    name = $("#new-todo").val();
    newTodo = createToDo(name);
    allTodos = getAllTodos();
    allTodos.push(newTodo);
    return setAllTodos(allTodos);
  };
  setAllTodos = function(allTodos) {
    localStorage.setItem("todo", JSON.stringify(allTodos));
    showTodos(allTodos);
    $("#new-todo").val('');
    return $("#new-todo").focus();
  };
  getId = function(li) {
    var id;
    id = $(li).find('input').attr('id').replace('todo', '');
    return parseInt(id);
  };
  markDone = function(id) {
    var todos;
    todos = getAllTodos();
    todos.splice(id, 1);
    return setAllTodos(todos);
  };
  markAllDone = function() {
    localStorage.clear();
    return initialize();
  };
  getNames = function(allTodos) {
    var names, todo, _i, _len;
    names = [];
    for (_i = 0, _len = allTodos.length; _i < _len; _i++) {
      todo = allTodos[_i];
      names.push(todo['name']);
    }
    return names;
  };
  generateHTML = function(allTodos) {
    var i, name, names, _i, _len;
    names = getNames(allTodos);
    for (i = _i = 0, _len = names.length; _i < _len; i = ++_i) {
      name = names[i];
      names[i] = '<li><input type="checkbox" id="todo' + i + '"></input><label for=todo' + i + '>' + name + '</label></li>';
    }
    return names;
  };
  showTodos = function(allTodos) {
    var html;
    html = generateHTML(allTodos);
    return $("#todo-list").html(html);
  };
  initialize();
  $("#todo-submit").click(function(e) {
    e.preventDefault();
    return setNewTodo();
  });
  $("#mark-all-done").click(function(e) {
    e.preventDefault();
    if (confirm("Are you sure you want to mark all tasks as done?")) {
      return markAllDone();
    } else {

    }
  });
  return $(document).on("click", "#todo-list li", function(e) {
    var self;
    self = this;
    $(self).find('input').prop('checked', true);
    return $(self).fadeOut(500, function() {
      return markDone(getId(self));
    });
  });
});

var _todos = [], _callbacks = [];

var TodoStore = {

  changed: function () {
    _callbacks.forEach( function (callback) {
      callback();
    });
  },

  addChangedHandler: function (handler) {
    _callbacks.push(handler);
  },

  removeChangedHandler: function (handler) {
    var index = _callbacks.indexOf(handler);
    _callbacks.splice(index, 1);
  },

  all: function () {
    return _todos.slice();
  },

  fetch: function () {
    $.ajax({
      type: "GET",
      url: "/api/todos",
      dataType: "json",
      success: function (data) {
        _todos = data;
        TodoStore.changed();
      },
      error: function () {
        alert("error with fetch function");
      }
    });
  },

  create: function (data) {
    $.ajax({
      type: "POST",
      url: "/api/todos",
      dataType: "json",
      data: {todo: data},
      success: function(todo) {
        _todos.push(todo);
        TodoStore.changed();
      }
    });
  },

  destroy: function (todo) {
    $.ajax({
      type: "DELETE",
      url: "/api/todos/" + todo.id,
      dataType: "json",
      data: {todo: todo},
      success: function(oldToto) {
        var index = _todos.indexOf(oldToto);
        _todos.splice(index, 1);
        TodoStore.changed();
      },
      error: function() {
        alert("Error at destroy");
      }
    });
  },

  toggleDone: function (todo) {
    $.ajax({
      type: "PATCH",
      url: "/api/todos/" + todo.id,
      dataType: "json",
      data: {todo: todo},
      success: function(newTodo) {
        var index = _todos.indexOf(todo);
        _todos.slice(index, 1);
        _todos.push(newTodo);
        TodoStore.changed();
      },
      error: function() {
        alert("Error at toggleDone");
      }
    });
  }

};

module.exports = TodoStore;

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//holds all components and stores
	TodoStore = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports) {

	var _todos = [],
	    _callbacks = [];
	
	var TodoStore = {
	
	  changed: function () {
	    _callbacks.forEach(function (callback) {
	      callback();
	    });
	  },
	
	  addChangedHander: function (handler) {
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
	      data: { todo: data },
	      success: function (todo) {
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
	      data: { todo: todo },
	      success: function (todo) {
	        var index = _todos.indexOf(todo);
	        _todos.slice(index, 1);
	        TodoStore.changed();
	      },
	      error: function () {
	        alert("Error at destroy");
	      }
	    });
	  },
	
	  toggleDone: function (todo) {
	    $.ajax({
	      type: "PATCH",
	      url: "/api/todos/" + todo.id,
	      dataType: "json",
	      data: { todo: todo },
	      success: function (newTodo) {
	        var index = _todos.indexOf(todo);
	        _todos.slice(index, 1);
	        _todos.push(newTodo);
	        TodoStore.changed();
	      },
	      error: function () {
	        alert("Error at toggleDone");
	      }
	    });
	  }
	
	};
	
	module.exports = TodoStore;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
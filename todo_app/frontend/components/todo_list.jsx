var React = require('react');
var ReactDOM = require('react-dom');
var TodoStore = require('../stores/todo_store.js');

var TodoList = React.createClass({

  getInitialState: function() {
    return {todos: TodoStore.all() };
  },

  componentDidMount: function () {
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  },

  todosChanged: function () {
    this.setState({todos: TodoStore.all() });
  },

  render: function() {
    var list = this.state.todos.map(function(todo){
      return <li key={todo.id}>{todo.title}</li>;
    });

    return(
      <div>
        <ul>
          {list}
        </ul>
      </div>
    );
  }
});

module.exports = TodoList;

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
    var list = "";

    if (this.state.todos.length > 0) {
      list = this.state.todos.map(function(todo){
        return <TodoListItem key={todo.id} todo={todo} />;
      });
    }

    return(
      <div>
        <div>
          {list}
        </div>
        <TodoForm />
      </div>
    );
  }
});

var TodoListItem = React.createClass({

  handleDestroy: function (e) {
    e.preventDefault();
    TodoStore.destroy(this.props.todo);
  },

  render: function() {
    return (
      <div>
        <div>{this.props.todo.title}</div>
        <div>{this.props.todo.body}</div>
        <button onClick={this.handleDestroy}>Delete</button>
        <DoneButton todo={this.props.todo}/>
      </div>
    );
  }
});

var TodoForm = React.createClass({
  getInitialState: function() {
    return { title: "", body: "" };
  },

  updateTitle: function (e) {
    this.setState({title: e.target.value});
  },

  updateBody: function (e) {
    this.setState({body: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var newTodo = {
      title: this.state.title,
      body: this.state.body,
      done: false
    };

    TodoStore.create(newTodo);
    this.setState({title: "", body: ""});
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Title:
          <input type="text" value={this.state.title} onChange={this.updateTitle} />
        </label><br></br>

        <label>Body:
          <input type="text" value={this.state.body} onChange={this.updateBody} />
        </label>

        <input type="submit" value="Add Todo" />
      </form>
    );
  }

});

var DoneButton = React.createClass({
  //make button text a state
  handleDone: function(e) {
    e.preventDefault();
    TodoStore.toggleDone(this.props.todo);
    //setState text:""
  },

  render: function() {
    var text = "";
    if (this.props.todo.done) {
      text = "Undo";
    }
    else {
      text = "Done";
    }

    return (
      <button onClick={this.handleDone}>{text}</button>
    );
  }
});

module.exports = TodoList;

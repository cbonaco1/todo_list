var React = require('react');
var RecipeStore = require('../stores/recipe_store.js');

var RecipesForm = React.createClass({
  getInitialState: function(){
    return {name: ""};
  },

  inputChanged: function(e){
    this.setState({name: e.target.value});
  },

  createRecipe: function(e){
    e.preventDefault();
    // this.state == {name: "kale"}
    RecipeStore.create(this.state);
    // RecipeStore.create({name: this.state.name}); // ugly.
  },

  render: function () {
    return (
      <form onSubmit={this.createRecipe}>
        <h1>Create a Recipe</h1>
        <input onChange={this.inputChanged} value={ this.state.name }/>
        <button>create!</button>
      </form>
    );
  }
});

module.exports = RecipesForm;

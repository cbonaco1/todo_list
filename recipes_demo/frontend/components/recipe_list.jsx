var React = require('react');
var RecipeStore = require('../stores/recipe_store.js');

var RecipesList = React.createClass({

  getInitialState: function () { // only use getInitialState to return the initial state, or get the initial...state....
    return { recipes: RecipeStore.all() };
  },

  componentDidMount: function () { // we don't actually re render right here, but we set things into motion
    RecipeStore.addChangeHandler(this._recipesChanged); // this gets pushed into _callbacks
    // only if we actually care about the contents of the recipe store!
    RecipeStore.fetch();
  },

  componentWillUnmount: function () {
    RecipeStore.removeChangeHandler(this._recipesChanged);
  },

  _recipesChanged: function () { // gets called by the store when we get new data from the server, so the contents of RecipeStore.all may be different
    this.setState({ recipes: RecipeStore.all() });
  },

  render: function () {
    return (
      <ul>
        {this.state.recipes.map(function (recipe) {
          return <li key={recipe.id}>{recipe.name}</li>;
        })}
      </ul>
    );
  }
});

module.exports = RecipesList;

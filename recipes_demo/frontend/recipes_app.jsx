var ReactDOM = require('react-dom');
var React = require('react');
var RecipesForm = require ('./components/recipes_form.jsx');
var RecipesList = require ('./components/recipe_list.jsx');

var App = React.createClass({

  render: function () {
    return (
      <div>
        <RecipesForm />
        <RecipesList />
      </div>
    );
  }

});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<App />, document.getElementById('root'));
});

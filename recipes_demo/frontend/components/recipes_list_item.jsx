var React = require('react');

var RecipesListItem = React.createClass({

  getInitialState: function(){
    // ...
  },

  handleClick: function () {
    // ...
  },

  render: function () {
    return (
      <div onClick={this.handleClick}>
        RECIPE LIST ITEM
      </div>
    );
  }
});

module.exports = RecipesListItem;

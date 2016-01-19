var _recipes = [], _handlers = []; // hidden variables. Only available within this file.

var RecipeStore = {

  all: function () { // return the current state of _recipes on the client side (JS world)
    return _recipes.slice(); // don't touch my _recipes!
  },

  fetch: function () { // fetch the contents of the recipes from the server (database, the controller action we call decides which we get back)
    $.ajax({
      type: "GET",
      url: "/api/recipes",
      dataType: "json",
      success: function (recipes) { // update the server with the returned recipes and tell all components that care that they should rerender with the new contents
        _recipes = recipes; // this is the most recent version of our data, safe to update the entire store.
        RecipeStore.changed();
      }
    });
  },

  create: function(recipe){
    $.ajax({
      type: "post",
      url: "/api/recipes",
      dataType: "json",
      data: {recipe: recipe},
      success: function (data) {
        _recipes.push(data);
        RecipeStore.changed();
      },
      error: function () {
        // alert("Something went wrong!");
      }
    });
  },

  addChangeHandler: function(handler){ // add callback to be called when the contents of _recipes have changed. Allows component to "listen" to the store.
    _handlers.push(handler);
  },

  removeChangeHandler: function(handler){
    var idx = _handlers.indexOf(handler);
    if (idx !== -1) {
      _handlers.splice(idx, 1);
    }
  },

  changed: function(){ // alert all listening components that we have updated the contents of the store.
    _handlers.forEach(function (handler) {
      handler();
    });
  }
};

module.exports = RecipeStore;

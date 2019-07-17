// Get references to page elements
var $recipeName = $("#recipeName");
var $recipeDescription = $("#recipeDescription");
var $recipeInstructions = $("#recipeInstructions");
var $ingredientsFile = $("#ingredientsFile");
var $submitBtn = $("#submit");
var $submitRecipeBtn = $("#addRecipe");
var $exampleList = $("#example-list");
var $customFile = $("#customFile");



// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
  saveRecipe: function(recipe) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/addRecipe",
      data: JSON.stringify(recipe)
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// var tempFunc = function(event) {
//   event.preventDefault();
//   console.log('aaaaaaaaaa')
// };
// Save the new example to the db and refresh the list
var addRecipe = function(event) {
  event.preventDefault();
  console.log($ingredientsFile);
  var recipe = {
    name: $recipeName.val().trim(),
    description: $recipeDescription.val().trim(),
    instructions: $recipeInstructions.val().trim()
  };

  if (!(recipe.name && recipe.description)) {
    alert("You must enter a recipe name and description!");
    return;
  }

  API.saveRecipe(recipe).then(function() {
    refreshExamples();
  });

  $recipeName.val("");
  $recipeDescription.val("");
  $recipeInstructions.val("");
  //TODO: may need to clear the ingredients and instructions text inputs after they are inserted into the Ingredients database table.
};
// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
$submitRecipeBtn.on("click", addRecipe);
$exampleList.on("click", ".delete", handleDeleteBtnClick);


$('#customFile').on('change',function(){
  //get the file name
  var fileName = $(this).val();
  fs.readFile('demofile1.html', function(err, data) {
    console.log(data);
  });
  console.log(fileName);
  //replace the "Choose a file" label
  $(this).next('.custom-file-label').html(fileName);
})



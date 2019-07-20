// Get references to page elements
var $recipeName = $("#recipeName");
var $recipeDescription = $("#recipeDescription");
var $recipeInstructions = $("#recipeInstructions");
var $ingredientsFile = $("#ingredientsFile");
var $submitBtn = $("#submit");
var $submitRecipeBtn = $("#addRecipe");
var $exampleList = $("#example-list");
var $customFile = $("#customFile");
var $ingredientsInput = $("#ingredientsInput");
var $ingredientsSubmitBtn = $("#ingredientsSubmitBtn");

var $recipesByIngredient = $("#recipesByIngredient");

var $signUpName = $(".signUpName");
var $signUpPassword = $(".signUpPassword");
var $signUpPassword2 = $(".signUpPasswordAgain");
var $signUpEmail = $(".signUpEmail");
var $signUpSubmit = $(".signUpSubmit");
var $signInSubmit = $(".signInSubmit");
var $signInName = $(".signInName");
var $signInPassword = $(".signInPassword");

// Bootstrap card html
var card = '<div class="col-md-4">';
card += ' <div class="card mb-4 shadow-sm">';
card += '  <img src="..." class="card-img-top" alt="...">';
card += '   <div class="card-body">';
card += '     <h5 class="recipeName card-title">Recipe name</h5>';
card += '     <div class="cardInfo">';
card += '       <p class="recipeDescription"></p>';
card += '       <ul class="recipeIngredients">';
card += '       </ul>';
card += '       <p class="recipeInstructions" class="card-text"></p>';
card += '     </div>';
card += '       <div class="d-flex justify-content-between align-items-center">';
card += '         <div class="btn-group">';
card += '            <button type="button" class="btn btn-danger btn-sm">Save recipe</button>';
card += '         </div>';
card += '       </div>';
card += '   </div>';
card += '  </div>';
card += '</div>';

var getApi = {
  saveUser: function (user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(user)
    });
  },
  findOneUser: function (user_name) {
    // console.log(user_name);
    return $.ajax({
      url: "/api/users/" + user_name,
      type: "GET"
    });
  },

};

var logedInUserId = "";
var submitToLogin = function (event) {
  event.preventDefault();

  var signInName = $signInName.val().trim();

  getApi.findOneUser(signInName).then(function (data) {
    console.log(data);
    if (data.length < 1) {
      alert("user name not exist");
      return;
    }

    if (data[0].password === $signInPassword.val().trim()) {
      logedInUserId = data[0].id;
      console.log("you are loged in, user id is: " + logedInUserId);
      $signInName.val("");
      $signInPassword.val("");
    }
    else {
      alert("password not correct");
    }
  });



};

var submitToSave = function (event) {
  event.preventDefault();

  var user = {
    user_name: $signUpName.val().trim(),
    password: $signUpPassword.val().trim(),
    email: $signUpEmail.val().trim()
  };
  var signUpPassword2 = $signUpPassword2.val().trim();
  if (!(user.user_name && user.password && signUpPassword2)) {
    alert("You must enter user name, password ");
    return;
  };
  if (user.password != signUpPassword2) {
    alert("The passwords don't match");
    return;
  };
  if (user.password.length < 6 || user.password.length > 12) {
    alert("The password length must be between 6 and 12");
    return;
  };
  var isExist = [];
  getApi.findOneUser(user.user_name).then(function (data) {
    console.log(data)
    isExist = data;

    if (isExist.length != 0) {
      alert("user name exist!");
      return;
    } else {
      getApi.saveUser(user).then(function () {
        console.log("you are signed up, go to log in");
        $("#sign_up_label").text("you are signed up, go to log in!");
        $signUpName.val("");
        $signUpPassword.val("");
        $signUpPassword2.val("");
        $signUpEmail.val("");
      });
    }
  });
};

$signUpSubmit.on("click", submitToSave);
$signInSubmit.on("click", submitToLogin);

// The API object contains methods for each kind of request we'll make
var API = {

  getRecipesRandom: function (recipe) {
    return $.ajax({
      type: "GET",
      url: "/api/sampleRecipes",
    })
  },

  getRecipesByIngredients: function (ingredients) {
    return $.ajax({
      type: "GET",
      url: "api/RecipesByIngredients/" + ingredients,
    });
  },
  saveRecipe: function (recipe) {
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

// Add recipe
var addRecipe = function (event) {
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

  API.saveRecipe(recipe).then(function () {
    refreshExamples();
  });

  $recipeName.val("");
  $recipeDescription.val("");
  $recipeInstructions.val("");
  //TODO: may need to clear the ingredients and instructions text inputs after they are inserted into the Ingredients database table.
};

// Search for recipes by ingredients
var getRecipesByIngredients = function (event) {
  event.preventDefault();
  console.log($ingredientsInput.val());
  API.getRecipesByIngredients($ingredientsInput.val())
    .then(function (data) {
      $("#foundRecipesHeader").empty();
      $("#foundRecipes").empty();
      $("#noRecipesFound").prepend("No recipes found :(");
      $("#foundRecipesHeader").prepend("Found Recipes");   // Add Found Recipes Heading
      $("#foundRecipesHeader").append("<hr>");
      $ingredientsInput.val("");

      // Add new recipe card
      for (var i = 0; i < data.length; i++) {
        $("#foundRecipes").append(card);
        $(".card-img-top:eq(" + i + ")").attr("src", data[i].img);
        $(".recipeName:eq(" + i + ")").text(data[i].name);
        $(".recipeDescription:eq(" + i + ")").text(data[i].description);
        $(".recipeInstructions:eq(" + i + ")").text(data[i].instructions);
        $("#noRecipesFound").empty();

        for (var j = 0; j < data[i].ingredients.length; j++) {
          var li = '<li class="ingr">' + data[i].ingredients[j].recipeIngredients.quantity + " ";
          li += data[i].ingredients[j].recipeIngredients.unit + " " + data[i].ingredients[j].name + '</li>';
          $(".recipeIngredients:eq(" + i + ")").append(li);
        }
      };
    });
};

//SHOW RANDOM RECIPES
var getRecipesRandom = function () {
  console.log($ingredientsInput.val());
  API.getRecipesRandom()
    .then(function (data) {
      console.log(data);
      $("#foundRandomRecipes").empty();
      $("#foundRandomRecipesHeader").prepend("Our favorite");   // Add Found Recipes Heading
      $("#foundRandomRecipesHeader").append("<hr>");
      $ingredientsInput.val("");

      // Add new recipe card
      for (var i = 0; i < data.length; i++) {
        $("#foundRandomRecipes").append(card);
        $(".card-img-top:eq(" + i + ")").attr("src", data[i].img);
        $(".recipeName:eq(" + i + ")").text(data[i].name);
        $(".recipeDescription:eq(" + i + ")").text(data[i].description);
        $(".recipeInstructions:eq(" + i + ")").text(data[i].instructions);

        for (var j = 0; j < data[i].ingredients.length; j++) {
          var li = '<li class="ingr">' + data[i].ingredients[j].recipeIngredients.quantity + " ";
          li += data[i].ingredients[j].recipeIngredients.unit + " " + data[i].ingredients[j].name + '</li>';
          $(".recipeIngredients:eq(" + i + ")").append(li);
        }
      };
    });
};

getRecipesRandom();

// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
$submitRecipeBtn.on("click", addRecipe);


// Listener for searching recipes by ingredients
$ingredientsSubmitBtn.on("click", getRecipesByIngredients);

$("#ingredientAddButton").on("click", function () {
  const name = $("#ingredientInput").val();
  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "api/ingredients/add",
    data: JSON.stringify({ name: name })
  });
});


// ------------SHOPPING LIST--------------

$(document).ready(function () {
  var $newItemInput = $("input.new-item");
  var $itemContainer = $(".item-container");
  $(document).on("click", "button.delete", deleteItem);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".item-item", editItem);
  $(document).on("keyup", ".item-item", finishEdit);
  $(document).on("blur", ".item-item", cancelEdit);
  $(document).on("submit", "#item-form", insertItem);

  var items = [];

  getItems();

  function initializeRows() {
    $itemContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < items.length; i++) {
      rowsToAdd.push(createNewRow(items[i]));
    }
    $itemContainer.prepend(rowsToAdd);
  }

  function getItems() {
    $.get("/api/items", function (data) {
      items = data;
      initializeRows();
    });
  }

  function deleteItem(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/items/" + id
    }).then(getItems);
  }

  function editItem() {
    var currentItem = $(this).data("item");
    $(this).children().hide();
    $(this).children("input.edit").val(currentItem.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  function toggleComplete(event) {
    event.stopPropagation();
    var item = $(this).parent().data("item");
    item.complete = !item.complete;
    updateItem(item);
  }

  function finishEdit(event) {
    var updatedItem = $(this).data("item");
    if (event.which === 13) {
      updatedItem.text = $(this).children("input").val().trim();
      $(this).blur();
      updateItem(updatedItem);
    }
  }

  function updateItem(item) {
    $.ajax({
      method: "PUT",
      url: "/api/items",
      data: item
    }).then(getItems);
  }

  function cancelEdit() {
    var currentItem = $(this).data("item");
    if (currentItem) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentItem.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  function createNewRow(item) {
    var $newInputRow = $(
      [
        "<li class='list-group-item item-item'>",
        "<span>",
        item.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>x</button>",
        "<button class='complete btn btn-primary'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", item.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("item", item);
    if (item.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  function insertItem(event) {
    event.preventDefault();
    var item = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/items", item, getItems);
    $newItemInput.val("");
  }
});


// ----- GETS RECIPES BY INGREDIENTS -----

// var getRecipesByIngredients = function (event) {
//   event.preventDefault();
//   console.log($ingredientsInput.val());
//   API.getRecipesByIngredients($ingredientsInput.val())
//     .then(function (data) {
//       console.log("returned: ", data);
//       alert(JSON.stringify(data));
//       for (var i = 0; i < data.length; i++) {
//         $("#recipesByIngredients").append(card);
//         $(".recipeName:eq(" + i + ")").text(data[i].name);
//         $(".recipeDescription:eq(" + i + ")").text(data[i].description);
//         $(".recipeInstructions:eq(" + i + ")").text(data[i].instructions);
//         for (var j = 0; j < data[i].ingredients.length; j++) {
//           // $(".recipeIngredients:eq("+j+")").append('<li>"+data[i].ingredients[j].name+"</li>');
//           console.log(j);
//           $(".recipeIngredients:eq(" + i + ")").append(data[i].ingredients[j].name + ', ');
//         }
//       };
//     });
// };



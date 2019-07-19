// Get references to page elements
var $recipeName = $("#recipeName");
var $recipeDescription = $("#recipeDescription");
var $recipeInstructions = $("#recipeInstructions");
var $ingredientsFile = $("#ingredientsFile");
var $submitBtn = $("#submit");
var $submitRecipeBtn = $("#addRecipe");
var $exampleList = $("#example-list");
var $customFile = $("#customFile");



var $signUpName = $(".signUpName");
var $signUpPassword = $(".signUpPassword");
var $signUpPassword2 = $(".signUpPasswordAgain");
var $signUpEmail = $(".signUpEmail");
var $signUpSubmit = $(".signUpSubmit");

var $signInSubmit = $(".signInSubmit");
var $signInName = $(".signInName");
var $signInPassword = $(".signInPassword");




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
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
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

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
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
var handleFormSubmit = function (event) {
  event.preventDefault();
  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// var tempFunc = function(event) {
//   event.preventDefault();
//   console.log('aaaaaaaaaa')
// };
// Save the new example to the db and refresh the list
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
// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
$submitRecipeBtn.on("click", addRecipe);
$exampleList.on("click", ".delete", handleDeleteBtnClick);


$('#customFile').on('change', function () {
  //get the file name
  var fileName = $(this).val();
  fs.readFile('demofile1.html', function (err, data) {
    console.log(data);
  });
  console.log(fileName);
  //replace the "Choose a file" label
  $(this).next('.custom-file-label').html(fileName);
})

$("#ingredientAddButton").on("click", function() {
  const name = $("#ingredientInput").val();
  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "api/ingredients/add",
    data: JSON.stringify({name: name})
  });
});



// ------------SHOPPING LIST--------------

$(document).ready(function() {
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
    $.get("/api/items", function(data) {
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

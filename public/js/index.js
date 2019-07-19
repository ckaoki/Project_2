var $foodList = $("#food-list");

// Get references to page elements
var $recipeName = $("#recipeName");
var $recipeDescription = $("#recipeDescription");
var $recipeInstructions = $("#recipeInstructions");
var $ingredientsFile = $("#ingredientsFile");
var $submitBtn = $("#submit");
var $submitRecipeBtn = $("#addRecipe");
var $exampleList = $("#example-list");
var $customFile = $("#customFile");


// sign up and sign in 
var $signUpName = $(".signUpName");
var $signUpPassword = $(".signUpPassword");
var $signUpPassword2 = $(".signUpPasswordAgain");
var $signUpEmail = $(".signUpEmail");
var $signUpSubmit = $(".signUpSubmit");

var $signInSubmit = $(".signInSubmit");
var $signInName = $(".signInName");
var $signInPassword = $(".signInPassword");

// add food
var $addIngredient = $("#add_ingredient");
var $ingredientQuantity = $("#ingredient_quantity");
var $ingredientUnit = $("#ingredient_unit");
var $ingredientExpireDate = $("#ingredient_expireDate");
var $addFoodBtn = $("#add_food");

var $signUpBtn = $('<button type="button" class="loginbtn btn btn-danger btn-sm" data-toggle="modal" data-target="#sign_up">').text("sign up")
var $signInBtn = $('<button type="button" class="loginbtn btn btn-danger btn-sm" data-toggle="modal" data-target="#sign_in">').text("sign in")

var $signOutBtn = $('<button type="button" class="loginbtn btn btn-danger btn-sm" onclick="signOut();" >').text("sign out")
var $profileBtn = $('<button type="button" class="loginbtn btn btn-danger btn-sm" onclick="profile();" data-toggle="modal" data-target="#profile">')

$("#log_area").append($signUpBtn);
$("#log_area").append($signInBtn);

var logedInUserId = "-1";
var logedInUserName = "no one"


function generatePassword() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  var user = {
    user_name: profile.getEmail(),
    password: generatePassword(),
    email: getEmail(),
  }
  getApi.findOneUser(userName).then(function (data) {
    if (data.length != 0) {
      console.log("welcome come back")
      logedInUserId = data[0].id;
      logedInUserName = data[0].user_name;
    } else {
      getApi.saveUser(user).then(function (data) {
        logedInUserId = data[0].id;
        logedInUserName = data[0].user_name;
      })
    }
  });
  refreshfoods();
  $("#log_area").empty();
  // $("#add_food").css("display","unset");
  $("#log_area").append($signOutBtn);
  $("#log_area").append($profileBtn.text("user id:" + logedInUserId));
}; //onSignIn funtion end

//google sign out
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');

  });
}
//user sign out
function userSignOut() {
  $("#log_area").empty();
  $("#food-thead").empty();
  $("#foodInfo").empty();
  $("#log_area").append($signUpBtn);
  $("#log_area").append($signInBtn);
  // $("#add_food").css("display","none");
  logedInUserId = "-1"
};
$signOutBtn.click(userSignOut);


var $userNameProfile = $("#user_name_profile");
var $userEmailProfile = $("#user_email_profile");
var $userPasswordProfile = $("#user_password_profile");
var $changePasswordProfile = $(".change_password");
var $changePasswordBtn = $(".changePassword_btn");

var creatNewPassword = function (newPassword, username) {
  console.log(newPassword)
  getApi.changePassword(newPassword, username).then(function (data) {
    alert("password changed")
  })
};
//user page
function profile() {
  // getApi.userPage();
  console.log("profile click")




  getApi.findOneUser(logedInUserName).then(function (data) {
    $userNameProfile.text(data[0].user_name);
    $userEmailProfile.text(data[0].email);
    $userPasswordProfile.text(data[0].password);
  });
  $changePasswordBtn.on("click", function () {
    var newPassword = $changePasswordProfile.val().trim();
    creatNewPassword(newPassword, logedInUserName)
  });
}



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
  changePassword: function (password, user) {
    return $.ajax({
      url: "/api/password/" + password + "/" + user,
      type: "PUT"
    });
  },
  findOneUser: function (user_name) {
    // console.log(user_name);
    return $.ajax({
      url: "/api/users/" + user_name,
      type: "GET"
    });
  },
  saveFood: function (food) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/foods",
      data: JSON.stringify(food)
    });
  },
  getAllFoods: function (UserId) {
    return $.ajax({
      url: "api/allfoods/" + UserId,
      type: "GET"
    });
  },
  userPage: function () {
    console.log("userpage ajax")
    return $.ajax({
      url: "userpage",
      type: "GET"
    });
  },

};


var submitToLogin = function (event) {
  event.preventDefault();

  var signInName = $signInName.val().trim();
if(!signInName){
  alert("please input user name");
  return;
}

  getApi.findOneUser(signInName).then(function (data) {
    // console.log(data);
    if (data.length < 1) {
      alert("user name not exist");
      return;
    }

    if (data[0].password === $signInPassword.val().trim()) {
      logedInUserId = data[0].id;
      logedInUserName = data[0].user_name;
      console.log("you are loged in, user id is: " + logedInUserId);
      $signInName.val("");
      $signInPassword.val("");
      // $("#add_food").css("display","unset");
      $("#log_area").empty();
      $("#log_area").append($signOutBtn);
      $("#log_area").append($profileBtn.text("profile"));
      refreshfoods();

    } else {
      alert("password not correct");
    }
  });
}; //submitToLogin end


//save user
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
}; //save user submitToSave function end

//save food
var submitToSaveFood = function (event) {
  event.preventDefault();

  var food = {
    UserId: logedInUserId,
    item_name: $addIngredient.val().trim(),
    quantity: $ingredientQuantity.val().trim(),
    unit: $ingredientUnit.val().trim(),
    expireDate: $ingredientExpireDate.val().trim(),
  };



  getApi.saveFood(food).then(function (data) {
    console.log(data)

    $addIngredient.val("");
    $ingredientQuantity.val("");
    $ingredientUnit.val("");
    $ingredientExpireDate.val("");
  });


}; //save food end

// get user's all food
var refreshfoods = function () {
  var UserId = logedInUserId;
  getApi.getAllFoods(UserId).then(function (data) {
    // console.log(data)

    var newTbody = $("#foodInfo");

    var newTr = $("<tr>");
    newTr.append(
      $('<th scope="col">').text("#"),
      $('<th scope="col">').text("food name"),
      $('<th scope="col">').text("quantity"),
      $('<th scope="col">').text("unit"),
      $('<th scope="col">').text("expire date"),
    );
    $("#food-thead").empty();

    $("#food-thead").append(newTr);
    newTbody.empty();
    for (var i = 0; i < data.length; i++) {
      // var $button = $("<button>").addClass("btn btn-danger float-right delete").text("ｘ");
      var newTbodyTr = $("<tr>").append(
        $("<td>").text(i + 1),
        $("<td>").text(data[i].item_name),
        $("<td>").text(data[i].quantity),
        $("<td>").text(data[i].unit),
        $("<td>").text(data[i].expireDate),
        // $button,
      );
      newTbody.append(newTbodyTr);
    }
  });
};

$signUpSubmit.on("click", submitToSave);
$signInSubmit.on("click", submitToLogin);
$addFoodBtn.on("click", submitToSaveFood)

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
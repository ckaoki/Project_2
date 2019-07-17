// put these code into index.js
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

var logedInUserId="";
var submitToLogin = function (event) {
  event.preventDefault();

  var signInName = $signInName.val().trim();


  getApi.findOneUser(signInName).then(function (data) {
    console.log(data);
    if(data.length<1){
      alert("user name not exist");
      return;
    }
    
    if (data[0].password === $signInPassword.val().trim()) {
      logedInUserId=data[0].id;
      console.log("you are loged in, user id is: "+logedInUserId);
      $signInName.val("");
      $signInPassword.val("");
    }
    else{
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
var signUpPassword2=$signUpPassword2.val().trim();
  if (!(user.user_name && user.password && signUpPassword2)) {
    alert("You must enter user name, password ");
    return;
  };
  if(user.password!=signUpPassword2){
    alert("The passwords don't match");
    return;
  };
  if(user.password.length<6||user.password.length>12){
    alert("The password length must be between 6 and 12");
    return;
  };
  var isExist=[];
  getApi.findOneUser(user.user_name).then(function (data) {
    console.log(data)
    isExist=data;
    
    if(isExist.length!=0){
      alert("user name exist!");
      return;
    }
    else{

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





// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $submitRecipeBtn = $(".addRecipe");
var $exampleList = $("#example-list");

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
  console.log('aaaaaaaaaa')
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

var tempFunc = function(event) {
  event.preventDefault();
  console.log('aaaaaaaaaa')
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
// $submitRecipeBtn.on("click", tempFunc);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

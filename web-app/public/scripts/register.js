var apiUrl = location.protocol + '//' + location.host + "/api/";

console.log("at register.js");

//check user input and call server to create dataset
$('#submit').click(function() {

  //get user input data
  /*
  var formAccountNum = $('.account-number input').val();
  var formCardId = $('.card-id input').val();
  var formFirstName = $('.name input').val();
  var formLastName = $('.last-name input').val();
  var formEmail = $('.email input').val();
  var formPhoneNumber = $('.phone-number input').val();

console.log(formLastName);*/
  var numberOfEle = $('.form-control').length;
  var inputData='{' + '"cardid" : "' + $('#emp_id').val() + '", ' + '"accountnumber" : "' + $('#emp_id').val() + '"'; 
  for(var i=0;i<numberOfEle/2 -1;i++){
    console.log($('#name'+i).val());
      inputData = inputData + ', "' + $('#name'+i).val() + '":"' + $('#mail'+i).val()+ '"';
  }
  console.log(numberOfEle);
  inputData += '}';
  //create json data
  //var inputData = '{' +  '"name" : "' + formLastName + '", ' + '"email" : "' + formEmail + '", ' + '"phonenumber" : "' + formPhoneNumber + '", ' + '"accountnumber" : "' + formAccountNum + '", ' + '"cardid" : "' + formCardId + '"}';
  console.log(inputData)

  //make ajax call to add the dataset
  $.ajax({
    type: 'POST',
    url: apiUrl + 'addEmployee',
    data: inputData,
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function() {
      //display loading
      document.getElementById('registration').style.display = "none";
      document.getElementById('loader').style.display = "block";
    },
    success: function(data) {

      //remove loader
      document.getElementById('loader').style.display = "none";

      //check data for error
      if (data.error) {
        document.getElementById('registration').style.display = "block";
        alert(data.error);
        return;
      } else {
        //notify successful registration
        document.getElementById('successful-registration').style.display = "block";
        document.getElementById('registration-info').style.display = "none";
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      //reload on error
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    }
  });

});


$('#btnsearch').click(function() {

  //get user input data
  var aadharDetails = $('#search').val();
  console.log(aadharDetails);

  //make ajax call to add the dataset
  $.ajax({
    type: 'POST',
    url: apiUrl + 'getEmployeeData',
    data: "[" + aadharDetails +"]",
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function() {
      //display loading
      //document.getElementById('registration').style.display = "none";
      //document.getElementById('loader').style.display = "block";
    },
    success: function(data) {

      //remove loader
      //document.getElementById('loader').style.display = "none";

      //check data for error
      if (data.error) {
        //document.getElementById('registration').style.display = "block";
        alert(data.error);
        return;
      } else {
        console.log("Mama" + data.success[0].data );
        alert(data.success)
        //notify successful registration
        //document.getElementById('successful-registration').style.display = "block";
        //document.getElementById('registration-info').style.display = "none";
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      //reload on error
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    }
  });

});

//check user input and call server to create dataset
$('.register-partner').click(function() {

  //get user input data
  var formName = $('.name input').val();
  var formPartnerId = $('.partner-id input').val();
  var formCardId = $('.card-id input').val();

  //create json data
  var inputData = '{' + '"name" : "' + formName + '", ' + '"partnerid" : "' + formPartnerId + '", ' + '"cardid" : "' + formCardId + '"}';
  console.log(inputData)

  //make ajax call to add the dataset
  $.ajax({
    type: 'POST',
    url: apiUrl + 'registerPartner',
    data: inputData,
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function() {
      //display loading
      document.getElementById('registration').style.display = "none";
      document.getElementById('loader').style.display = "block";
    },
    success: function(data) {

      //remove loader
      document.getElementById('loader').style.display = "none";

      //check data for error
      if (data.error) {
        document.getElementById('registration').style.display = "block";
        alert(data.error);
        return;
      } else {
        //notify successful registration
        document.getElementById('successful-registration').style.display = "block";
        document.getElementById('registration-info').style.display = "none";
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      //reload on error
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    }
  });

});

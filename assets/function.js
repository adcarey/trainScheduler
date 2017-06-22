var config = {
    apiKey: "AIzaSyBxPgz_EYvlN9FAUDb6P6Kc4yctcFkfRB0",
    authDomain: "train-scheduler-ac489.firebaseapp.com",
    databaseURL: "https://train-scheduler-ac489.firebaseio.com",
    projectId: "train-scheduler-ac489",
    storageBucket: "train-scheduler-ac489.appspot.com",
    messagingSenderId: "176353578720"
  };
  firebase.initializeApp(config);
   var database = firebase.database();

   $("#addButton").on('click', function(event){
	event.preventDefault();

  var objectToUpdate={};

      objectToUpdate.name = $('#name-input').val().trim();
      objectToUpdate.destination = $('#destination-input').val().trim();
      objectToUpdate.start = $('#start-input').val().trim();
      objectToUpdate.frequency = $('#frequency-input').val().trim();

      console.log(objectToUpdate);

      


database.ref().push({
	name: objectToUpdate.name,
	destination: objectToUpdate.destination,
	start: objectToUpdate.start,
	frequency: objectToUpdate.frequency
});
	$('#name-input').val('');
	$('#destination-input').val('');
	$('#start-input').val('');
	$('#frequency-input').val('');
});
database.ref().on("child_added",function(snapshot){ 
  var a=snapshot.val();
   var tFrequency = a.frequency;
    // Time is 3:30 AM
    var firstTime = a.start;
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  console.log(snapshot.val().name);
  var newDiv=$('<div class="col-md-3">');
    newDiv.append(a.name);
  var newDiv1=$('<div class="col-md-2">');
    newDiv1.append(a.destination);
  var newDiv2=$('<div class="col-md-2">');
    newDiv2.append(a.frequency);
  var newDiv3=$('<div class="col-md-2">');
    newDiv3.append(moment(nextTrain).format("hh:mm"));
  var newDiv4=$('<div class="col-md-2">');
  	newDiv4.append(tMinutesTillTrain);

  
  var superDiv=$('<div class="row">');
    superDiv.append(newDiv);
    superDiv.append(newDiv1);
    superDiv.append(newDiv2);
    superDiv.append(newDiv3);
    superDiv.append(newDiv4);

  $(".chartData").prepend(superDiv);
       

    }, 
    function(errorObject) {          
       console.log("Errors handled: " + errorObject.code);
    });


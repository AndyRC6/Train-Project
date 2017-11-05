$(document).ready(function(){
	var config = {
    	apiKey: "AIzaSyD3DlQ7i4sFN3EvhU1sSu4HdrcIG2PZ_Go",
    	authDomain: "traintimes-8f72f.firebaseapp.com",
    	databaseURL: "https://traintimes-8f72f.firebaseio.com",
    	projectId: "traintimes-8f72f",
    	storageBucket: "traintimes-8f72f.appspot.com",
    	messagingSenderId: "131783139000"
  	};
    firebase.initializeApp(config);
    var db = firebase.database();
    

    db.ref("/trains").on("child_added", function(snapshot){
    	var data = snapshot.val();
    	var startTime = moment(data.firstTrain, "HH:mm");
    	var minutesAway = Math.floor(data.frequency - (parseInt(moment().diff(startTime, "minutes") % data.frequency)));
    	var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
    	console.log(minutesAway);
    	console.log(nextArrival);

    	$("#train-list").append(`<tr><td>${data.name}</td><td>${data.destination}</td><td>${data.frequency}</td><td>${nextArrival}</td><td>${minutesAway}</td></tr>`)

    })

    $("#submit-btn").on("click", function(){
    	event.preventDefault();
    	var name = $("#name").val();
    	var destination = $("#destination").val();
   	 	var firstTrain = $("#first-train").val();
   		var frequency = $("#frequency").val();
    	db.ref("/trains").push({
    		name: name,
    		destination: destination,
    		firstTrain: firstTrain,
    		frequency: frequency
    	})
    })


})
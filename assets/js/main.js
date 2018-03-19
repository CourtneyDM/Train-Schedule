// Object to store train information
var train = {};

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBBlBKhrUTu7HO7oA0TwRV996lDLiogd4k",
    authDomain: "train-sched-cm.firebaseapp.com",
    databaseURL: "https://train-sched-cm.firebaseio.com",
    projectId: "train-sched-cm",
    storageBucket: "",
    messagingSenderId: "344397199148"
};
firebase.initializeApp(config);

// Reference to Firebase database
var dbRefObject = firebase.database().ref();

// console.log(database);

// Event listener for Submit button
document.getElementById("submitBtn").addEventListener("click", function () {

    // Stop default behavior of page reload
    event.preventDefault();


    // Store new train details from user input
    var name = document.getElementById("name").value.trim();
    var destination = document.getElementById("destination").value.trim();
    var initialStart = document.getElementById("time").value.trim();
    var frequency = document.getElementById("frequency").value.trim();

    // Set first time and frequency to user input
    var firstTime = initialStart;
    var tFrequency = frequency;
    var arrival;

    // Get current time in military format
    var currentTime = moment().format("HH:mm");

    // Set firstTime 1 month back and show results in minutes
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "month");
    console.log("firstTimeConverted: " + firstTimeConverted);

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log("REMAINDER: " + tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var tArrival = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(tArrival).format("LT"));

    arrival = tArrival;

    train = {
        name: name,
        destination: destination,
        time: initialStart,
        frequency: parseInt(frequency),
        minutes: tMinutesTillTrain
    }

    dbRefObject.push(train);

    var tbody = document.getElementById("tbody");
    var newRow = tbody.insertRow();
});


dbRefObject.on("child_added", snapshot => {
    console.log("child added");
    // var objRefKey = JSON.stringify(snapshot.key);
    var tName = document.createTextNode(snapshot.val().name);
    var tDestination = document.createTextNode(snapshot.val().destination);
    var tFrequency = document.createTextNode(snapshot.val().frequency);
    var tMinsToArrive = document.createTextNode(snapshot.val().minutes);
    console.log("Train Name: " + tName);
    console.log("Train Destination: " + tDestination);
    console.log("Train Frequency: " + tMinsToArrive);
    console.log("Minutes Away: " + tFrequency);
    console.log(snapshot.numChildren());

    var trainName = document.createElement("td").appendChild(tName);

    // console.log("Child key: " + objRefKey);
    // console.log(snapshot.val().objRefKey);


    // TODO: assign the values of the childSnapshot to the variables below
    // var sched_Name = document.createElement("td").setAttribute("id", "sched_name").innerText = tName;
    // var sched_Dest = document.createElement("td").setAttribute("id", "sched_dest").innerText = tDestination;
    // var sched_Freq = document.createElement("td").setAttribute("id", "sched_freq").innerText = tFrequency;
    // var sched_Arrive = document.createElement("td").setAttribute("id", "sched_arrive").innerText = "Figure this out";
    // var sched_Mins = document.createElement("td").setAttribute("id", "sched_mins").innerText = tMinsToArrive;

    // var tbody = document.getElementById("tbody");
    // var newRow = tbody.insertRow();

    // newRow.appendChild(sched_Name).appendChild(sched_Dest).appendChild(sched_Freq).appendChild(sched_Arrive).appendChild(sched_Mins);

    snapshot.forEach(childSnapShot => {
        var childKey = childSnapShot.key;
        var childData = childSnapShot.val();
        console.log("childKey: " + childKey);
    });
});

dbRefObject.on("value", snapshot => {
    if (snapshot.numChildren() === 0) {
        console.log("database is empty");
    }
    else {
        console.log("value changed");
    }
});

dbRefObject.on("child_removed", snapshot => {
    console.log("child removed");
});

dbRefObject.on("child_changed", snapshot => {
    console.log("child changed");
});
// Object to store train information
var train = {};
var currentTime, firstTime, minsTilTrain, nextTrain, tFrequency, tRemainder;


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

// console.log(database);.r

// Event listener for Submit button
document.getElementById("submitBtn").addEventListener("click", function () {

    // Stop default behavior of page reload
    event.preventDefault();

    // Store new train details from user input
    var name = document.getElementById("name").value.trim();
    var destination = document.getElementById("destination").value.trim();
    var time = document.getElementById("time").value.trim();
    var frequency = document.getElementById("frequency").value.trim();

    // Set first time and frequency to user input
    firstTime = time;
    tFrequency = frequency;

    // Get current time in military format
    currentTime = moment().format("HH:mm");

    // Set firstTime 1 month back and show results in minutes
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "month");
    console.log("firstTimeConverted: " + firstTimeConverted);

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
    var nextTrain = moment().add(minsTilTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("LT"));





    train = {
        name: name,
        destination: destination,
        time: time,
        frequency: frequency
    }
    dbRefObject.push(train);

    var tbody = document.getElementById("tbody");
    var newRow = tbody.insertRow();
});


dbRefObject.on("child_added", snapshot => {
    console.log("child added");

    // TODO: assign the values of the childSnapshot to the variables below
    var name, destination, frequency, time;

    // var sched_Name = document.createElement(td).setAttribute("id", sched_name);
    // var sched_Dest = document.createElement(td).setAttribute("id", sched_dest);
    // var sched_Freq = document.createElement(td).setAttribute("id", sched_freq);
    // var sched_Arrive = document.createElement(td).setAttribute("id", sched_arrive);
    // var sched_Mins = document.createElement(td).setAttribute("id", sched_mins);

    // var snapKey = snapshot.key;
    // console.log(snapKey);
    // console.log(snapshot.numChildren());

    // snapshot.forEach(childSnapShot => {

    //     var childKey = childSnapShot.key;
    //     var childData = childSnapShot.val();

    //     console.log("childData: " + childData);
    // });
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



// Object to store train properties
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


// Event listener for Submit button
document.getElementById("submitBtn").addEventListener("click", function () {

    // Stop default behavior of page reload
    event.preventDefault();

    // Store new train details from user input
    var name = document.getElementById("name").value.trim();
    var destination = document.getElementById("destination").value.trim();
    var initialTime = document.getElementById("time").value.trim();
    var frequency = document.getElementById("frequency").value.trim();

    // Get current time in military format
    var currentTime = moment().format("HH:mm");

    // Take initialTime in military format (HH:mm), subtract 1 day and convert to milliseconds
    var initialTimeConverted = moment(initialTime, "HH:mm").subtract(1, "day");

    // Calculate difference between current time and initialTime and convert into minutes
    var diffTime = moment().diff(moment(initialTimeConverted), "minutes");

    // Calculate the time apart, in minutes
    var tRemainder = diffTime % frequency;
    
    // Calculate minutes until next train arrives
    var tMinutesTillTrain = frequency - tRemainder;

    // Calculate time when next train when next train arrives
    var tArrival = moment().add(tMinutesTillTrain, "minutes");

    // Save properties to the train object
    train = {
        name: name,
        destination: destination,
        frequency: parseInt(frequency),
        arrival: moment(tArrival).format("LT"),
        minutes: tMinutesTillTrain
    }

    // Add the train object to the database
    dbRefObject.push(train);
});

// Event listener for when a child is added to the database
dbRefObject.on("child_added", snapshot => {

    // Create text nodes to display train properties
    var nameText = document.createTextNode(snapshot.val().name);
    var destText = document.createTextNode(snapshot.val().destination);
    var freqText = document.createTextNode(snapshot.val().frequency);
    var arriveText = document.createTextNode(snapshot.val().arrival);
    var minsText = document.createTextNode(snapshot.val().minutes);

    // Create a reference to the table body
    var tbody = document.getElementById("tbody");

    // Create a new table row element
    var tr = document.createElement("tr");

    // Create new table data based on train properties
    var nameData = document.createElement("td");
    var destData = document.createElement("td");
    var freqData = document.createElement("td");
    var arriveData = document.createElement("td");
    var minsData = document.createElement("td");
    
    // Append text nodes to the table data elements
    nameData.append(nameText);
    destData.append(destText);
    freqData.append(freqText);
    arriveData.append(arriveText);
    minsData.append(minsText);

    // Append table data nodes to table row
    tr.append(nameData);
    tr.append(destData);
    tr.append(freqData);
    tr.append(arriveData);
    tr.append(minsData);

    // Finally, append table row to table body
    tbody.appendChild(tr);
});


dbRefObject.on("value", snapshot => {
    if (snapshot.numChildren() === 0) {
        console.log("database is empty");
    }
    else {
        console.log("value changed");
    }
});

// dbRefObject.on("child_removed", snapshot => {
//     console.log("child removed");
// });

// dbRefObject.on("child_changed", snapshot => {
//     console.log("child changed");
// });

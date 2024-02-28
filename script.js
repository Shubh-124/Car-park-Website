// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration here (Do not use the existing configuration)
const firebaseConfig = {
    apiKey: "AIzaSyCgJUtvKxKlRxG-MUH4op_sO1bi4qCRrgI",
    authDomain: "smartparking2-15877.firebaseapp.com",
    databaseURL: "https://smartparking2-15877-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smartparking2-15877",
    storageBucket: "smartparking2-15877.appspot.com",
    messagingSenderId: "370463902571",
    appId: "1:370463902571:web:327080131175228a02da2e"
};

// Initialize Firebase
const sparking = firebase.initializeApp(firebaseConfig);


// getting reference to the database
var database = sparking.database();

//getting reference to the data we want
var dataRef1 = database.ref('sensor/Distance1');
var dataRef2 = database.ref('sensor/Distance2');
var dataRef3 = database.ref('sensor/Distance3');


//fetch the data
dataRef1.on('value', function (getdata1) {
    var d = getdata1.val();
    document.getElementById('val1').innerHTML = d + " cm";
    if (parseInt(d) <= 8) {
        toggleLight1(true)
    } else {
        toggleLight1(false)
    }

})
dataRef2.on('value', function (getdata2) {
    var d = getdata2.val();
    document.getElementById('val2').innerHTML = d + " cm";
    if (parseInt(d) <= 8) {
        toggleLight2(true)
    } else {
        toggleLight2(false)
    }

})
dataRef3.on('value', function (getdata3) {
    var d = getdata3.val();
    document.getElementById('val3').innerHTML = d + " cm";
    if (parseInt(d) <= 8) {
        toggleLight3(true)
    } else {
        toggleLight3(false)
    }

})

const bulb1 = document.getElementById('bulb1');
const bulb2 = document.getElementById('bulb2');
const bulb3 = document.getElementById('bulb3');

function toggleLight1(status) {
    if (status) {
        bulb1.classList.add('on');
    } else {
        bulb1.classList.remove('on');
    }
}
function toggleLight2(status) {
    if (status) {
        bulb2.classList.add('on');
    } else {
        bulb2.classList.remove('on');
    }
}
function toggleLight3(status) {
    if (status) {
        bulb3.classList.add('on');
    } else {
        bulb3.classList.remove('on');
    }
}


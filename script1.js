// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration here (Do not use the existing configuration)
const firebaseConfig = {
    apiKey: "AIzaSyBc-ZRdUFwaaGcGyrIdykF29qTiCk66KT8",
    authDomain: "toll-system-5d0eb.firebaseapp.com",
    databaseURL: "https://toll-system-5d0eb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "toll-system-5d0eb",
    storageBucket: "toll-system-5d0eb.appspot.com",
    messagingSenderId: "582188188658",
    appId: "1:582188188658:web:4c386b63ad1b18fface16b"
};

// Initialize Firebase
const tolls = firebase.initializeApp(firebaseConfig, 'Secondary');


async function fetchData() {
    var database = tolls.database();
    //getting reference to the data we want
    var dataRef1 = database.ref('Car');

    return new Promise((resolve, reject) => {
        dataRef1.on('value', function (getdata1) {
            var d = getdata1.val();
            const data = Object.values(d)
            resolve(data)
        }, (error) => {
            reject(error)
        });
    });
}

// getting reference to the database

// var ord_id = "";

function displayData(data) {
    const tableBody = document.querySelector("#mapTable tbody");
    tableBody.innerHTML = "";
    let noOfCars = (data.length)
    data.map((item) => {
        console.log(item.ord_id)
        const row = tableBody.insertRow();
        const cellKey = row.insertCell(0);
        const cellValue = row.insertCell(1);
        const cellValue1 = row.insertCell(2);
        const cellValue2 = row.insertCell(3);
        const cellValue3 = row.insertCell(4);
        const cellValue4 = row.insertCell(5);
        cellKey.textContent = item.plate;
        cellValue.textContent = item.time;
        cellValue1.textContent = item.time_out;
        cellValue2.textContent = item.fare;
        cellValue3.textContent = item.status
        if (item.fare != "") {
            let btn = document.createElement('button');
            btn.innerText = 'Pay Me';
            btn.onclick = function (e) {
                e.preventDefault()
                payNow(item.ord_id)
                // console.log(count)

            }

            cellValue4.appendChild(btn)
        }
    })
    document.getElementById('length').innerHTML = `${noOfCars} Cars Present`

}


async function fetchAndDisplay() {
    try {
        const data = await fetchData();
        displayData(data)
    } catch (error) {
        console.error('Error fetching/displaying the data', error)
    }
}

fetchAndDisplay()
//fetch the data


// Fires on 'View' button click
async function payNow(ord_id) {
    // e.preventDefault();
    var options = {
        "key": "rzp_test_5JGeaULCYXEhfn", // Enter the Key ID generated from the Dashboard
        "name": "Acme Corp",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": String(ord_id), //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        // handler function when payment complete
        "handler": function (response) {
            // status.innerText = "paid"
            updateStatusInFirebase(ord_id, 'Paid')
            console.log({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,

            })
            // let t = document.querySelector("#mapTable tbody")
            // t.rows[0].cells[4].innerHTML = "Paid"


        },
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };

    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    });
    await rzp1.open();

}
function updateStatusInFirebase(ord_id, newStatus) {
    var database = tolls.database();
    var dataRef1 = database.ref('Car');
    dataRef1.orderByChild('ord_id').equalTo(ord_id).once('value')
        .then(snapshot => {
            // Iterate over the matching records
            snapshot.forEach(childSnapshot => {
                // Get the key (unique ID) of the record
                const key = childSnapshot.key;

                // Update the 'status' field for the specific entry in the database
                dataRef1.child(key).update({
                    status: newStatus
                });
            });
        })
        .catch(error => {
            console.error('Error updating status in Firebase:', error);
        });
}
document.getElementById('rzp-button1').onclick = function (e) {
    rzp1.open();
    e.preventDefault();
}
// Initial population of the table



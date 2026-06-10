// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  get,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBE1nwmout4hfcuvoywXnv4fnIaCdIdrsk",
  authDomain: "quickhire-74382.firebaseapp.com",
  projectId: "quickhire-74382",
  storageBucket: "quickhire-74382.firebasestorage.app",
  messagingSenderId: "365491987772",
  appId: "1:365491987772:web:5a5f2f8980c0f687086a39",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
console.log(db);

//Function to write user data to Firebase Realtime Database
function writeUserData(
  userId,
  firstname,
  middlename,
  lastname,
  gender,
  contact,
  address,
  postcode,
  passportno,
  cgpa,
  remark,
) {
  // Get the database instance
  // const db = getDatabase();

  // Create a reference/points to 'users/{userId}' and set the data (name and email)
  set(ref(db, "users/" + userId), {
    firstname: firstname,
    middlename: middlename,
    lastname: lastname,
    gender: gender,
    contact: contact,
    address: address,
    postcode: postcode,
    passportno: passportno,
    cgpa: cgpa,
    remark: remark,
  });
}
writeUserData(
  2,
  "Rajiv",
  "Bhushan",
  "Yadav",
  "Male",
  "9865238370",
  "KTM",
  44500,
  98779369,
  3.99,
  "Extra Ordinary",
);

// ref(db, 'users') points to the users path.
// get(userRef) gets the data at that path.
// snapshot.forEach(...) loops over each child node (each user).
// childsnapshot.val() gives the actual data (name and email), which is printed.
function readUser() {
  const userRef = ref(db, "users");

  get(userRef).then((snapshot) => {
    snapshot.forEach((childsnapshot) => {
      console.log(childsnapshot.val());
    });
  });
}
readUser();

function updateUserData(userId, updatedData) {
  const userRef = ref(db, "users/" + userId);
  update(userRef, updatedData)
    .then(() => {
      console.log("User updated successfully");
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
}
// Example usage:
updateUserData(1, { firstname: "Saw-c", lastname: "Prakrit" });

function deleteUserData(userId) {
  const userRef = ref(db, 'users/' + userId);
  remove(userRef)
    .then(() => {
      console.log("User deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
}

// Example usage:
deleteUserData(1);

//console.log("Added! Good")

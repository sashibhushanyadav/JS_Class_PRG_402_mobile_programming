// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  get,
  update,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtwMuzv5uywKT4v5XXvV2L6kY5YGd_V20",
  authDomain: "contactus-5d331.firebaseapp.com",
  projectId: "contactus-5d331",
  storageBucket: "contactus-5d331.firebasestorage.app",
  messagingSenderId: "907593262116",
  appId: "1:907593262116:web:9011f9215f8076218ca4b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
console.log(db);

const submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
  e.preventDefault();
  const userId = Date.now().toString();
  set(ref(db, "users/" + userId), {
    fullName: document.getElementById("fullname").value,
    emailAddress: document.getElementById("email").value,
    phoneNumber: document.getElementById("phone").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  })
    .then(() => console.log("Data saved"))
    .catch((error) => console.error(error));
  // Clear Contact Us form
  document.getElementById("fullname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("message").value = "";

  const userRef = ref(db, "users/" + userId);
  get(userRef).then((snapshot) => {
    const user = snapshot.val();
    document.getElementById("details-userId").value = userId;
    document.getElementById("details-fullname").value = user.fullName;
    document.getElementById("details-email").value = user.emailAddress;
    document.getElementById("details-phone").value = user.phoneNumber;
    document.getElementById("details-subject").value = user.subject;
    document.getElementById("details-message").value = user.message;
  });
});

const edit = document.getElementById("edit");
edit.addEventListener("click", (e) => {
  e.preventDefault();

  // Get values from DETAILS form
  const fullName = document.getElementById("details-fullname").value;
  const email = document.getElementById("details-email").value;
  const phone = document.getElementById("details-phone").value;
  const subject = document.getElementById("details-subject").value;
  const message = document.getElementById("details-message").value;

  // Fill CONTACT form
  document.getElementById("fullname").value = fullName;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;
  document.getElementById("subject").value = subject;
  document.getElementById("message").value = message;
});

const updateBtn = document.getElementById("update");
updateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // Get the same userId
  const userId = document.getElementById("details-userId").value;
  if (!userId) {
    alert("No user selected for update.");
    return;
  }
  update(ref(db, "users/" + userId), {
    fullName: document.getElementById("fullname").value,
    emailAddress: document.getElementById("email").value,
    phoneNumber: document.getElementById("phone").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  })
    .then(() => {
      console.log("Data Updated Successfully");
      // Show updated values in Details form
      document.getElementById("details-fullname").value =
        document.getElementById("fullname").value;
      document.getElementById("details-email").value =
        document.getElementById("email").value;
      document.getElementById("details-phone").value =
        document.getElementById("phone").value;
      document.getElementById("details-subject").value =
        document.getElementById("subject").value;
      document.getElementById("details-message").value =
        document.getElementById("message").value;

      // Clear Contact Us form
      document.getElementById("fullname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";
    })
    .catch((error) => {
      console.error(error);
    });
});

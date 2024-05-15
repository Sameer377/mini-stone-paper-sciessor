  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA9lOgHMKxsimqDSTFuHJf8A_H_pNMtSEE",
    authDomain: "stone-paper-scissor-23ead.firebaseapp.com",
    databaseURL: "https://stone-paper-scissor-23ead-default-rtdb.firebaseio.com",
    projectId: "stone-paper-scissor-23ead",
    storageBucket: "stone-paper-scissor-23ead.appspot.com",
    messagingSenderId: "858720375139",
    appId: "1:858720375139:web:233e2682fb980fc493c356",
    measurementId: "G-5T5L04S378"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
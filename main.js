import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  signInWithPopup 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBbQgiWGtUceAtfwyPcVUexhANLXZOb39E",
  authDomain: "brevity000111.firebaseapp.com",
  projectId: "brevity000111",
  storageBucket: "brevity000111.firebasestorage.app",
  messagingSenderId: "995017528425",
  appId: "1:995017528425:web:a9d0dca3e2347366ad7ef8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';

// Initialize providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Add login functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Google login
  const googleLogin = document.querySelector(".google-btn");
  
  if (googleLogin) {
    googleLogin.addEventListener("click", function() {
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const user = result.user;
          console.log(user);
          showNotification('Google login successful!', 'success');
          window.location.href = "../logged.html";
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Google sign-in error:", errorCode, errorMessage);
          showNotification('Google login failed: ' + errorMessage, 'error');
        });
    });
  } else {
    console.error("Google button not found");
  }
  
  // Facebook login
  const facebookLogin = document.querySelector(".facebook-btn");
  
  if (facebookLogin) {
    facebookLogin.addEventListener("click", function() {
      signInWithPopup(auth, facebookProvider)
        .then((result) => {
          // This gives you a Facebook Access Token
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const accessToken = credential.accessToken;
          
          const user = result.user;
          console.log(user);
          showNotification('Facebook login successful!', 'success');
          window.location.href = "../logged.html";
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = FacebookAuthProvider.credentialFromError(error);
          
          console.error("Facebook sign-in error:", errorCode, errorMessage);
          showNotification('Facebook login failed: ' + errorMessage, 'error');
        });
    });
  } else {
    console.error("Facebook button not found");
  }
});

// Notification function (if not already defined in your HTML)
function showNotification(message, type = 'info', duration = 5000) {
  // This function should already exist in your HTML file
  // If not, you'll need to implement it
  console.log(`${type.toUpperCase()}: ${message}`);
}
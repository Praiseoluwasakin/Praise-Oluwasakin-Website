// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAx_bxGpBbw6nyo6mdKPfZ3kfTksh1DgWc",
  authDomain: "portfolio-9dab2.firebaseapp.com",
  projectId: "portfolio-9dab2",
  storageBucket: "portfolio-9dab2.firebasestorage.app",
  messagingSenderId: "321069993195",
  appId: "1:321069993195:web:f7f53f5b27d097925dc2ae",
  measurementId: "G-1R05LTGTKE",
};

const app = initializeApp(firebaseConfig);

// Analytics only works in the browser
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}

export { app, analytics };

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuex from 'vuex'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVFwRy05tSy7DwIEch45bNNFXoAwTlBA0",
  authDomain: "ninjagame-6cb32.firebaseapp.com",
  projectId: "ninjagame-6cb32",
  storageBucket: "ninjagame-6cb32.appspot.com",
  messagingSenderId: "566776677172",
  appId: "1:566776677172:web:e48778b14340044b45db61",
  measurementId: "G-6L6H4X2XQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
getAnalytics(app);

createApp(App).use(store).use(router).use(vuex).mount('#app')

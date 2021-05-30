import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBTaMgsIREUwINnUDYbZyhL6Wna9iYvBDQ",
    authDomain: "food-village-d560f.firebaseapp.com",
    projectId: "food-village-d560f",
    storageBucket: "food-village-d560f.appspot.com",
    messagingSenderId: "954150018708",
    appId: "1:954150018708:web:c1de1990de656ffc645e81"
  };

export const auth = firebase.auth();
export const storage = firebase.storage();

export default firebaseConfig;
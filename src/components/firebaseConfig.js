import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyBxDsHridmFa02Zq0n5iOUf0iwuHZ9SRCM",
    authDomain: "firetools-47707.firebaseapp.com",
    databaseURL: "https://firetools-47707.firebaseio.com",
    projectId: "firetools-47707",
    storageBucket: "firetools-47707.appspot.com",
    messagingSenderId: "65324697417"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
}


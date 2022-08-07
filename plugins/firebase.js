
// global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: "AIzaSyDOioATq0CDg5wWBhC_0suEfeh8InqALGs",
  authDomain: "chat-vue-firebase-b93eb.firebaseapp.com",
  projectId: "chat-vue-firebase-b93eb",
  storageBucket: "chat-vue-firebase-b93eb.appspot.com",
  messagingSenderId: "218782022777",
  appId: "1:218782022777:web:6499490e4a9c7c5a8a28a8"
}

if (!firebase.apps.length) firebase.initializeApp(config)

export const auth = firebase.auth()
export const DB = firebase.database()
export default firebase

// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC_U5cGqhw8QXtxqyYSb5HbRv5ueCuJFsI',

  authDomain: 'netflix-a30a1.firebaseapp.com',

  projectId: 'netflix-a30a1',

  storageBucket: 'netflix-a30a1.appspot.com',

  messagingSenderId: '430134120322',

  appId: '1:430134120322:web:f454a42ad226135bfe099b',

  measurementId: 'G-C10YZGSGSS',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }

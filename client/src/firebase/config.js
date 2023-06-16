import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import { fireKey } from '../constants/constants';


const firebaseConfig = {
    apiKey: fireKey ,
    authDomain: "fir-f5793.firebaseapp.com",
    projectId: "fir-f5793",
    storageBucket: "fir-f5793.appspot.com",
    messagingSenderId: "583871396234",
    appId: "1:583871396234:web:bbb74ad8009241fb973073",
    measurementId: "G-L2X1QFXR3C"
  };


  export default firebase.initializeApp(firebaseConfig);
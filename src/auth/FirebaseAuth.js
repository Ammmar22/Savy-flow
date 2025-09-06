import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore/lite';
import { 
	getAuth, 
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider
} from 'firebase/auth'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import firebaseConfig from 'configs/FirebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const currentUser = auth.currentUser
const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();

export {
	db,
	auth,
	currentUser,
	googleAuthProvider,
	GoogleAuthProvider,
	facebookAuthProvider,
	FacebookAuthProvider,
	signInWithEmailAndPassword,
	signOut,
	signInWithPopup,
	createUserWithEmailAndPassword
};
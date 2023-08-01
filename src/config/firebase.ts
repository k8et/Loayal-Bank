import {initializeApp} from 'firebase/app'
import {
    getAuth,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail

} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCyT4pKqtzUFmppvJh0QljizdrU-nyy_QQ",
    authDomain: "bank-57867.firebaseapp.com",
    projectId: "bank-57867",
    storageBucket: "bank-57867.appspot.com",
    messagingSenderId: "690479725612",
    appId: "1:690479725612:web:53000e71c6d83555852589"
};
export const app = initializeApp(firebaseConfig);
export const register = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth,email,password)
export const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth,email,password)
export const logout = () => signOut(auth)
export const db = getFirestore()
export const auth = getAuth()
export const storage = getStorage();
export const uid = auth.currentUser ? auth.currentUser.uid : null;
export const sendResetEmail = async (email: string) => {
    return sendPasswordResetEmail(auth, email);
}
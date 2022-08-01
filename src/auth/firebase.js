
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBO3deqCvXmH5uNmkgLURC7tkLCRh_y_uE",
  authDomain: "miniproject-dts.firebaseapp.com",
  projectId: "miniproject-dts",
  storageBucket: "miniproject-dts.appspot.com",
  messagingSenderId: "949635434103",
  appId: "1:949635434103:web:107f12fff5b7dbbbcde872"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const signInApp = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        return userCredential;
      } catch (err) {
        return err; 
      }
}

const signInWithGoogle = async () => {
    console.log('signInWithGoogle',auth);
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        console.log('userCredential',userCredential);
        return userCredential;
    } catch (err) {
        console.log(err)
        return err;
    }
}

const signInWithFacebook = async () => {
    console.log('signInWithFacebook',auth);
    try {
        const provider = new FacebookAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        console.log('userCredential',userCredential);
        return userCredential;
    } catch (err) {
        console.log(err)
        return err;
    }
}


const createUserApp = async (email, password, name) => {
    try {
        const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const { currentUser } = response.user.auth;
        await updateProfile(currentUser, {
            displayName: name
        });
        console.log("User yang berhasil dibuat adalah", response.user);
        return response;
    } catch (err) {
        return err;
    }
}

const signOutApp = async () => {
    try {
        await signOut(auth);
    } catch (err) {
       return err;
    }
}


export {
    auth,
    signInApp,
    signOutApp,
    createUserApp,
    signInWithGoogle,
    signInWithFacebook
};
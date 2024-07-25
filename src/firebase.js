import toast from "react-hot-toast";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, updatePassword, sendEmailVerification} from "firebase/auth";
import store from "./store";
import { login as loginHandle, logout as logoutHandle} from "./store/auth";
import UpdateProfile from "./components/UpdateProfile";

const firebaseConfig = {
  apiKey: "AIzaSyA5fUUa0LzwVPbaPY_rmHbxtQsCsMSb7Zs",
  authDomain: "fir-project-129da.firebaseapp.com",
  projectId: "fir-project-129da",
  storageBucket: "fir-project-129da.appspot.com",
  messagingSenderId: "471610647465",
  appId: "1:471610647465:web:ad8f7d815bee0784621ab8",
  measurementId: "G-SCBMZKHL4B"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    toast.success('User registered successfully!');
    return user;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
}

export const update = async data=> {
  try {
    const user = auth.currentUser;
    await UpdateProfile(auth.currentUser, data);
    toast.success('Parolanız Güncellendi!');
    return true;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

export const resetPassword = async password => {
  try {
    const user = auth.currentUser;
    await updatePassword(auth.currentUser, password);
    toast.success('Profil Güncellendi!');
    return true;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

export const emailVerification = async () => {
  try{
await sendEmailVerification(auth.currentUser)
toast.success(`Doğrulama maili ${auth.currentUser.email} adresine gönderildi, lütfen konrol edin.`);
  }catch (error) {
    toast.error(error.message);
    throw error;
}
}





onAuthStateChanged(auth, (user) => {
  if(user){
   store.dispatch(loginHandle(user))
   store.dispatch(loginHandle({
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    photoURL: user.photoURL,
    uid: user.uid,
  }))
  }else{
    store.dispatch(logoutHandle())
  }
})

export default app;
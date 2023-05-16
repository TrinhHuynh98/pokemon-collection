import { async } from "@firebase/util";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useAppDispatch } from "../app/hooks";
import { setUserInfo } from "../app/slices/AppSlice";
import { firebaseAuth, firebaseDb, usersRef } from "../utils/FirebaseConfig";

const Login = () => {
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { email, uid },
    } = await signInWithPopup(firebaseAuth, provider);

    if (email) {
      const fireStoreQuery = query(usersRef, where("uid", "==", uid));
      const fetchedUser = await getDocs(fireStoreQuery);
      if (fetchedUser.docs.length === 0) {
        await addDoc(collection(firebaseDb, "users"), {
          uid,
          email,
        });
      }
      dispatch(setUserInfo({ email }));
    }
  };

  return (
    <div className="login">
      <button onClick={() => handleLogin()} className="login-btn">
        <FcGoogle /> Login with Google
      </button>
    </div>
  );
};

export default Login;

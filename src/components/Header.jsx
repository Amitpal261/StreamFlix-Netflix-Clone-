import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileMenu from "./ProfileMenu";
import AuthModal from "./AuthModel";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { logout, setUser } from "../features/auth/authSilce";



const Header = () => {
  const [active, setActive] = useState(false);
  const displayUser = useSelector((state) => state.auth.user);
   console.log("Current user:", displayUser);
// firebase.js (or wherever you initialized Firebase)
  const Navigate = useNavigate();
const dispatch = useDispatch();

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({
        email: user.email,
        uid: user.uid,
        username: user.username || user.displayName || "User",
      }));
      Navigate("/Home");
    } else {
      dispatch(logout());
      Navigate("/login");
    }
  });

  return () => unsubscribe();
}, [Navigate, dispatch]);
  return (
    <>
      <div className="flex justify-between px-20 py-5">
        <img
          className="w-40 h-auto object-contain"
          src="./image.png"
          alt=""
        />

        <div className="flex gap-5 py-2">
          <select className="rounded-sm border border-white px-4 text-white">
            <option className="text-black">English</option>
            <option className="text-black">Hindi</option>
          </select>
          <p className="text-white content-center">{displayUser ? displayUser.username.toUpperCase() : null}</p>
          {displayUser ? null : <button onClick={() => setActive(true)} className="bg-red-700 px-4 rounded-sm text-white hover:bg-red-800 py-2 px-4">Sign In</button>}
           <span><ProfileMenu/></span>
        </div>
      </div>

      {/* Modal */}
      {active && <AuthModal onClose={() => setActive(false)} />}
    </>
  );
};

export default Header;
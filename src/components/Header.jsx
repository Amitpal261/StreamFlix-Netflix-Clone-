import { useState } from "react";
import { useSelector } from "react-redux";
import ProfileMenu from "./ProfileMenu";
import AuthModal from "./AuthModel";
import { Link } from "react-router-dom";



const Header = () => {
  const [active, setActive] = useState(false);
    const displayUser = useSelector((state) => state.auth.user);
   console.log("Current user:", displayUser);
// firebase.js (or wherever you initialized Firebase)

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
          <p className="text-white">{displayUser ? displayUser.email : null}</p>
          <Link to="/login" className="bg-red-700 px-3 rounded-sm text-white hover:bg-red-800 text-center content-center"
            onClick={() => setActive(true)}>
      
            Sign in
          </Link>
           <span><ProfileMenu/></span>
        </div>
      </div>

      {/* Modal */}
      {active && <AuthModal onClose={() => setActive(false)} />}
    </>
  );
};

export default Header;
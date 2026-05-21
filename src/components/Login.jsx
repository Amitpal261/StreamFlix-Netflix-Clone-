import { useRef,} from "react";
import { EmailRegex, PasswordRegex } from "../../utils/Validation/EmailRegax";

import {
  
  signInWithEmailAndPassword,
  
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSilce";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = ({ onClose, switchToSignup }) => {
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailValue = email.current.value.trim();
    const passwordValue = password.current.value;

    // ✅ FIXED regex usage
    if (!EmailRegex(emailValue)) {
      alert("Invalid email");
      return;
    }

    if (!PasswordRegex(passwordValue)) {
      alert("Invalid password");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue
      );

      const user = userCredential.user;

      dispatch(
        setUser({
          email: user.email,
          uid: user.uid,
        })
      );

      alert("Login successful ✅");
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl 
  bg-white/10 backdrop-blur-xl border border-white/20 
  shadow-2xl relative text-white">

  {/* Close Button */}
  <button
    onClick={() => {
      onClose();
      navigate("/");
    }}
    className="absolute top-3 right-3 text-white/70 hover:text-white transition"
  >
    ✕
  </button>

  {/* Title */}
  <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">
    Sign in
  </h2>

  {/* Form */}
  <form onSubmit={handleLogin} className="flex flex-col space-y-5">

    {/* Email */}
    <input
      ref={email}
      type="email"
      placeholder="Email"
      className="w-full px-4 py-2 rounded-lg 
      bg-white/10 border border-white/20 
      placeholder-white/60 text-white
      focus:outline-none focus:ring-2 focus:ring-white/40 
      transition"
    />

    {/* Password */}
    <input
      ref={password}
      type="password"
      placeholder="Password"
      className="w-full px-4 py-2 rounded-lg 
      bg-white/10 border border-white/20 
      placeholder-white/60 text-white
      focus:outline-none focus:ring-2 focus:ring-white/40 
      transition"
    />

    {/* Signup Link */}
    <p className="text-sm text-white/70 text-center">
      Don't have an account?{" "}
      <Link to ="/signup"
        type="button"
        onClick={switchToSignup}
        className="text-white font-semibold hover:underline"
      >
        Signup
      </Link>
    </p>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full py-2 rounded-lg 
      bg-red-500 
      hover:bg-red-600 
      transition font-semibold shadow-lg"
    >
      Sign In
    </button>

  </form>
</div>
  );
};

export default LoginForm;
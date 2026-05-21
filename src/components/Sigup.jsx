import { useRef } from "react";
import { EmailRegex, PasswordRegex } from "../../utils/Validation/EmailRegax";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { Link } from "react-router-dom";

const SignupForm = ({ onClose, switchToLogin }) => {
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    const emailValue = email.current.value.trim();
    const passwordValue = password.current.value;
    const usernameValue = username.current.value;

    if (!EmailRegex(emailValue)) {
      alert("Invalid email");
      return;
    }

    if (!PasswordRegex(passwordValue)) {
      alert("Invalid password");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue
      );

      const user = userCredential.user;

      // ✅ update profile
      await updateProfile(user, {
        displayName: usernameValue,
      });

      

      alert("Signup successful ✅");
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl 
  bg-white/10 backdrop-blur-xl border border-white/20 
  shadow-2xl relative text-white">
      <button onClick={onClose} className="absolute top-3 right-3 text-white/70 hover:text-white transition">
        ✕
      </button>

      <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>

      <form onSubmit={handleSignup} className="flex flex-col space-y-5">
        <input ref={username} placeholder="Username" className="input w-full px-4 py-2 rounded-lg 
      bg-white/10 border border-white/20 
      placeholder-white/60 text-white
      focus:outline-none focus:ring-2 focus:ring-white/40 
      transition" />
        <input ref={email} type="email" placeholder="Email" className="input w-full px-4 py-2 rounded-lg 
      bg-white/10 border border-white/20 
      placeholder-white/60 text-white
      focus:outline-none focus:ring-2 focus:ring-white/40 
      transition" />
        <input ref={password} type="password" placeholder="Password" className="input w-full px-4 py-2 rounded-lg 
      bg-white/10 border border-white/20 
      placeholder-white/60 text-white
      focus:outline-none focus:ring-2 focus:ring-white/40 
      transition" />

        <p className="text-sm text-white/70 text-center">
          Already have an account?{" "}
          <Link to="/login" type="button" onClick={switchToLogin} className="text-white font-semibold hover:underline">
            Sign in
          </Link>
        </p>

        <button type="submit" className="btn w-full py-2 rounded-lg 
      bg-red-500 
      hover:bg-red-600 
      transition font-semibold shadow-lg">Signup</button>
      </form>
    </div>
  );
};

export default SignupForm;
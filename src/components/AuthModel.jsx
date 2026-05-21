import { useState } from "react";
import LoginForm from "./Login";
import SignupForm from "./Sigup";

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {isLogin ? (
        <LoginForm onClose={onClose} switchToSignup={() => setIsLogin(false)} />
      ) : (
        <SignupForm onClose={onClose} switchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default AuthModal;
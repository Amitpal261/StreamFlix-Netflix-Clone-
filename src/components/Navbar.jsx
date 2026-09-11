import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../features/chatGpt/chatGptSilce";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.chatGpt);
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "TV Shows", path: "/tvshows" },
    { name: "Movies", path: "/movies" },
    { name: "My List", path: "/mylist" },
  ];

  // 🔥 Scroll background effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 px-4 md:px-10 py-4 flex items-center justify-between transition duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* LEFT */}
      <div className="flex items-center gap-6 md:gap-12">
        <h1 className="text-red-600 text-2xl md:text-3xl font-extrabold tracking-wider cursor-pointer">
          NETFLIX
        </h1>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative group transition duration-300 ${
                  isActive ? "text-white font-semibold" : "hover:text-white"
                }`}
              >
                {item.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-red-600 transition-all duration-300
                  ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center">
        <button
          onClick={() =>
            dispatch(setMode(mode === "chat" ? "normal" : "chat"))
          }
          className="hidden sm:block ml-4 px-4 py-1 rounded-md bg-white/10 hover:bg-white/20 transition backdrop-blur-md text-sm"
        >
          AI Assistant
        </button>

        <div className="ml-4 hidden sm:block">
          <ProfileMenu />
        </div>

        {/* 🍔 ICON TOGGLE */}
        <button
          className="ml-4 md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* 📱 MOBILE MENU WITH ANIMATION */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md flex flex-col items-start px-6 py-6 space-y-5 md:hidden"
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`text-base ${
                    isActive ? "text-white font-semibold" : "text-white/80"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <button
              onClick={() => {
                dispatch(setMode(mode === "chat" ? "normal" : "chat"));
                setMenuOpen(false);
              }}
              className="mt-2 px-4 py-1 rounded-md bg-white/10 hover:bg-white/20 transition text-sm"
            >
              AI Assistant
            </button>

            <div>
              <ProfileMenu />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
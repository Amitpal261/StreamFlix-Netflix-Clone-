import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
const Navbar = () => {
  return (
  <div className=" z-50 flex justify-between items-center relative w-11/12 rounded-lg px-16 py-6 mt-5 mx-12 backdrop-blur-md bg-black/20 border border-white/10">
        <h1 className="text-red-600 text-3xl font-extrabold tracking-wide">
          NETFLIX
        </h1>

        <div className="flex gap-8 items-center text-sm font-medium">
          {["Home", "TV Shows", "Movies", "My List"].map((item) => (
            <Link to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s/g, "")}`}
              key={item}
              className="relative cursor-pointer hover:text-white/80 transition"
            >
              {item}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          <div className="z-10 rounded-full border border-white  text-white">
            <ProfileMenu/>
           {/* <User className="text-white" /> */}
           {/* <img src="./profile.png" className="w-6 h-6 rounded-full object-cover" /> */}
          </div>
        </div>
      </div>
  );
};

export default Navbar;
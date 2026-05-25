import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";
import { API_READ_ACCESS_TOKEN, } from "../../../utils/contest";
import ProfileMenu from "../../components/ProfileMenu";
import { Provider } from "react-redux";
import { store } from "../store";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
export default function Home() {

  const [moviesData, setMoviesData] = useState([]);
  useEffect(() => {
     fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc", {
      headers: {
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`, 
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMoviesData(data.results);
        console.log("Fetched Movies:", data.results); // Log the fetched movies data
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });

  }, []);
  return (
    <Provider store={store}>

    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 scale-105 opacity-90"
        style={{
          backgroundImage: `url(${moviesData.length > 0 ? `https://image.tmdb.org/t/p/original${moviesData[0].backdrop_path}` : "https://images.unsplash.com/photo-1562448079-b5631888445f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* GLOBAL DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />

      {/* NAVBAR */}
      
      <Navbar/>

     

      {/* HERO */}
      <div className="relative z-10 h-[90vh] flex items-center px-16">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-extrabold leading-tight drop-shadow-lg"
          >
            {moviesData.length > 0 ? moviesData[0].title : "Devil in Ohio"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-gray-300 text-lg leading-relaxed"
          >
            Determined to protect a young patient who escaped a mysterious cult,
            a psychiatrist takes the girl in — putting her own family at risk.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4 mt-8"
          >
            <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:bg-gray-200 transition">
              <Play size={18} /> Play
            </button>

            <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-8 py-3 rounded-xl border border-white/20 hover:bg-white/20 transition">
              <Info size={18} /> More Info
            </button>
          </motion.div>
        </div>
      </div>

      {/* MOVIE ROW */}
      <div className="relative z-10 px-16 pb-20">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold tracking-wide">
            Popular on Netflix
          </h2>

          {/* subtle scroll hint */}
          <p className="text-sm text-white/40">Scroll →</p>
        </div>

        <div className="relative group">
          {/* gradient edges for premium feel */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-20" />

          <div className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-4">
            {moviesData.map((movie, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -12 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="min-w-[220px] h-[140px] rounded-2xl overflow-hidden relative cursor-pointer group shadow-lg shadow-black/40"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                {/* glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                {/* play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                    <Play className="text-white" />
                  </div>
                </div>

                {/* subtle bottom label effect */}
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition">
                  <p className="text-sm font-medium">{movie.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <Footer  />
      </div>
      
    </div>
  
    </Provider>
    
  );
}
 
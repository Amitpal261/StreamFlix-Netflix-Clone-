import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Play, Info} from "lucide-react";
import { API_READ_ACCESS_TOKEN } from "../../../utils/contest";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ChatGptModel from "../../components/ChatGptModel";
import DynamicMoviesView from "../../components/DynamicMoviesView";

export default function Home() {
  const params = useParams();
  const chatGptMode = useSelector((state) => state.chatGpt.mode);

  const [moviesData, setMoviesData] = useState([]);
  const heroBackdrop = moviesData[1]?.backdrop_path || moviesData[0]?.backdrop_path || "";

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/discover/movie?language=en-US&page=1", {
      headers: {
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMoviesData(data.results || []))
      .catch(() => setMoviesData([]));
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 scale-105 opacity-90"
        style={{
          backgroundImage: heroBackdrop
            ? `url(https://image.tmdb.org/t/p/original${heroBackdrop})`
            : "none",
          backgroundSize: "cover",
        }}
      />

      {/* GLOBAL DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />

      <Navbar />

      {/* 🔥 CHAT MODE */}
      {chatGptMode === "chat"  || params.id ? (
       chatGptMode === "chat" ? <ChatGptModel /> : <DynamicMoviesView />,
       params.id ? <DynamicMoviesView MovieId={params.id} MovieTitle={moviesData.find(m => m.id === parseInt(params.id))?.title} /> : <ChatGptModel />
      ) : (
        <>
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
              <Info size={18} /> More Info </button>
         </motion.div>
       </div>
     </div>



        </>
      )}


        {/* MOVIE ROW */}
      <div className="relative z-10 px-16 pb-20 mt-10">

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
            {moviesData.map((movie, index) => {
              const imageUrl = movie?.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                : "https://images.unsplash.com/photo-1524989941526-cf5f5d4c3a1d?auto=format&fit=crop&w=900&q=80";

              return (
                <motion.div
                  key={movie?.id || index}
                  whileHover={{ scale: 1.05, y: -12 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="min-w-[220px] h-[140px] rounded-2xl overflow-hidden relative cursor-pointer group shadow-lg shadow-black/40"
                >
                  <img
                    src={imageUrl}
                    alt={movie?.title || "Movie poster"}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  /> 

                {/* glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                {/* play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30">
                    <Link to={`movies/${movie.id}`} ><Play className="text-white" /></Link>
                  </div>
                </div>

                {/* subtle bottom label effect */}
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition">
                  <p className="text-sm font-medium">{movie?.title || "Movie"}</p>
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
        <Footer  />
     </div> 
    </div>
  );
}



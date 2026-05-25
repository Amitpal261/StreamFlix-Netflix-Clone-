import { motion, AnimatePresence } from "framer-motion";
import {
  useGetTrendingQuery,
  useGetMovieVideosQuery,
} from "../services/moviesApi";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
const Hero = () => {
  const { data: trending } = useGetTrendingQuery();
  const [index, setIndex] = useState(0);

  // 🔄 Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const movie = trending?.results?.[index % (trending?.results?.length || 1)];

  // 🎬 Trailer
  const { data: videos } = useGetMovieVideosQuery(movie?.id, {
    skip: !movie,
  });

  const trailer = videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    
    <div className="relative h-[100vh] w-full overflow-hidden bg-black pb-20">

        <Navbar />
      
      {/* 🎥 BACKGROUND IMAGE WITH FADE */}
      <AnimatePresence mode="wait">
        <motion.img
          key={movie?.id}
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* 🎬 DARK CINEMATIC OVERLAYS */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />

      {/* 🎬 TRAILER (SUBTLE, BLENDED) */}
      {trailer && (
        <iframe
          className="absolute right-0 top-0 h-full w-[60%] opacity-30 pointer-events-none"
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailer.key}`}
          allow="autoplay"
        />
      )}

      {/* 🎬 CONTENT */}
      <div className="relative z-20 flex items-end h-full px-10 pb-24">
        <motion.div
          key={movie?.id}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          {/* 🔥 TITLE */}
          <h1 className="text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
            {movie?.title}
          </h1>

          {/* ⭐ META */}
          {/* <div className="flex items-center gap-4 mt-4 text-sm text-gray-300">
            <span className="text-green-400 font-semibold">
              ⭐ {movie?.vote_average?.toFixed(1)}
            </span>
            <span>{movie?.release_date?.slice(0, 4)}</span>
          </div> */}

          {/* 📖 DESCRIPTION */}
          <p className="mt-5 text-gray-300 text-sm leading-relaxed max-w-xl">
            {movie?.overview?.slice(0, 180)}...
          </p>

          {/* 🎮 BUTTONS */}
          <div className="flex gap-4 mt-8">
            <button className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition">
               Play
            </button>

            <button className="px-8 py-3 bg-white/20 text-white rounded-md backdrop-blur-md hover:bg-white/30 transition">
              + My List
            </button>
          </div>
        </motion.div>
      </div>

      {/* 🔥 BOTTOM FADE (NETFLIX STYLE) */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10" />
    </div>
  );
};

export default Hero;
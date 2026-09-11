import { motion } from "framer-motion";
import {
  useGetTrendingQuery,
  useGetMovieVideosQuery,
} from "../services/moviesApi";
import { useEffect, useState } from "react";

const TvShowHero = () => {
  const { data: trending, isLoading } = useGetTrendingQuery();
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // 🔄 Auto slide
  useEffect(() => {
    if (!trending?.results?.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % trending.results.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [trending]);

  const movie =
    trending?.results?.[index % (trending?.results?.length || 1)];

  const { data: videos } = useGetMovieVideosQuery(movie?.id, {
    skip: !movie?.id,
  });

  const trailer = videos?.results?.find(
    (v) =>
      v.type === "Trailer" &&
      v.site === "YouTube" &&
      v.official === true
  );

  if (isLoading) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative w-full h-[40vh] sm:h-[85vh] lg:h-[95vh] max-h-[900px] overflow-hidden bg-black">

      {/* 🔝 Navbar */}
      

      {/* 🎬 BACKGROUND */}
      {trailer ? (
        <iframe
          key={trailer.key}
          className="absolute inset-0 w-full h-full object-cover scale-105 md:scale-110 opacity-90 pointer-events-none"
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=${isPlaying ? "0" : "1"}&controls=0&loop=1&playlist=${trailer.key}`}
          title="Trailer"
          allow="autoplay; encrypted-media"
        />
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt={movie?.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      )}

      {/* 🌑 OVERLAYS */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

      {/* 🎬 CONTENT */}
      <div className="relative z-20 flex items-end h-full px-4 sm:px-6 md:px-10 pb-5 sm:pb-6 md:pb-4">
        <motion.div
          key={movie?.id}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl sm:max-w-2xl"
        >
          {/* 🎥 TITLE */}
          <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            {movie?.title || movie?.name}
          </h1>

          {/* 📝 DESCRIPTION */}
          <p className="mt-3 sm:mt-5 text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-md sm:max-w-xl">
            {movie?.overview?.slice(0, 140)}...
          </p>

          {/* 🎮 BUTTONS */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-5 sm:mt-8">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-5 sm:px-8 py-2.5 sm:py-3 bg-white text-black rounded-md font-semibold hover:bg-gray-200 transition text-sm sm:text-base"
            >
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>

            <button className="px-5 sm:px-8 py-2.5 sm:py-3 bg-white/20 text-white rounded-md backdrop-blur-md hover:bg-white/30 transition text-sm sm:text-base">
              + My List
            </button>
          </div>
        </motion.div>
      </div>

      {/* 🔥 Bottom fade */}
      <div className="absolute bottom-0 w-full h-24 sm:h-32 md:h-40 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};

export default TvShowHero;
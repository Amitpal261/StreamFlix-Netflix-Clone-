import { motion } from "framer-motion";
import { useGetMovieVideosQuery } from "../services/moviesApi";
import { useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

const DynamicMoviesView = ({ MovieId, MovieTitle }) => {
  // ✅ autoplay requires muted first
  const [isMuted, setIsMuted] = useState(true);

  // ✅ force iframe reload (IMPORTANT FIX)
  const [reloadKey, setReloadKey] = useState(0);

  const { data: videos, isLoading } = useGetMovieVideosQuery(MovieId, {
    skip: !MovieId,
  });

  const trailer = videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube" && v.official === true,
  );

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-lg tracking-wide"
        >
          Loading cinematic experience...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-6 justify-center items-center pt-20 ">

  {/* 🎬 CONTAINER */}
  <div className="w-full max-w-6xl px-2 sm:px-4 flex flex-col gap-6">
    <div className="lg:h-[90vh] lg:max-h-[90vh]   relative aspect-video rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-black/60 overflow-hidden">

      {/* VIDEO */}
      {trailer ? (
        <motion.iframe
          key={`${trailer.key}-${reloadKey}`}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1.4}}
          transition={{ duration: 8, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${trailer.key}`}
          allow="autoplay; encrypted-media"
        />
      ) : (
        <div className="absolute inset-0 bg-black flex items-center justify-center text-gray-400">
          No Trailer Available
        </div>
      )}

      {/* OVERLAY */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_#000] pointer-events-none" />

      {/* TOP BAR */}
      <div className="absolute top-0 w-full p-3 sm:p-5 flex justify-end z-50">
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            setReloadKey((prev) => prev + 1);
          }}
          className="text-black p-2 rounded-lg bg-white hover:bg-white/70 transition"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* CONTENT */}
      <div className="relative z-30 flex items-end h-full px-4 sm:px-6 md:px-8 pb-4">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md space-y-3 sm:space-y-4"
        >
          <h1 className="text-base sm:text-lg md:text-2xl font-extrabold leading-tight">
            {MovieTitle || "Movie Title"}
          </h1>
        </motion.div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
    </div>
  </div>

  {/* BUTTONS */}
  <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-lg sm:rounded-xl font-semibold"
    >
      <Play size={16} />
      Play
    </motion.button>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-5 py-2.5 rounded-lg sm:rounded-xl bg-white/10 border border-white/20"
    >
      + My List
    </motion.button>
  </div>
</div>
  );
};

export default DynamicMoviesView;

import { X, Play, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { useState } from "react";

const VideoModal = ({ movie, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  // YouTube trailer URL - if available
  const getTrailerUrl = () => {
    if (movie.name || movie.title) {
      const title = (movie.name || movie.title).replace(/\s+/g, "+");
      return `https://www.youtube.com/embed/${movie.video_key || `${title}+trailer`}?autoplay=1`;
    }
    return null;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video Container */}
        <div className="relative bg-black aspect-video">
          {/* Mock Video Player / YouTube Embed */}
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted={isMuted}
            controls={false}
            poster={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          >
            <source
              src={`https://www.youtube.com/embed/${movie.video_key || ""}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Fallback Poster Image */}
          {!movie.video_key && (
            <div
              className="absolute inset-0 bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 bg-black/40" />
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full p-6 transition transform hover:scale-110 relative z-10"
              >
                <Play size={40} fill="white" />
              </button>
            </div>
          )}

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 hover:opacity-100 transition">
            {/* Progress Bar */}
            <div className="w-full bg-gray-600 h-1 rounded-full mb-4" />

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center text-white">
                <button className="hover:text-red-500 transition">
                  <Play size={20} />
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-red-500 transition"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
              <button className="hover:text-red-500 transition">
                <Maximize2 size={20} />
              </button>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 z-40 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Info */}
        <div className="p-6 text-white space-y-4">
          {/* Title & Rating */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {movie.name || movie.title}
              </h2>
              <p className="text-gray-400 text-sm">
                {movie.first_air_date || movie.release_date}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-yellow-400">
                ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
            {movie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition">
              <Play size={18} fill="white" />
              Play
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition">
              + Add to List
            </button>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-3 gap-4 pt-4 text-sm border-t border-gray-600">
            <div>
              <p className="text-gray-400">Genre</p>
              <p className="text-white">TV Show</p>
            </div>
            <div>
              <p className="text-gray-400">Episodes</p>
              <p className="text-white">{movie.number_of_episodes || "-"}</p>
            </div>
            <div>
              <p className="text-gray-400">Status</p>
              <p className="text-white">{movie.status || "Ongoing"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;

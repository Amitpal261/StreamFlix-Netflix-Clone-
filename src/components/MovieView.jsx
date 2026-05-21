import movie from "../../utils/movie";

const MovieView = ({ onClose }) => {
    console.log(movie);
    
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Modal Box */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <div>
          {movie.map((movie) => {
            <div key={movie.id}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0.5)),
               url({movie.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
                <h1>{movie.title}</h1>
                <p>{movie.rating}</p>
                <p>{movie.description}</p>
            </div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieView;
